import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  confirmSignUp,
  fetchUserAttributes,
} from 'aws-amplify/auth';

interface User {
  id: string;
  username: string;
  email: string;
}

interface RegisterResult {
  needsVerification: boolean;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<RegisterResult>;
  confirmSignUp: (email: string, code: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authErrorMessage(error: unknown, fallback: string): string {
  const err = error as { name?: string; message?: string };
  switch (err.name) {
    case 'NotAuthorizedException':
      return 'Incorrect email or password.';
    case 'UserNotConfirmedException':
      return 'Please verify your email before signing in.';
    case 'UsernameExistsException':
      return 'An account with this email already exists.';
    case 'InvalidPasswordException':
      return 'Password does not meet Cognito policy requirements.';
    case 'CodeMismatchException':
      return 'Invalid verification code.';
    case 'ExpiredCodeException':
      return 'Verification code expired. Request a new one.';
    case 'LimitExceededException':
    case 'TooManyRequestsException':
      return 'Too many attempts. Please wait and try again.';
    case 'UserAlreadyAuthenticatedException':
      return 'You are already signed in.';
    default:
      return err.message || fallback;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const hydrateSession = useCallback(async () => {
    const currentUser = await getCurrentUser();
    const session = await fetchAuthSession();
    if (!currentUser || !session.tokens?.idToken) {
      setUser(null);
      setToken(null);
      return;
    }

    const payload = session.tokens.idToken.payload as Record<string, string | undefined>;
    let preferredUsername = '';
    try {
      const attrs = await fetchUserAttributes();
      preferredUsername = attrs.preferred_username || '';
    } catch {
      // Token claims are enough when attributes are unavailable
    }

    setUser({
      id: String(payload.sub ?? ''),
      username:
        preferredUsername ||
        payload.preferred_username ||
        payload['cognito:username'] ||
        payload.email?.split('@')[0] ||
        'user',
      email: payload.email || '',
    });
    setToken(session.tokens.idToken.toString());
  }, []);

  useEffect(() => {
    hydrateSession()
      .catch(() => {
        setUser(null);
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, [hydrateSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        // Clear stale Cognito sessions that block a fresh sign-in
        try {
          await getCurrentUser();
          await signOut();
        } catch {
          // No existing session
        }

        const { isSignedIn } = await signIn({ username: email.trim(), password });
        if (!isSignedIn) {
          throw new Error('Sign-in incomplete. Please try again.');
        }
        await hydrateSession();
      } catch (error) {
        throw new Error(authErrorMessage(error, 'Failed to login'));
      }
    },
    [hydrateSession]
  );

  const register = useCallback(
    async (username: string, email: string, password: string): Promise<RegisterResult> => {
      try {
        const { isSignUpComplete, nextStep } = await signUp({
          username: email.trim(),
          password,
          options: {
            userAttributes: {
              email: email.trim(),
              preferred_username: username.trim(),
            },
          },
        });

        if (isSignUpComplete) {
          await login(email, password);
          return { needsVerification: false };
        }
        if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
          return { needsVerification: true, email: email.trim() };
        }
        throw new Error('Unexpected signup step');
      } catch (error) {
        throw new Error(authErrorMessage(error, 'Failed to register'));
      }
    },
    [login]
  );

  const confirmSignUpCode = useCallback(
    async (email: string, code: string, password: string) => {
      try {
        const { isSignUpComplete } = await confirmSignUp({
          username: email.trim(),
          confirmationCode: code.trim(),
        });
        if (!isSignUpComplete) {
          throw new Error('Verification incomplete');
        }
        await login(email, password);
      } catch (error) {
        throw new Error(authErrorMessage(error, 'Failed to verify email'));
      }
    },
    [login]
  );

  const logout = useCallback(async () => {
    try {
      await signOut();
    } finally {
      setUser(null);
      setToken(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      register,
      confirmSignUp: confirmSignUpCode,
      logout,
      isAuthenticated: !!user,
      loading,
    }),
    [user, token, login, register, confirmSignUpCode, logout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
