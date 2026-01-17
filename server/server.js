import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { connectDB } from './config/db.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB (optional)
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Track online users
let onlineUsers = new Set();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Add user to online users
  onlineUsers.add(socket.id);
  
  // Broadcast updated user count to all clients
  io.emit('userCount', onlineUsers.size);
  
  // Handle user authentication with JWT
  socket.on('authenticate', (token) => {
    try {
      // Here you could verify the token and associate the socket with a user
      console.log('User authenticated:', socket.id);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    onlineUsers.delete(socket.id);
    
    // Broadcast updated user count to all clients
    io.emit('userCount', onlineUsers.size);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});
