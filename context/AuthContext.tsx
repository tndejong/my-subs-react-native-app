import { createContext, useContext, useState } from 'react';
import { AuthProvider as SanctumProvider, useAuth as useSanctumAuth } from 'react-native-laravel-sanctum';
import * as Device from 'expo-device';
import { ENV } from '@/config/env';

const config = {
  loginUrl: ENV.SANCTUM_TOKEN_URL,
  logoutUrl: ENV.SANCTUM_LOGOUT_URL,
  registerUrl: ENV.SANCTUM_REGISTER_URL,
  userUrl: ENV.SANCTUM_USER_URL,
};

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SanctumProvider config={config}>
      <AuthProviderContent>{children}</AuthProviderContent>
    </SanctumProvider>
  );
}

function AuthProviderContent({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  const signIn = async (email: string, password: string) => {      
    const response = await fetch(config.loginUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        email,
        password,
        device_name: Device.modelName || 'unknown device',
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Invalid credentials');

    setIsAuthenticated(true);
    setToken(data.token);
  };

  const signOut = async () => {
    try {
      const response = await fetch(config.logoutUrl, {
        method: 'POST',
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Logout failed');

      setIsAuthenticated(false);
      setToken('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await fetch(config.registerUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('User already exists');
      }

      await signIn(email, password);
    } catch (error: any) {
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    token,
    signIn,
    signOut,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 