"use client";

import { useState, useEffect } from "react";

export interface SavingsData {
  totalMoneySaved: number;
  totalCaloriesSaved: number;
  alternativesChosen: number;
  lastUpdated: Date;
}

interface SavingsDashboardProps {
  savings: SavingsData;
  onClose: () => void;
}

export default function SavingsDashboard({ savings, onClose }: SavingsDashboardProps) {
  const [animatedMoney, setAnimatedMoney] = useState(0);
  const [animatedCalories, setAnimatedCalories] = useState(0);
  const [animatedAlternatives, setAnimatedAlternatives] = useState(0);

  // Animate numbers on mount
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const moneyStep = savings.totalMoneySaved / steps;
    const caloriesStep = savings.totalCaloriesSaved / steps;
    const alternativesStep = savings.alternativesChosen / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnimatedMoney(Math.min(moneyStep * currentStep, savings.totalMoneySaved));
      setAnimatedCalories(Math.min(caloriesStep * currentStep, savings.totalCaloriesSaved));
      setAnimatedAlternatives(Math.min(alternativesStep * currentStep, savings.alternativesChosen));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [savings]);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatCalories = (calories: number) => {
    return Math.round(calories).toLocaleString();
  };

  const getMotivationalMessage = () => {
    if (savings.totalCaloriesSaved > 2000) {
      return "Amazing! You've saved more than a day's worth of calories! 🎉";
    } else if (savings.totalCaloriesSaved > 1000) {
      return "Great progress! You're making healthier choices! 💪";
    } else if (savings.totalCaloriesSaved > 500) {
      return "Good start! Keep choosing healthier alternatives! 🌟";
    } else {
      return "Every healthy choice counts! Keep it up! 🚀";
    }
  };

  const getHealthEquivalent = () => {
    const walkingMinutes = Math.round(savings.totalCaloriesSaved / 5); // ~5 calories per minute walking
    const runningMinutes = Math.round(savings.totalCaloriesSaved / 10); // ~10 calories per minute running
    
    if (walkingMinutes > 60) {
      return `That's equivalent to ${Math.round(walkingMinutes / 60)} hours of walking!`;
    } else if (walkingMinutes > 0) {
      return `That's equivalent to ${walkingMinutes} minutes of walking or ${runningMinutes} minutes of running!`;
    }
    return "";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Savings Dashboard</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-green-100 mt-2">Track your healthy choices impact!</p>
        </div>

        {/* Stats Cards */}
        <div className="p-6 space-y-6">
          {/* Money Saved */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                  💰 Money Saved
                </h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {formatMoney(animatedMoney)}
                </p>
              </div>
              <div className="text-4xl">💵</div>
            </div>
          </div>

          {/* Calories Saved */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                  🔥 Calories Saved
                </h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCalories(animatedCalories)}
                </p>
                {getHealthEquivalent() && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    {getHealthEquivalent()}
                  </p>
                )}
              </div>
              <div className="text-4xl">🏃‍♂️</div>
            </div>
          </div>

          {/* Alternatives Chosen */}
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                  🥗 Healthy Choices
                </h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round(animatedAlternatives)}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  alternatives chosen
                </p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <div className="text-center">
              <p className="text-lg font-medium text-yellow-800 dark:text-yellow-200">
                {getMotivationalMessage()}
              </p>
            </div>
          </div>

          {/* Progress Visualization */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Your Progress
            </h3>
            
            {/* Calories Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Calories Saved</span>
                <span>{formatCalories(savings.totalCaloriesSaved)} / 5000</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((savings.totalCaloriesSaved / 5000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Money Progress Bar */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Money Saved</span>
                <span>{formatMoney(savings.totalMoneySaved)} / $100</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((savings.totalMoneySaved / 100) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Last updated: {savings.lastUpdated.toLocaleDateString()} at {savings.lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}