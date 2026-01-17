import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

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
const isDevelopment = process.env.NODE_ENV !== 'production';

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    authProvider: 'AWS Cognito'
  });
});

// Track online users
let onlineUsers = new Set();

// Socket.IO connection handling
io.on('connection', (socket) => {
  if (isDevelopment) {
    console.log('User connected:', socket.id);
  }
  
  // Add user to online users
  onlineUsers.add(socket.id);
  
  // Broadcast updated user count to all clients
  io.emit('userCount', onlineUsers.size);
  
  // Handle user authentication with Cognito token (optional)
  socket.on('authenticate', (token) => {
    if (isDevelopment && token) {
      console.log('User authenticated via Socket.IO');
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    if (isDevelopment) {
      console.log('User disconnected:', socket.id);
    }
    onlineUsers.delete(socket.id);
    
    // Broadcast updated user count to all clients
    io.emit('userCount', onlineUsers.size);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  console.log(`Authentication: AWS Cognito`);
});
