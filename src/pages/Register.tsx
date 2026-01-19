import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AUTH_CONSTANTS } from '../constants/auth';
import { UserPlus } from 'lucide-react';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');
  const { register, confirmSignUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} characters`);
      return;
    }

    setLoading(true);

    try {
      const result = await register(username, email, password);
      
            if (result.needsVerification) {
              setNeedsVerification(true);
              setVerificationEmail(result.email || email);
            } else {
              navigate('/');
            }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await confirmSignUp(verificationEmail, verificationCode, password);
      navigate('/');
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        {needsVerification ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                background: '#007acc',
                borderRadius: '50%',
                marginBottom: '1rem'
              }}>
                <UserPlus size={28} color="white" />
              </div>
              <h1 className="page-title">Verify Your Email</h1>
              <p className="page-description">
                We sent a verification code to <strong>{verificationEmail}</strong>
              </p>
              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                Please check your email and enter the code below
              </p>
            </div>

            {error && (
              <div style={{
                padding: '1rem',
                marginBottom: '1rem',
                background: '#fee',
                border: '1px solid #fcc',
                borderRadius: '6px',
                color: '#c33'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleVerification} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="code" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  maxLength={6}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                    letterSpacing: '0.5em',
                    fontFamily: 'monospace'
                  }}
                  placeholder="000000"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading || verificationCode.length !== 6}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  background: (loading || verificationCode.length !== 6) ? '#ccc' : '#007acc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: (loading || verificationCode.length !== 6) ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#666' }}>
              Didn't receive the code?{' '}
              <button
                onClick={() => {
                  setNeedsVerification(false);
                  setVerificationCode('');
                  setError('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007acc',
                  textDecoration: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Go back
              </button>
            </div>
              </>
            ) : (
              <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                background: '#007acc',
                borderRadius: '50%',
                marginBottom: '1rem'
              }}>
                <UserPlus size={28} color="white" />
              </div>
              <h1 className="page-title">Register</h1>
              <p className="page-description">
                Create your account to start learning React
              </p>
            </div>

            {error && (
              <div style={{
                padding: '1rem',
                marginBottom: '1rem',
                background: '#fee',
                border: '1px solid #fcc',
                borderRadius: '6px',
                color: '#c33'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={AUTH_CONSTANTS.MIN_USERNAME_LENGTH}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={AUTH_CONSTANTS.MIN_PASSWORD_LENGTH}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={AUTH_CONSTANTS.MIN_PASSWORD_LENGTH}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: loading ? '#ccc' : '#007acc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#666' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#007acc', textDecoration: 'none', fontWeight: '600' }}>
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
