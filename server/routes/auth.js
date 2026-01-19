import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.userId,
        username: req.user.username,
        email: req.user.email,
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get user error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
