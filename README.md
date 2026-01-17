# React Mastery Learning Platform

An interactive React learning platform built with Vite + TypeScript. Learn React fundamentals and hooks with live code examples and copy-to-clipboard functionality.

**New Features:**
- 🔐 **AWS Cognito Authentication** - Secure user authentication with AWS Cognito
- 👥 **Real-Time User Tracking** - See how many users are currently online
- 🔌 **WebSocket Integration** - Live updates via Socket.IO

## Topics Covered

### Fundamentals
- JSX Basics
- Components & Props
- Event Handling
- Conditional Rendering
- Lists & Keys

### React Hooks
- useState Hook
- useEffect Hook
- useContext Hook
- useReducer Hook
- useMemo Hook
- useCallback Hook
- useRef Hook

### Advanced
- Custom Hooks (useLocalStorage, useDebounce, useFetch, useCounter, usePrevious, useToggle)
- AWS Cognito Authentication with Amplify
- Real-time communication with Socket.IO

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- AWS Account (for Cognito setup)

## AWS Cognito Setup (One-Time Setup)

Before running the application, you need to set up AWS Cognito:

### Phase 1: AWS Console Setup

1. **Create User Pool**
   - Go to [Amazon Cognito](https://console.aws.amazon.com/cognito/) → User Pools → Create user pool
   - **Sign-in options**: Select "Email" 
   - **Password policy**: Use defaults or customize (e.g., require special characters)
   - **MFA**: Set to "No MFA" for development (to avoid SMS costs)
   - **User account recovery**: Email only
   - Complete the wizard with default settings

2. **Create App Client**
   - Under your User Pool → "App integration" tab
   - Click "Create app client"
   - **App type**: Select "Public client"
   - **App client name**: Enter a name (e.g., "react-mastery-client")
   - **Important**: ⚠️ **DO NOT** check "Generate client secret" (React runs in browser and cannot hide secrets)
   - **Authentication flows**: Enable "ALLOW_USER_PASSWORD_AUTH" and "ALLOW_REFRESH_TOKEN_AUTH"
   - Create the app client

3. **Capture Configuration Values**
   - **User Pool ID**: Found on User Pool overview page (e.g., `us-east-1_xxxxxx`)
   - **Client ID**: Found under "App integration" → "App clients" (e.g., `5b3...`)
   - **Region**: Your AWS region (e.g., `us-east-1`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RiteshS1/React_Utility_Library.git
   cd React_Utility_Library
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure frontend environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Cognito values:
   ```env
   VITE_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
   VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
   VITE_AWS_REGION=us-east-1
   VITE_API_URL=http://localhost:3001
   ```

5. **Configure backend environment**
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit `server/.env` with your Cognito values:
   ```env
   PORT=3001
   NODE_ENV=development
   AWS_REGION=us-east-1
   COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
   COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
   CLIENT_URL=http://localhost:5173
   ```

### Running the Application

You need to run both the frontend and backend servers:

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
# Server will run on http://localhost:3001
```

**Terminal 2 - Frontend Application:**
```bash
npm run dev
# Application will run on http://localhost:5173
```

Now open your browser and navigate to `http://localhost:5173`

## Features

### Authentication System (AWS Cognito)
- User registration via AWS Cognito
- Secure login with Cognito-managed passwords
- Automatic token refresh with AWS Amplify
- Multi-factor authentication support (optional)
- Password recovery via email
- Logout functionality

### Real-Time User Tracking
- Live count of online users
- Automatic connection/disconnection tracking
- Visual indicators for connection status
- Updates in real-time across all connected clients

### Learning Platform
- Interactive code examples
- Syntax highlighting
- Copy-to-clipboard functionality
- Comprehensive React fundamentals and hooks tutorials

## Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **AWS Amplify** - AWS Cognito integration
- **Socket.IO Client** - Real-time communication
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **AWS JWT Verify** - Cognito token verification

### Authentication
- **AWS Cognito** - User pool and identity management
- **AWS Amplify** - Client-side authentication library

## Architecture

### Authentication Flow

```
┌─────────────┐      Sign Up/Login      ┌──────────────┐
│   React     │ ────────────────────────> │ AWS Cognito  │
│   (Amplify) │ <──────────────────────── │  User Pool   │
└─────────────┘      JWT Tokens          └──────────────┘
       │
       │ API Requests with JWT
       │
       ▼
┌─────────────┐      Verify Token        ┌──────────────┐
│   Express   │ ────────────────────────> │ AWS Cognito  │
│   Backend   │ <──────────────────────── │  (Verify)    │
└─────────────┘      Token Valid?        └──────────────┘
```

**Key Points:**
- React manages login UI and holds the session (JWT) via Amplify
- Express statelessly verifies Cognito tokens to grant API access
- No passwords stored in your database
- Token refresh handled automatically by Amplify

## Project Structure

```
React_Utility_Library/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   ├── Footer.tsx      # Footer with online users
│   │   └── OnlineUsers.tsx # Real-time user counter
│   ├── config/             # Configuration
│   │   └── amplify.ts      # AWS Amplify configuration
│   ├── context/            # React contexts
│   │   ├── AuthContext.tsx # Authentication state (Cognito)
│   │   └── SocketContext.tsx # Socket.IO connection
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Landing page
│   │   ├── Login.tsx       # Login page
│   │   ├── Register.tsx    # Registration page
│   │   └── ...             # Learning module pages
│   └── App.tsx             # Main app component
├── server/                  # Backend server
│   ├── middleware/         # Express middleware
│   │   └── auth.js         # Cognito JWT verification
│   ├── routes/             # API routes
│   │   └── auth.js         # Auth endpoints
│   └── server.js           # Server entry point
├── .env.example            # Frontend environment template
└── server/.env.example     # Backend environment template
```

## Development

### Frontend Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Development
```bash
cd server
npm start        # Start server
npm run dev      # Start with auto-restart
```

## API Documentation

### Endpoints

#### GET /api/health
Health check endpoint
```json
{
  "status": "ok",
  "message": "Server is running",
  "authProvider": "AWS Cognito"
}
```

#### GET /api/auth/me
Get current user information (requires authentication)

**Headers:**
```
Authorization: Bearer <cognito-access-token>
```

**Response:**
```json
{
  "user": {
    "id": "user-uuid",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

## Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:
- Vercel
- Netlify  
- AWS S3 + CloudFront
- GitHub Pages

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

**Important**: Update environment variables in your hosting platform's settings.

### Backend Deployment
The backend can be deployed to:
- AWS Lambda + API Gateway
- AWS Elastic Beanstalk
- Heroku
- Railway
- Render

**Production Checklist:**
1. Set `NODE_ENV=production`
2. Configure correct Cognito User Pool ID and Client ID
3. Enable HTTPS
4. Set up proper CORS configuration
5. Use environment variables for all secrets

## Security Best Practices

✅ **Implemented:**
- AWS Cognito for authentication (no passwords in your DB)
- JWT token verification with aws-jwt-verify
- CORS protection
- Environment variables for secrets
- Automatic token refresh with Amplify

⚠️ **Recommended for production:**
- Enable HTTPS/WSS for encrypted communication
- Implement rate limiting
- Add request validation middleware
- Set up security headers (helmet.js)
- Enable MFA in Cognito for sensitive operations
- Regular security audits
- Monitor Cognito CloudWatch logs

## Troubleshooting

### Cognito Errors

**"User is not confirmed"**
- Check Cognito User Pool settings
- Verify email confirmation is disabled for development
- Or implement email confirmation flow

**"Invalid authentication token"**
- Check User Pool ID and Client ID match in both frontend and backend
- Verify the token hasn't expired
- Check AWS region is correct

**"Network error"**
- Verify AWS credentials and region
- Check internet connectivity
- Ensure Cognito service is available in your region

### Backend Not Starting
- Ensure Cognito configuration is correct in `.env`
- Verify `aws-jwt-verify` is installed
- Check port 3001 is not in use

### Frontend Not Connecting
- Verify Amplify configuration in `.env`
- Check browser console for errors
- Ensure backend is running

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

**Ritesh Sharma**
- GitHub: [@RiteshS1](https://github.com/RiteshS1)
- Twitter: [@riiteshhhhh](https://x.com/riiteshhhhh)

## Acknowledgments

Built with ❤️ for the React learning community.
