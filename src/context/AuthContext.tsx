import React, { createContext, useState, useContext, useEffect } from 'react';
import { signIn, signUp, signOut, getCurrentUser, fetchAuthSession, confirmSignUp, fetchUserAttributes } from 'aws-amplify/auth';

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
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      const session = await fetchAuthSession();
      
      if (currentUser && session.tokens?.idToken) {
        const payload = session.tokens.idToken.payload as any;
        
        let preferredUsername = '';
        try {
          const userAttributes = await fetchUserAttributes();
          preferredUsername = userAttributes.preferred_username || '';
        } catch (attrError) {
          if (import.meta.env.DEV) {
            console.log('Could not fetch user attributes, using token claims');
          }
        }
        
        setUser({
          id: payload.sub,
          username: preferredUsername || payload.preferred_username || payload['cognito:username'] || payload.email?.split('@')[0] || 'user',
          email: payload.email || '',
        });
        setToken(session.tokens.idToken.toString());
      }
    } catch {
      if (import.meta.env.DEV) {
        console.log('No authenticated user');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      
      if (isSignedIn) {
        await checkUser();
      }
    } catch (error: unknown) {
      const err = error as Error;
      if (import.meta.env.DEV) {
        console.error('Login error:', err);
      }
      throw new Error(err.message || 'Failed to login');
    }
  };

  const register = async (username: string, email: string, password: string): Promise<RegisterResult> => {
    try {
      const { isSignUpComplete, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            preferred_username: username,
          },
        },
      });

      if (isSignUpComplete) {
        await login(email, password);
        return { needsVerification: false };
      } else {
        if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
          return { needsVerification: true, email };
        }
        throw new Error('Unexpected signup step');
      }
    } catch (error: unknown) {
      const err = error as Error;
      if (import.meta.env.DEV) {
        console.error('Registration error:', err);
      }
      throw new Error(err.message || 'Failed to register');
    }
  };

  const confirmSignUpCode = async (email: string, code: string, password: string) => {
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      if (isSignUpComplete) {
        await login(email, password);
      } else {
        throw new Error('Verification incomplete');
      }
    } catch (error: unknown) {
      const err = error as Error;
      if (import.meta.env.DEV) {
        console.error('Verification error:', err);
      }
      throw new Error(err.message || 'Failed to verify email');
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setToken(null);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Logout error:', error);
      }
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    confirmSignUp: confirmSignUpCode,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
