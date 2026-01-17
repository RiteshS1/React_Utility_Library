# React Mastery Learning Platform

An interactive React learning platform built with Vite + TypeScript. Learn React fundamentals and hooks with live code examples and copy-to-clipboard functionality.

**New Features:**
- 🔐 **User Authentication** - Register, login, and manage your account
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
- Authentication with Context API
- Real-time communication with Socket.IO

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (optional - see backend setup)

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
   ```

4. **Configure backend environment**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your configuration (see Backend Setup section)
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

### Authentication System
- User registration with validation
- Secure login with JWT tokens
- Password hashing with bcryptjs
- Persistent sessions using localStorage
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
- **Socket.IO Client** - Real-time communication
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **MongoDB** (optional) - Database for user storage
- **Mongoose** - MongoDB ODM

## Backend Setup

### Option 1: In-Memory Storage (Quick Start)

No additional setup required! The backend automatically uses in-memory storage if MongoDB is not configured.

**Pros:**
- No database installation needed
- Quick setup for development

**Cons:**
- Data is lost when server restarts
- Not suitable for production

### Option 2: MongoDB (Recommended for Production)

1. **Install MongoDB:**
   - **Local:** [Download and install MongoDB](https://www.mongodb.com/try/download/community)
   - **Cloud:** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)

2. **Configure MongoDB URI in `.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/react-mastery
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/react-mastery
   ```

3. **Start MongoDB (if using local installation):**
   ```bash
   mongod
   ```

### Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# MongoDB Configuration (Optional)
MONGODB_URI=mongodb://localhost:27017/react-mastery

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

⚠️ **Important:** Change `JWT_SECRET` to a strong, unique value in production!

## API Documentation

See the [Backend API Documentation](server/README.md) for detailed information about:
- Authentication endpoints
- Socket.IO events
- Request/response formats
- Error handling

## Project Structure

```
React_Utility_Library/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   ├── Footer.tsx      # Footer with online users
│   │   └── OnlineUsers.tsx # Real-time user counter
│   ├── context/            # React contexts
│   │   ├── AuthContext.tsx # Authentication state management
│   │   └── SocketContext.tsx # Socket.IO connection
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Landing page
│   │   ├── Login.tsx       # Login page
│   │   ├── Register.tsx    # Registration page
│   │   └── ...             # Learning module pages
│   └── App.tsx             # Main app component
├── server/                  # Backend server
│   ├── config/             # Configuration files
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── server.js           # Server entry point
│   └── README.md           # Backend documentation
└── package.json            # Frontend dependencies
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
npm run dev      # Start with auto-restart (requires Node.js --watch)
```

## Deployment

### Frontend
The frontend can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

### Backend
The backend can be deployed to:
- Heroku
- Railway
- AWS EC2
- DigitalOcean
- Render

**Important for production:**
1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB with persistent storage
4. Enable HTTPS
5. Set up proper CORS configuration
6. Use a process manager (PM2, systemd)

## Security Best Practices

✅ **Implemented:**
- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation
- Environment variables for secrets

⚠️ **Recommended for production:**
- Use HTTPS/WSS for encrypted communication
- Implement rate limiting
- Add request validation middleware
- Set up security headers (helmet.js)
- Regular security audits
- Implement refresh tokens
- Add account verification (email)

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
