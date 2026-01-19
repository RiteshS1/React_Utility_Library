# React Mastery Learning Platform

An interactive React learning platform with authentication and real-time features. Learn React fundamentals and hooks with live code examples.

## Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite
- AWS Amplify (Cognito authentication)
- Socket.IO Client (real-time features)

**Backend:**
- Node.js + Express
- Socket.IO (WebSocket server)
- AWS JWT Verify (token validation)

## Features

- 🔐 **AWS Cognito Authentication** - User registration, login, email verification
- 👥 **Real-Time User Tracking** - Live online user count
- 📚 **Interactive Learning** - React fundamentals, hooks, and advanced topics
- 💻 **Code Examples** - Copy-to-clipboard functionality

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env` (frontend)
   - Copy `server/.env.example` to `server/.env` (backend)
   - Add your AWS Cognito credentials

3. **Run:**
   ```bash
   # Terminal 1 - Backend
   cd server && npm start
   
   # Terminal 2 - Frontend
   npm run dev
   ```

Visit `http://localhost:5173`

## Project Structure

```
├── src/              # React frontend
│   ├── components/   # UI components
│   ├── context/      # Auth & Socket contexts
│   ├── pages/        # Learning modules
│   └── config/       # Amplify configuration
└── server/           # Express backend
    ├── middleware/   # JWT verification
    └── routes/       # API endpoints
```

## Environment Variables

**Frontend (.env):**
```
VITE_COGNITO_USER_POOL_ID=your-pool-id
VITE_COGNITO_CLIENT_ID=your-client-id
VITE_API_URL=http://localhost:3001
```

**Backend (server/.env):**
```
COGNITO_USER_POOL_ID=your-pool-id
COGNITO_CLIENT_ID=your-client-id
CLIENT_URL=http://localhost:5173
PORT=3001
```

## License

MIT
