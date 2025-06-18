"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { User, AuthState, LoginCredentials, RegisterCredentials } from "@/types/auth";
import { AuthService } from "@/services/authService";

const AuthContext = createContext<{
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<User, 'name' | 'avatar'>>) => Promise<void>;
  deleteAccount: () => Promise<void>;
} | null>(null);

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = AuthService.getCurrentUser();
    setAuthState({
      user: currentUser,
      isAuthenticated: !!currentUser,
      isLoading: false
    });
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await AuthService.login(credentials);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await AuthService.register(credentials);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      await AuthService.logout();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<Pick<User, 'name' | 'avatar'>>) => {
    if (!authState.user) throw new Error('No user logged in');
    
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const updatedUser = await AuthService.updateProfile(authState.user.id, updates);
      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const deleteAccount = async () => {
    if (!authState.user) throw new Error('No user logged in');
    
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      await AuthService.deleteAccount(authState.user.id);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  return {
    authState,
    login,
    register,
    logout,
    updateProfile,
    deleteAccount
  };
}

export { AuthContext };