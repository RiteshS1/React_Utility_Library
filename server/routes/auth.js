import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// In-memory storage for users when MongoDB is not available
let inMemoryUsers = [];
let userIdCounter = 1;

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET must be set in production environment');
}

// Helper function to check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (isMongoConnected()) {
      // MongoDB storage
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = new User({ username, email, password });
      await user.save();

      const token = jwt.sign(
        { userId: user._id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } else {
      // In-memory storage
      const existingUser = inMemoryUsers.find(
        u => u.email === email || u.username === username
      );
      
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        id: userIdCounter++,
        username,
        email,
        password: hashedPassword,
        createdAt: new Date()
      };

      inMemoryUsers.push(newUser);

      const token = jwt.sign(
        { userId: newUser.id, username: newUser.username, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (isMongoConnected()) {
      // MongoDB storage
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } else {
      // In-memory storage
      const user = inMemoryUsers.find(u => u.email === email);
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get current user (protected route)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    if (isMongoConnected()) {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ user });
    } else {
      const user = inMemoryUsers.find(u => u.id === req.user.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt
        }
      });
    }
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
