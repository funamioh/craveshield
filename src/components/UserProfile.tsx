"use client";

import { useState, useEffect } from "react";

export interface UserGoals {
  dailyCalorieTarget: number;
  weeklyMoneyTarget: number;
  monthlyCalorieTarget: number;
  monthlyMoneyTarget: number;
  personalMotivation: string;
}

export interface UserProfile {
  name: string;
  age?: number;
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
  primaryGoal: 'weight_loss' | 'healthy_eating' | 'save_money' | 'both';
  goals: UserGoals;
  createdAt: Date;
  lastUpdated: Date;
}

interface UserProfileProps {
  profile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
}

export default function UserProfile({ profile, onSave, onClose }: UserProfileProps) {
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    age: undefined,
    activityLevel: "moderately_active",
    primaryGoal: "both",
    goals: {
      dailyCalorieTarget: 500,
      weeklyMoneyTarget: 25,
      monthlyCalorieTarget: 15000,
      monthlyMoneyTarget: 100,
      personalMotivation: ""
    },
    createdAt: new Date(),
    lastUpdated: new Date()
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Load existing profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        lastUpdated: new Date()
      });
    }
  }, [profile]);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      lastUpdated: new Date()
    }));
  };

  const handleGoalChange = (field: keyof UserGoals, value: any) => {
    setFormData(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        [field]: value
      },
      lastUpdated: new Date()
    }));
  };

  const getRecommendedTargets = () => {
    const baseCalories = formData.activityLevel === 'sedentary' ? 300 :
                        formData.activityLevel === 'lightly_active' ? 400 :
                        formData.activityLevel === 'moderately_active' ? 500 : 600;
    
    const baseMoney = formData.primaryGoal === 'save_money' ? 35 :
                     formData.primaryGoal === 'both' ? 25 : 15;

    return {
      dailyCalories: baseCalories,
      weeklyMoney: baseMoney,
      monthlyCalories: baseCalories * 30,
      monthlyMoney: baseMoney * 4
    };
  };

  const applyRecommendedTargets = () => {
    const recommended = getRecommendedTargets();
    setFormData(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        dailyCalorieTarget: recommended.dailyCalories,
        weeklyMoneyTarget: recommended.weeklyMoney,
        monthlyCalorieTarget: recommended.monthlyCalories,
        monthlyMoneyTarget: recommended.monthlyMoney
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData);
      onClose();
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return true; // Activity level and goal are always valid
      case 3:
        return formData.goals.dailyCalorieTarget > 0 && formData.goals.weeklyMoneyTarget > 0;
      case 4:
        return true; // Motivation is optional
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                {profile ? "Edit Profile" : "Create Your Profile"}
              </h2>
              <p className="text-purple-100 mt-1">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-purple-300 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Tell us about yourself
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What should we call you? *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age (optional)
                </label>
                <input
                  type="number"
                  value={formData.age || ""}
                  onChange={(e) => handleInputChange('age', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Enter your age"
                  min="13"
                  max="120"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Step 2: Activity & Goals */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Your lifestyle and goals
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Activity Level
                </label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="sedentary">Sedentary (little to no exercise)</option>
                  <option value="lightly_active">Lightly Active (light exercise 1-3 days/week)</option>
                  <option value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</option>
                  <option value="very_active">Very Active (hard exercise 6-7 days/week)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Goal
                </label>
                <select
                  value={formData.primaryGoal}
                  onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="weight_loss">Weight Loss & Health</option>
                  <option value="healthy_eating">Healthy Eating Habits</option>
                  <option value="save_money">Save Money</option>
                  <option value="both">Both Health & Money</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Savings Targets */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Set your savings targets
                </h3>
                <button
                  onClick={applyRecommendedTargets}
                  className="text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800"
                >
                  Use Recommended
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Daily Calories Target
                  </label>
                  <input
                    type="number"
                    value={formData.goals.dailyCalorieTarget}
                    onChange={(e) => handleGoalChange('dailyCalorieTarget', parseInt(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weekly Money Target ($)
                  </label>
                  <input
                    type="number"
                    value={formData.goals.weeklyMoneyTarget}
                    onChange={(e) => handleGoalChange('weeklyMoneyTarget', parseInt(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Calories Target
                  </label>
                  <input
                    type="number"
                    value={formData.goals.monthlyCalorieTarget}
                    onChange={(e) => handleGoalChange('monthlyCalorieTarget', parseInt(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Money Target ($)
                  </label>
                  <input
                    type="number"
                    value={formData.goals.monthlyMoneyTarget}
                    onChange={(e) => handleGoalChange('monthlyMoneyTarget', parseInt(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  <strong>Recommended for you:</strong> Based on your activity level and goals, we suggest 
                  {getRecommendedTargets().dailyCalories} calories/day and ${getRecommendedTargets().weeklyMoney}/week.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Motivation */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                What motivates you?
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Personal Motivation (optional)
                </label>
                <textarea
                  value={formData.goals.personalMotivation}
                  onChange={(e) => handleGoalChange('personalMotivation', e.target.value)}
                  placeholder="e.g., I want to feel healthier and save money for my vacation..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  💡 <strong>Tip:</strong> Having a clear motivation helps you stay committed to your goals. 
                  We'll remind you of this when you need encouragement!
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={!isStepValid()}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Save Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}