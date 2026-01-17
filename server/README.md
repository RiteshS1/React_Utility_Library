# Backend Server Documentation - AWS Cognito

## Overview

The backend server provides stateless API authentication verification and real-time user tracking for the React Mastery Learning Platform using AWS Cognito.

## Technology Stack

- **Node.js** with Express.js
- **Socket.IO** for real-time communication
- **AWS JWT Verify** for Cognito token verification
- **AWS Cognito** for authentication (managed service)

## Key Differences from Traditional Auth

### What This Backend Does:
✅ **Verifies** JWT tokens from AWS Cognito  
✅ **Provides** API endpoints that require authentication  
✅ **Tracks** online users via Socket.IO  
✅ **Stateless** - no user database needed  

### What This Backend Doesn't Do:
❌ **Create** user accounts (Cognito handles this)  
❌ **Issue** JWT tokens (Cognito handles this)  
❌ **Store** passwords (Cognito handles this)  
❌ **Manage** user database (Cognito handles this)  

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

Edit `.env` with your AWS Cognito configuration:

```env
PORT=3001
NODE_ENV=development
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
CLIENT_URL=http://localhost:5173
```

**Important**: Get these values from your AWS Cognito User Pool.

### 3. Start the Server

```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

The server will start on `http://localhost:3001` by default.

## API Endpoints

### Health Check

#### GET `/api/health`

Check if the server is running.

**Response (200):**
```json
{
  "status": "ok",
  "message": "Server is running",
  "authProvider": "AWS Cognito"
}
```

### Authentication Endpoints

