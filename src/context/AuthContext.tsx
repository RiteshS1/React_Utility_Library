import React, { createContext, useState, useContext, useEffect } from 'react';
import { signIn, signUp, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
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
    // Check for current authenticated user on mount
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      const session = await fetchAuthSession();
      
      if (currentUser && session.tokens?.accessToken) {
        setUser({
          id: currentUser.userId,
          username: currentUser.username || '',
          email: currentUser.signInDetails?.loginId || '',
        });
        setToken(session.tokens.accessToken.toString());
      }
    } catch {
      // User is not authenticated
      console.log('No authenticated user');
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
      console.error('Login error:', err);
      throw new Error(err.message || 'Failed to login');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const { isSignUpComplete } = await signUp({
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
        // Auto-login after successful registration
        await login(email, password);
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Registration error:', err);
      throw new Error(err.message || 'Failed to register');
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    token,
    login,
    register,
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
