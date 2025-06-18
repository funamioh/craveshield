"use client";

import { useState, useEffect } from "react";
import { SavingsData } from "@/components/SavingsDashboard";

export function useSavings(userId?: string) {
  const [savings, setSavings] = useState<SavingsData>({
    totalMoneySaved: 0,
    totalCaloriesSaved: 0,
    alternativesChosen: 0,
    lastUpdated: new Date()
  });

  const storageKey = userId ? `craveshield-savings-${userId}` : 'craveshield-savings';

  // Load savings from localStorage on mount
  useEffect(() => {
    if (!userId) return; // Don't load if no user
    
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setSavings({
          ...parsed,
          lastUpdated: new Date(parsed.lastUpdated)
        });
      } catch (error) {
        console.error('Error loading savings data:', error);
      }
    } else {
      // Reset to default if no data for this user
      setSavings({
        totalMoneySaved: 0,
        totalCaloriesSaved: 0,
        alternativesChosen: 0,
        lastUpdated: new Date()
      });
    }
  }, [userId, storageKey]);

  // Save to localStorage whenever savings change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(storageKey, JSON.stringify(savings));
    }
  }, [savings, storageKey, userId]);

  const addSavings = (moneySaved: number, caloriesSaved: number) => {
    setSavings(prev => ({
      totalMoneySaved: prev.totalMoneySaved + moneySaved,
      totalCaloriesSaved: prev.totalCaloriesSaved + caloriesSaved,
      alternativesChosen: prev.alternativesChosen + 1,
      lastUpdated: new Date()
    }));
  };

  const resetSavings = () => {
    setSavings({
      totalMoneySaved: 0,
      totalCaloriesSaved: 0,
      alternativesChosen: 0,
      lastUpdated: new Date()
    });
  };

  return {
    savings,
    addSavings,
    resetSavings
  };
}