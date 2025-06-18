"use client";

import { UserProfile } from "./UserProfile";
import { SavingsData } from "./SavingsDashboard";

interface GoalsDashboardProps {
  profile: UserProfile;
  savings: SavingsData;
  onClose: () => void;
  onEditProfile: () => void;
}

export default function GoalsDashboard({ profile, savings, onClose, onEditProfile }: GoalsDashboardProps) {
  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-gray-400";
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage >= 100) return "🎉";
    if (percentage >= 75) return "🔥";
    if (percentage >= 50) return "💪";
    return "🎯";
  };

  const dailyCalorieProgress = getProgressPercentage(savings.totalCaloriesSaved, profile.goals.dailyCalorieTarget);
  const weeklyMoneyProgress = getProgressPercentage(savings.totalMoneySaved, profile.goals.weeklyMoneyTarget);
  const monthlyCalorieProgress = getProgressPercentage(savings.totalCaloriesSaved, profile.goals.monthlyCalorieTarget);
  const monthlyMoneyProgress = getProgressPercentage(savings.totalMoneySaved, profile.goals.monthlyMoneyTarget);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Your Goals Progress</h2>
              <p className="text-indigo-100 mt-1">
                Keep track of your personal targets, {profile.name}!
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onEditProfile}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg text-sm transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Profile Summary
                </h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Activity Level:</strong> {profile.activityLevel.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                  <p><strong>Primary Goal:</strong> {profile.primaryGoal.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                  {profile.goals.personalMotivation && (
                    <p><strong>Motivation:</strong> "{profile.goals.personalMotivation}"</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl">👤</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {profile.age && `Age: ${profile.age}`}
                </div>
              </div>
            </div>
          </div>

          {/* Goals Progress Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Daily Calorie Goal */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                  Daily Calories Target
                </h4>
                <span className="text-2xl">{getStatusIcon(dailyCalorieProgress)}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600 dark:text-blue-400">
                    {Math.round(savings.totalCaloriesSaved)} / {profile.goals.dailyCalorieTarget} cal
                  </span>
                  <span className="font-medium text-blue-700 dark:text-blue-300">
                    {Math.round(dailyCalorieProgress)}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3">
                  <div 
                    className={`${getProgressColor(dailyCalorieProgress)} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${dailyCalorieProgress}%` }}
                  ></div>
                </div>
                {dailyCalorieProgress >= 100 && (
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    🎉 Daily goal achieved!
                  </p>
                )}
              </div>
            </div>

            {/* Weekly Money Goal */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-green-800 dark:text-green-200">
                  Weekly Money Target
                </h4>
                <span className="text-2xl">{getStatusIcon(weeklyMoneyProgress)}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 dark:text-green-400">
                    {formatCurrency(savings.totalMoneySaved)} / {formatCurrency(profile.goals.weeklyMoneyTarget)}
                  </span>
                  <span className="font-medium text-green-700 dark:text-green-300">
                    {Math.round(weeklyMoneyProgress)}%
                  </span>
                </div>
                <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-3">
                  <div 
                    className={`${getProgressColor(weeklyMoneyProgress)} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${weeklyMoneyProgress}%` }}
                  ></div>
                </div>
                {weeklyMoneyProgress >= 100 && (
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    🎉 Weekly goal achieved!
                  </p>
                )}
              </div>
            </div>

            {/* Monthly Calorie Goal */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                  Monthly Calories Target
                </h4>
                <span className="text-2xl">{getStatusIcon(monthlyCalorieProgress)}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-600 dark:text-purple-400">
                    {Math.round(savings.totalCaloriesSaved)} / {profile.goals.monthlyCalorieTarget} cal
                  </span>
                  <span className="font-medium text-purple-700 dark:text-purple-300">
                    {Math.round(monthlyCalorieProgress)}%
                  </span>
                </div>
                <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-3">
                  <div 
                    className={`${getProgressColor(monthlyCalorieProgress)} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${monthlyCalorieProgress}%` }}
                  ></div>
                </div>
                {monthlyCalorieProgress >= 100 && (
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    🎉 Monthly goal achieved!
                  </p>
                )}
              </div>
            </div>

            {/* Monthly Money Goal */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-orange-800 dark:text-orange-200">
                  Monthly Money Target
                </h4>
                <span className="text-2xl">{getStatusIcon(monthlyMoneyProgress)}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-orange-600 dark:text-orange-400">
                    {formatCurrency(savings.totalMoneySaved)} / {formatCurrency(profile.goals.monthlyMoneyTarget)}
                  </span>
                  <span className="font-medium text-orange-700 dark:text-orange-300">
                    {Math.round(monthlyMoneyProgress)}%
                  </span>
                </div>
                <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-3">
                  <div 
                    className={`${getProgressColor(monthlyMoneyProgress)} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${monthlyMoneyProgress}%` }}
                  ></div>
                </div>
                {monthlyMoneyProgress >= 100 && (
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    🎉 Monthly goal achieved!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Overall Progress Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Overall Progress Summary
            </h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.round((dailyCalorieProgress + monthlyCalorieProgress) / 2)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Calorie Goals
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Math.round((weeklyMoneyProgress + monthlyMoneyProgress) / 2)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Money Goals
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">💪</div>
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  Keep Going!
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  {profile.goals.personalMotivation || 
                   "Every healthy choice brings you closer to your goals. You're doing great!"}
                </p>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            Profile last updated: {profile.lastUpdated.toLocaleDateString()} at {profile.lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}