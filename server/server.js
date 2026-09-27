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

// NPC message dictionary — emitted as `server_toast` events
const NPC_MESSAGES = {
  greeting: ['Hii from server!', "I'm alive hehe 🤖"],
  login: (name) => `Welcome ${name}! Wish u luck learning React ⚛️`,
  progress: {
    10: 'Magic is in the DOM Chico:) ',
    20: 'Ah! I see u made 20% progress. Kudos! 🎉',
    50: 'Halfway there, Keep pushing through🌴',
    80: '80% done! Ace through like a horse 🐎',
    100: '100% completed! U da real heroo🏆',
  },
  quizStarted: 'Bet u cant get 20/20 in our test! hmhmm 😏',
};

const PROGRESS_THRESHOLDS = [10, 20, 50, 80, 100];

io.on('connection', (socket) => {
  if (isDevelopment) {
    console.log('User connected:', socket.id);
  }

  onlineUsers.add(socket.id);
  io.emit('userCount', onlineUsers.size);

  // Track which progress thresholds have been announced this session
  const emittedThresholds = new Set();

  // NPC greeting — delayed so it doesn't get lost in initial render
  setTimeout(() => {
    socket.emit('server_toast', NPC_MESSAGES.greeting[0]);
    setTimeout(() => socket.emit('server_toast', NPC_MESSAGES.greeting[1]), 600);
  }, 2000);

  socket.on('authenticate', (token) => {
    if (isDevelopment && token) {
      console.log('User authenticated via Socket.IO');
    }
  });

  socket.on('user_login', (payload) => {
    const name = payload?.name || 'friend';
    socket.emit('server_toast', NPC_MESSAGES.login(name));
  });

  socket.on('progress_update', (payload) => {
    const percentage = Number(payload?.percentage);
    if (Number.isNaN(percentage)) return;
    for (const threshold of PROGRESS_THRESHOLDS) {
      if (percentage >= threshold && !emittedThresholds.has(threshold)) {
        emittedThresholds.add(threshold);
        socket.emit('server_toast', NPC_MESSAGES.progress[threshold]);
      }
    }
  });

  socket.on('quiz_started', () => {
    socket.emit('server_toast', NPC_MESSAGES.quizStarted);
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
