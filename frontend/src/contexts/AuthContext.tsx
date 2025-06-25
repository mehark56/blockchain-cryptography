import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers, isAddress } from 'ethers';
import web3Service from '../services/web3Service';

export interface User {
  address: string;
  name: string;
  email?: string;
  photo: string;
  role: 'admin' | 'user';
  isAdmin: boolean;
  profilePhoto?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (input: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setIsAdmin(parsedUser.isAdmin);
      }
    };
    checkAuth();
  }, []);

  const checkAdminStatus = async (address: string): Promise<boolean> => {
    try {
      const adminAddress = await web3Service.getAdminAddress();
      return address.toLowerCase() === adminAddress.toLowerCase();
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  const login = async (input: string) => {
    try {
      let address: string;
      let isAdminStatus = false;
      // If input is a valid Ethereum address, use it directly (Frame/MetaMask)
      if (isAddress(input)) {
        address = input;
        isAdminStatus = await checkAdminStatus(address);
      } else {
        // Otherwise, treat as private key (legacy, not used now)
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const wallet = new ethers.Wallet(input, provider);
        address = await wallet.getAddress();
        isAdminStatus = await checkAdminStatus(address);
      }
      const userData: User = {
        address,
        name: '',
        email: '',
        photo: '',
        role: 'user',
        isAdmin: isAdminStatus,
      };
      setUser(userData);
      setIsAuthenticated(true);
      setIsAdmin(isAdminStatus);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    const updatedUser: User = {
      ...user,
      ...userData,
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = {
        ...user,
        ...userData,
      } as User;
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin,
    login,
    logout,
    updateUser,
    updateProfile,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}; 