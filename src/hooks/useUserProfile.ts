"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@/components/UserProfile";

export function useUserProfile(userId?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = userId ? `craveshield-profile-${userId}` : 'craveshield-profile';

  // Load profile from localStorage on mount
  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    const savedProfile = localStorage.getItem(storageKey);
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile({
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          lastUpdated: new Date(parsed.lastUpdated)
        });
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    } else {
      setProfile(null);
    }
    setIsLoading(false);
  }, [userId, storageKey]);

  // Save to localStorage whenever profile changes
  useEffect(() => {
    if (profile && userId) {
      localStorage.setItem(storageKey, JSON.stringify(profile));
    }
  }, [profile, storageKey, userId]);

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (profile) {
      setProfile({
        ...profile,
        ...updates,
        lastUpdated: new Date()
      });
    }
  };

  const deleteProfile = () => {
    setProfile(null);
    localStorage.removeItem('craveshield-profile');
  };

  const hasProfile = () => {
    return profile !== null;
  };

  const getGreeting = () => {
    if (!profile) return "Welcome!";
    
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? "Good morning" : 
                        hour < 17 ? "Good afternoon" : "Good evening";
    
    return `${timeGreeting}, ${profile.name}!`;
  };

  const getMotivationalMessage = () => {
    if (!profile) return "";
    
    if (profile.goals.personalMotivation) {
      return `Remember: ${profile.goals.personalMotivation}`;
    }
    
    switch (profile.primaryGoal) {
      case 'weight_loss':
        return "Every healthy choice brings you closer to your weight loss goals!";
      case 'healthy_eating':
        return "Building healthy eating habits one choice at a time!";
      case 'save_money':
        return "Smart choices today mean more money in your pocket tomorrow!";
      case 'both':
        return "You're improving your health AND saving money - that's a win-win!";
      default:
        return "Keep making those healthy choices!";
    }
  };

  const getProgressTowardsGoals = (currentSavings: { totalMoneySaved: number; totalCaloriesSaved: number }) => {
    if (!profile) return null;
    
    // For demo purposes, we'll use current total savings
    // In a real app, you'd track daily/weekly/monthly separately
    
    // For demo purposes, we'll use current total savings
    // In a real app, you'd track daily/weekly/monthly separately
    const dailyCalorieProgress = Math.min((currentSavings.totalCaloriesSaved / profile.goals.dailyCalorieTarget) * 100, 100);
    const weeklyMoneyProgress = Math.min((currentSavings.totalMoneySaved / profile.goals.weeklyMoneyTarget) * 100, 100);
    const monthlyCalorieProgress = Math.min((currentSavings.totalCaloriesSaved / profile.goals.monthlyCalorieTarget) * 100, 100);
    const monthlyMoneyProgress = Math.min((currentSavings.totalMoneySaved / profile.goals.monthlyMoneyTarget) * 100, 100);

    return {
      daily: {
        calories: {
          current: currentSavings.totalCaloriesSaved,
          target: profile.goals.dailyCalorieTarget,
          progress: dailyCalorieProgress
        }
      },
      weekly: {
        money: {
          current: currentSavings.totalMoneySaved,
          target: profile.goals.weeklyMoneyTarget,
          progress: weeklyMoneyProgress
        }
      },
      monthly: {
        calories: {
          current: currentSavings.totalCaloriesSaved,
          target: profile.goals.monthlyCalorieTarget,
          progress: monthlyCalorieProgress
        },
        money: {
          current: currentSavings.totalMoneySaved,
          target: profile.goals.monthlyMoneyTarget,
          progress: monthlyMoneyProgress
        }
      }
    };
  };

  const isGoalAchieved = (type: 'daily_calories' | 'weekly_money' | 'monthly_calories' | 'monthly_money', currentSavings: { totalMoneySaved: number; totalCaloriesSaved: number }) => {
    if (!profile) return false;

    switch (type) {
      case 'daily_calories':
        return currentSavings.totalCaloriesSaved >= profile.goals.dailyCalorieTarget;
      case 'weekly_money':
        return currentSavings.totalMoneySaved >= profile.goals.weeklyMoneyTarget;
      case 'monthly_calories':
        return currentSavings.totalCaloriesSaved >= profile.goals.monthlyCalorieTarget;
      case 'monthly_money':
        return currentSavings.totalMoneySaved >= profile.goals.monthlyMoneyTarget;
      default:
        return false;
    }
  };

  return {
    profile,
    isLoading,
    saveProfile,
    updateProfile,
    deleteProfile,
    hasProfile,
    getGreeting,
    getMotivationalMessage,
    getProgressTowardsGoals,
    isGoalAchieved
  };
}