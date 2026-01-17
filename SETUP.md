# Quick Setup Guide

This guide will help you get the React Mastery Learning Platform running on your machine in just a few minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

MongoDB is optional - the server will work with in-memory storage without it.

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RiteshS1/React_Utility_Library.git
cd React_Utility_Library
```

### 2. Install Frontend Dependencies

```bash
npm install
```

This will install all required packages for the React frontend.

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

This will install all required packages for the Express backend.

### 4. Configure the Backend

```bash
cd server
cp .env.example .env
```

The default `.env` file will work immediately with in-memory storage. You can edit it later to add MongoDB if needed.

### 5. Start the Backend Server

Open a new terminal window and run:

```bash
cd server
npm start
```

You should see:
```
Server running on port 3001
Client URL: http://localhost:5173
MongoDB URI not provided. Using in-memory storage for users.
```

Keep this terminal open!

### 6. Start the Frontend Application

Open another terminal window and run:

```bash
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 7. Open in Browser

Navigate to: **http://localhost:5173**

## Testing the Features

### Test Authentication

1. Click on **Register** in the sidebar
2. Create a new account with:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
3. You'll be automatically logged in
4. Your username will appear in the sidebar
5. Try logging out and logging back in

### Test Real-Time User Tracking

1. Open the application in multiple browser windows or tabs
2. Watch the "users online" counter in the sidebar and footer
3. It should increase with each new window/tab
4. Close a window/tab and watch the counter decrease

## What You Should See

### Sidebar Features
- Navigation menu with all React learning topics
- **Online users counter** showing real-time count
- **Account section** with:
  - Login/Register buttons (when not logged in)
  - Username and Logout button (when logged in)

### Footer
- Creator information
- Social links
- **Online users counter**

## Troubleshooting

### Port Already in Use

If port 3001 is already in use:

1. Edit `server/.env`
2. Change `PORT=3001` to another port (e.g., `PORT=3002`)
3. Update `src/context/AuthContext.tsx` and `src/context/SocketContext.tsx` to use the new port

### Backend Not Starting

- Ensure Node.js is installed: `node --version`
- Check that you ran `npm install` in the server directory
- Look for error messages in the terminal

### Frontend Not Starting

- Ensure Node.js is installed: `node --version`
- Check that you ran `npm install` in the root directory
- Verify the backend is running on port 3001

### Real-Time Updates Not Working

- Ensure both frontend and backend are running
- Check browser console for WebSocket connection errors
- Verify CORS settings in `server/.env` match your frontend URL

## Next Steps

### Add MongoDB (Optional)

For persistent storage:

1. Install MongoDB locally or create a free MongoDB Atlas account
2. Edit `server/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/react-mastery
   ```
3. Restart the backend server

### Deploy to Production

See the main [README.md](README.md) for deployment instructions.

## Features Overview

✅ **Authentication System**
- User registration with validation
- Secure login with JWT tokens
- Persistent sessions
- Logout functionality

✅ **Real-Time Features**
- Live user count
- WebSocket connection status
- Automatic reconnection

✅ **Learning Platform**
- Interactive React tutorials
- Code examples with syntax highlighting
- Copy-to-clipboard functionality

## Support

If you encounter any issues:

1. Check the [README.md](README.md) for detailed documentation
2. Review the [Backend API Documentation](server/README.md)
3. Open an issue on GitHub

## Quick Reference

### Start Backend
```bash
cd server
npm start
```

### Start Frontend
```bash
npm run dev
```

### Build Frontend
```bash
npm run build
```

### Run Tests
```bash
npm run lint
```

Happy learning! 🚀
