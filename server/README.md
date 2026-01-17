# Backend Server Documentation

## Overview

The backend server provides authentication and real-time user tracking functionality for the React Mastery Learning Platform.

## Technology Stack

- **Node.js** with Express.js
- **Socket.IO** for real-time communication
- **JWT** (JSON Web Tokens) for authentication
- **MongoDB** (optional) or in-memory storage for user data
- **bcryptjs** for password hashing

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=mongodb://localhost:27017/react-mastery  # Optional
CLIENT_URL=http://localhost:5173
```

**Note:** The MongoDB URI is optional. If not provided, the server will use in-memory storage for user data.

### 3. Start the Server

```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

The server will start on `http://localhost:3001` by default.

## API Endpoints

### Authentication Endpoints

#### 1. Register a New User

**POST** `/api/auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Validation error (missing fields, password too short, user already exists)
- `500` - Server error

#### 2. Login

**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Server error

#### 3. Get Current User (Protected)

**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2026-01-17T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` - No token provided
- `403` - Invalid or expired token
- `404` - User not found
- `500` - Server error

### Health Check

**GET** `/api/health`

**Success Response (200):**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Socket.IO Events

### Client → Server

#### `authenticate`
Sent by client to authenticate the socket connection with a JWT token.

```javascript
socket.emit('authenticate', token);
```

### Server → Client

#### `userCount`
Emitted when the number of online users changes.

```javascript
socket.on('userCount', (count) => {
  console.log(`${count} users online`);
});
```

## Database Configuration

### Using MongoDB (Optional)

1. Install MongoDB locally or use MongoDB Atlas (cloud)
2. Set the `MONGODB_URI` in your `.env` file
3. The server will automatically connect to MongoDB on startup

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/react-mastery
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/react-mastery
```

### Using In-Memory Storage (Default)

If `MONGODB_URI` is not set or connection fails, the server automatically falls back to in-memory storage.

**Limitations:**
- User data is lost when server restarts
- Not suitable for production
- Good for development and testing

## Security Features

1. **Password Hashing:** Passwords are hashed using bcryptjs with salt rounds
2. **JWT Tokens:** Secure token-based authentication with 7-day expiration
3. **CORS Protection:** Configured to only allow requests from the client URL
4. **Input Validation:** All inputs are validated before processing

## Troubleshooting

### Server won't start

- Check if port 3001 is already in use
- Verify all dependencies are installed
- Check `.env` file configuration

### MongoDB connection failed

- Verify MongoDB is running (if using local MongoDB)
- Check the `MONGODB_URI` connection string
- The server will automatically use in-memory storage as fallback

### Socket.IO not connecting

- Verify the server is running
- Check CORS configuration
- Ensure client URL matches the `CLIENT_URL` in `.env`

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong, unique `JWT_SECRET`
3. Use MongoDB for persistent storage
4. Set up proper CORS configuration
5. Use HTTPS for secure communication
6. Consider using a process manager like PM2
7. Set up proper logging and monitoring

## Example: Testing with cURL

### Register a user:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get current user:
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
