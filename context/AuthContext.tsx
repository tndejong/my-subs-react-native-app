import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      // Get stored users
      const usersJSON = await AsyncStorage.getItem('users');
      const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
      
      // Find user with matching email and password
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      // Get existing users
      const usersJSON = await AsyncStorage.getItem('users');
      const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
      
      // Check if user already exists
      if (users.some(user => user.email === email)) {
        throw new Error('User already exists');
      }
      
      // Add new user
      const newUser = { email, password };
      users.push(newUser);
      
      // Save updated users list
      await AsyncStorage.setItem('users', JSON.stringify(users));
      
      // Auto sign in after registration
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('currentUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check for existing session on app start
  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) {
        setUser(JSON.parse(currentUser));
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 