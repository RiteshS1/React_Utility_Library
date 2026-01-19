import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

if (!process.env.COGNITO_USER_POOL_ID || !process.env.COGNITO_CLIENT_ID) {
  console.error('❌ ERROR: Missing required environment variables!');
  console.error('Please check server/.env file contains:');
  console.error('  - COGNITO_USER_POOL_ID');
  console.error('  - COGNITO_CLIENT_ID');
  process.exit(1);
}

const CLIENT_URL = process.env.CLIENT_URL;
if (!CLIENT_URL) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ ERROR: CLIENT_URL is required in production!');
    console.error('Please set CLIENT_URL in server/.env file');
    process.exit(1);
  }
  console.warn('⚠️  WARNING: CLIENT_URL not set, using localhost fallback (development only)');
}

const app = express();
const httpServer = createServer(app);
const defaultClientUrl = 'http://localhost:5173';
const corsOrigin = CLIENT_URL || defaultClientUrl;

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3001;
const isDevelopment = process.env.NODE_ENV !== 'production';

app.use(cors({
  origin: corsOrigin,
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    authProvider: 'AWS Cognito'
  });
});

let onlineUsers = new Set();

io.on('connection', (socket) => {
  if (isDevelopment) {
    console.log('User connected:', socket.id);
  }
  
  onlineUsers.add(socket.id);
  io.emit('userCount', onlineUsers.size);
  
  socket.on('authenticate', (token) => {
    if (isDevelopment && token) {
      console.log('User authenticated via Socket.IO');
    }
  });

  socket.on('disconnect', () => {
    if (isDevelopment) {
      console.log('User disconnected:', socket.id);
    }
    onlineUsers.delete(socket.id);
    io.emit('userCount', onlineUsers.size);
  });
});

httpServer.listen(PORT, () => {
  if (isDevelopment) {
    console.log(`Server running on port ${PORT}`);
    console.log(`Client URL: ${corsOrigin}`);
    console.log(`Authentication: AWS Cognito`);
  }
});
