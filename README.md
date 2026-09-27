# React Mastery Learning Platform

Interview-grade React learning platform with Cognito auth gating, interactive sandboxes, Browser & DOM internals curriculum, and an SDE-1/SDE-2 master assessment.

## Tech Stack

**Frontend:**
- React 19 + TypeScript + Vite
- Framer Motion (micro-interactions)
- AWS Amplify (Cognito authentication)
- Socket.IO Client (real-time NPC companion & online users)
- Lucide icons

**Backend:**
- Node.js + Express
- Socket.IO
- AWS JWT Verify

## Features

- **Landing + Auth Gating** — Public `/` marketing page; `/learn/*` requires Cognito session
- **Browser & DOM Internals** — CRP visualizer, mount/hydrate phases, Synthetic Event System
- **Custom Hooks Toolkit** — Production-ready hooks (useDebounce, useOnClickOutside, etc.) with copy-pasteable code and interactive demos
- **NPC Companion Backend** — Real-time contextual Socket.IO toast notifications tracking user progress and milestones
- **Master Assessment** — 20 SDE-1/SDE-2 questions with scored review + confetti
- **Gamification** — Progress ring, module completion checks, quiz personal best

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

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Landing page + Cognito auth modal |
| `/learn` | Auth | Learning dashboard |
| `/learn/critical-rendering-path` | Auth | CRP module |
| `/learn/react-mount-hydrate` | Auth | Mount & hydrate |
| `/learn/synthetic-events` | Auth | Synthetic event system |
| `/learn/custom-hooks` | Auth | Custom Hooks Toolkit |
| `/learn/master-assessment` | Auth | Master SDE quiz |
| `/login`, `/register` | Public | Redirects to `/` and opens auth modal |

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

## Load Testing

The backend is load-tested with Artillery to validate Socket.IO concurrency. See `server/README.md` for details.

**Run:**
```bash
cd server && npm run test:load
```

**Results:** 3,250 virtual users across a multi-phase enterprise traffic spike, 100% success rate (0 failures), and sub-millisecond latency (p95: 0.1ms) - testing locally ofc


## License

MIT