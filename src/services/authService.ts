"use client";

import { User, LoginCredentials, RegisterCredentials } from "@/types/auth";

// Simulated user database (in a real app, this would be a backend API)
const USERS_STORAGE_KEY = 'craveshield-users';
const CURRENT_USER_KEY = 'craveshield-current-user';

export class AuthService {
  private static getUsers(): Record<string, any> {
    if (typeof window === 'undefined') return {};
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : {};
  }

  private static saveUsers(users: Record<string, any>): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  static async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = this.getUsers();
    const userEntry = Object.values(users).find((user: any) => 
      user.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (!userEntry) {
      throw new Error('User not found');
    }

    if (userEntry.password !== credentials.password) {
      throw new Error('Invalid password');
    }

    const user: User = {
      id: userEntry.id,
      email: userEntry.email,
      name: userEntry.name,
      avatar: userEntry.avatar,
      createdAt: new Date(userEntry.createdAt),
      lastLogin: new Date()
    };

    // Update last login
    users[user.id] = { ...userEntry, lastLogin: user.lastLogin.toISOString() };
    this.saveUsers(users);

    // Save current user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return user;
  }

  static async register(credentials: RegisterCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const users = this.getUsers();
    
    // Check if user already exists
    const existingUser = Object.values(users).find((user: any) => 
      user.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const userId = this.generateId();
    const now = new Date();

    const user: User = {
      id: userId,
      email: credentials.email.toLowerCase(),
      name: credentials.name,
      createdAt: now,
      lastLogin: now
    };

    // Save user to storage
    users[userId] = {
      ...user,
      password: credentials.password, // In real app, this would be hashed
      createdAt: now.toISOString(),
      lastLogin: now.toISOString()
    };

    this.saveUsers(users);

    // Save current user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return user;
  }

  static async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }

  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    if (!userStr) return null;

    try {
      const userData = JSON.parse(userStr);
      return {
        ...userData,
        createdAt: new Date(userData.createdAt),
        lastLogin: new Date(userData.lastLogin)
      };
    } catch {
      return null;
    }
  }

  static async updateProfile(userId: string, updates: Partial<Pick<User, 'name' | 'avatar'>>): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = this.getUsers();
    const userEntry = users[userId];

    if (!userEntry) {
      throw new Error('User not found');
    }

    const updatedUserEntry = { ...userEntry, ...updates };
    users[userId] = updatedUserEntry;
    this.saveUsers(users);

    const updatedUser: User = {
      id: userEntry.id,
      email: userEntry.email,
      name: updatedUserEntry.name,
      avatar: updatedUserEntry.avatar,
      createdAt: new Date(userEntry.createdAt),
      lastLogin: new Date(userEntry.lastLogin)
    };

    // Update current user in storage
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    return updatedUser;
  }

  static async deleteAccount(userId: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = this.getUsers();
    delete users[userId];
    this.saveUsers(users);

    // Clear current user
    localStorage.removeItem(CURRENT_USER_KEY);
    
    // Clear user-specific data
    localStorage.removeItem(`craveshield-profile-${userId}`);
    localStorage.removeItem(`craveshield-savings-${userId}`);
  }

  static getAllUsers(): User[] {
    const users = this.getUsers();
    return Object.values(users).map((user: any) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      createdAt: new Date(user.createdAt),
      lastLogin: new Date(user.lastLogin)
    }));
  }
}