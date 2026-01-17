import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get current user (protected route)
// Token is verified by Cognito middleware, user info extracted from token
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // User info is already in req.user from the middleware
    res.json({
      user: {
        id: req.user.userId,
        username: req.user.username,
        email: req.user.email,
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
