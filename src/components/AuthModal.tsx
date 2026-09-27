import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { AUTH_CONSTANTS } from '../constants/auth';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  redirectTo?: string;
}

type Mode = 'login' | 'register' | 'verify';

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  redirectTo = '/learn',
}) => {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register, confirmSignUp, user } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  // Notify the NPC companion that the user logged in
  useEffect(() => {
    if (user && socket) {
      socket.emit('user_login', { name: user.username || user.email });
    }
  }, [user, socket]);

  useEffect(() => {
    if (!isOpen) return;
    setMode(initialMode);
    setError('');
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  const finishAuth = () => {
    onClose();
    navigate(redirectTo);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      finishAuth();
    } catch (err) {
      const message = (err as Error).message;
      if (message.includes('verify your email')) {
        setMode('verify');
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const result = await register(username, email, password);
      if (result.needsVerification) {
        setMode('verify');
      } else {
        finishAuth();
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await confirmSignUp(email, verificationCode, password);
      finishAuth();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="auth-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="auth-modal"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
          >
            <button type="button" className="auth-modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>

            <h2 id="auth-modal-title" className="auth-modal-title">
              {mode === 'login' && 'Welcome back'}
              {mode === 'register' && 'Create an account'}
              {mode === 'verify' && 'Verify your email'}
            </h2>
            <p className="auth-modal-subtitle">
              {mode === 'login' && 'Sign in to continue your React Mastery path'}
              {mode === 'register' && 'Join and unlock the full curriculum'}
              {mode === 'verify' && `Enter the 6-digit code sent to ${email}`}
            </p>

            {error && <div className="auth-modal-error" role="alert">{error}</div>}

            {mode === 'login' && (
              <form onSubmit={handleLogin} className="auth-modal-form">
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={AUTH_CONSTANTS.MIN_PASSWORD_LENGTH}
                    autoComplete="current-password"
                    placeholder="••••••••"
                  />
                </label>
                <button type="submit" className="auth-modal-submit" disabled={loading}>
                  {loading ? 'Signing in…' : 'Sign in'}
                </button>
                <p className="auth-modal-switch">
                  New here?{' '}
                  <button type="button" onClick={() => switchMode('register')}>
                    Create account
                  </button>
                </p>
              </form>
            )}

            {mode === 'register' && (
              <form onSubmit={handleRegister} className="auth-modal-form">
                <label>
                  Username
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={AUTH_CONSTANTS.MIN_USERNAME_LENGTH}
                    autoComplete="username"
                    placeholder="react-wizard"
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={AUTH_CONSTANTS.MIN_PASSWORD_LENGTH}
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                  />
                </label>
                <label>
                  Confirm password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    placeholder="Confirm password"
                  />
                </label>
                <button type="submit" className="auth-modal-submit" disabled={loading}>
                  {loading ? 'Creating…' : 'Create account'}
                </button>
                <p className="auth-modal-switch">
                  Already have an account?{' '}
                  <button type="button" onClick={() => switchMode('login')}>
                    Sign in
                  </button>
                </p>
              </form>
            )}

            {mode === 'verify' && (
              <form onSubmit={handleVerify} className="auth-modal-form">
                <label>
                  Verification code
                  <input
                    type="text"
                    inputMode="numeric"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    maxLength={6}
                    className="auth-modal-code"
                    placeholder="000000"
                    autoFocus
                  />
                </label>
                <button
                  type="submit"
                  className="auth-modal-submit"
                  disabled={loading || verificationCode.length !== 6}
                >
                  {loading ? 'Verifying…' : 'Verify & continue'}
                </button>
                <p className="auth-modal-switch">
                  <button type="button" onClick={() => switchMode('login')}>
                    Back to sign in
                  </button>
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