#### GET `/api/auth/me`

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <cognito-access-token>
```

**Success Response (200):**
```json
{
  "user": {
    "id": "uuid-from-cognito",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `401` - No token provided
- `403` - Invalid or expired token
- `500` - Server error

## Authentication Flow

### How It Works

```
1. User logs in via React (AWS Amplify)
   ↓
2. Cognito returns access token to React
   ↓
3. React sends API request with token in header:
   Authorization: Bearer <token>
   ↓
4. Express middleware verifies token with AWS:
   - Checks token signature
   - Verifies token hasn't expired
   - Validates token issuer (User Pool)
   ↓
5. If valid, extract user info from token:
   - User ID (sub)
   - Username
   - Email
   ↓
6. Process API request with authenticated user
```

### Token Verification

The backend uses `aws-jwt-verify` library which:
- ✅ Verifies token signature using Cognito public keys
- ✅ Checks token expiration
- ✅ Validates token issuer and audience
- ✅ Caches public keys for performance
- ✅ Handles key rotation automatically

## Socket.IO Events

### Client → Server

#### `authenticate`
Optional: Send Cognito token to authenticate socket connection.

```javascript
socket.emit('authenticate', accessToken);
```

### Server → Client

#### `userCount`
Emitted when the number of online users changes.

```javascript
socket.on('userCount', (count) => {
  console.log(`${count} users online`);
});
```

## Middleware

### `authenticateToken`

Located in `middleware/auth.js`

Verifies Cognito JWT access tokens for protected routes.

**Usage:**
```javascript
import { authenticateToken } from './middleware/auth.js';

router.get('/protected', authenticateToken, (req, res) => {
  // req.user contains: { userId, username, email }
  res.json({ user: req.user });
});
```

**What it does:**
1. Extracts Bearer token from Authorization header
2. Verifies token with AWS Cognito
3. Extracts user info from token payload
4. Attaches user info to `req.user`
5. Calls `next()` or returns error

## Security Features

✅ **Cognito JWT Verification** - Tokens verified against AWS  
✅ **No Password Storage** - Cognito handles all passwords  
✅ **Automatic Key Rotation** - Public keys cached and updated  
✅ **Token Expiration** - Expired tokens automatically rejected  
✅ **CORS Protection** - Configured for client URL only  
✅ **Stateless** - No session storage needed  

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| PORT | No | Server port | 3001 |
| NODE_ENV | No | Environment | development |
| AWS_REGION | Yes | AWS region | us-east-1 |
| COGNITO_USER_POOL_ID | Yes | Cognito User Pool ID | us-east-1_xxxxxx |
| COGNITO_CLIENT_ID | Yes | App Client ID | 5b3c4d... |
| CLIENT_URL | Yes | Frontend URL for CORS | http://localhost:5173 |

## Error Handling

### Common Errors

**401 Unauthorized**
- No token provided in Authorization header
- Token is missing or malformed

**403 Forbidden**
- Token signature is invalid
- Token has expired
- Token is from wrong User Pool
- Token audience doesn't match Client ID

**500 Internal Server Error**
- Server configuration error
- AWS Cognito service unavailable

## Testing

### Test with cURL

**1. Get a token from Cognito:**
```bash
# Use AWS CLI or login via frontend to get token
```

**2. Test the /me endpoint:**
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_COGNITO_TOKEN"
```

**3. Test health endpoint:**
```bash
curl http://localhost:3001/api/health
```

### Testing Socket.IO

```javascript
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('userCount', (count) => {
  console.log('Online users:', count);
});
```

## Troubleshooting

### Server won't start

**Check environment variables:**
```bash
# Ensure .env file exists and has all required values
cat .env
```

**Check port availability:**
```bash
# Check if port 3001 is in use
lsof -i :3001
```

### Token verification fails

**Common issues:**
- ❌ User Pool ID doesn't match
- ❌ Client ID doesn't match
- ❌ AWS Region is wrong
- ❌ Token has expired
- ❌ Token is from wrong Cognito pool

**Debug steps:**
1. Check environment variables match Cognito
2. Verify token is not expired
3. Check CloudWatch logs in AWS Console
4. Enable debug logging in middleware

### CORS errors

**Issue:** Frontend can't reach backend

**Solution:**
```env
# In server/.env
CLIENT_URL=http://localhost:5173
```

Make sure CLIENT_URL matches your frontend URL exactly.

## Production Deployment

### Checklist

1. ✅ Set `NODE_ENV=production`
2. ✅ Verify Cognito configuration for production pool
3. ✅ Update `CLIENT_URL` to production frontend URL
4. ✅ Enable HTTPS
5. ✅ Set up CloudWatch logging
6. ✅ Configure auto-scaling if needed
7. ✅ Set up health check monitoring
8. ✅ Enable rate limiting (consider API Gateway)

### Deployment Options

**AWS Lambda + API Gateway:**
- Serverless, auto-scaling
- Pay per request
- Great for variable traffic

**AWS Elastic Beanstalk:**
- Managed EC2 deployment
- Easy scaling
- Good for consistent traffic

**Docker + ECS/Fargate:**
- Containerized deployment
- Full control
- Flexible scaling

**Traditional Hosting:**
- Heroku, Railway, Render
- Easy setup
- Good for small projects

### Production Environment Variables

```env
PORT=3001
NODE_ENV=production
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_ProdPoolId
COGNITO_CLIENT_ID=ProductionClientId
CLIENT_URL=https://yourdomain.com
```

## Monitoring

### CloudWatch Logs

AWS Cognito automatically logs:
- Authentication attempts
- Token generation
- User sign-ups
- Failed login attempts

Access via: AWS Console → CloudWatch → Logs → `/aws/cognito/userpools/YOUR_POOL_ID`

### Application Logs

The server logs:
- Server start/stop
- Connection events (development mode)
- Authentication errors
- API requests

### Metrics to Monitor

- Active users count
- Token verification failures
- API response times
- Socket.IO connection count

## Architecture

### Why This Approach?

**Separation of Concerns:**
- Frontend: UI and session management (Amplify)
- Backend: API and business logic (Express)
- Auth Service: User management (Cognito)

**Benefits:**
- ✅ Scalable: Cognito handles millions of users
- ✅ Secure: AWS-managed security
- ✅ Simple: No password hashing, user DB, token generation
- ✅ Cost-effective: Free tier covers 50K users
- ✅ Maintainable: Less code to maintain

## Support

- **AWS Cognito Docs**: https://docs.aws.amazon.com/cognito/
- **AWS JWT Verify**: https://github.com/awslabs/aws-jwt-verify
- **Socket.IO Docs**: https://socket.io/docs/
- **Main README**: [../README.md](../README.md)

## License

MIT License
