"use client";

import { useState } from "react";
import { findProduct, generateProductResponse, generateDecisionResponse, detectUnknownFood, generateClarificationResponse, Product } from "@/lib/productDatabase";
import DecisionButtons from "@/components/DecisionButtons";
import SavingsDashboard from "@/components/SavingsDashboard";
import UserProfile from "@/components/UserProfile";
import GoalsDashboard from "@/components/GoalsDashboard";
import AuthModal from "@/components/AuthModal";
import { useSavings } from "@/hooks/useSavings";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/hooks/useAuth";
import { setupDemoUsers } from "@/services/demoData";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [showSavingsDashboard, setShowSavingsDashboard] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showGoalsDashboard, setShowGoalsDashboard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  
  // Authentication
  const { authState, login, register, logout } = useAuth();
  const { user, isAuthenticated } = authState;
  
  // User-specific data
  const { savings, addSavings } = useSavings(user?.id);
  const { profile, hasProfile, saveProfile, getGreeting, getMotivationalMessage } = useUserProfile(user?.id);

  // Initialize demo data on first load
  useState(() => {
    setupDemoUsers();
  });

  // Initialize welcome message based on authentication and profile
  useState(() => {
    if (!isAuthenticated) {
      setMessages([
        { text: "Welcome to CraveShield! Please sign in or create an account to start tracking your personal craving management journey.", isUser: false }
      ]);
    } else if (hasProfile()) {
      setMessages([
        { text: `${getGreeting()} ${getMotivationalMessage()}`, isUser: false }
      ]);
    } else {
      setMessages([
        { text: `Welcome ${user?.name}! Let's set up your profile to personalize your CraveShield experience and start tracking your progress.`, isUser: false }
      ]);
    }
  });

  // General responses for non-product queries
  const getGeneralResponse = (userMessage: string): string => {
    const input = userMessage.toLowerCase();
    
    if (input.includes("hungry") || input.includes("craving")) {
      return "I understand you're experiencing cravings. Can you tell me what specific food you're craving? I can help you find healthier alternatives with recipes and nutritional information!";
    }
    
    if (input.includes("sweet") || input.includes("sugar")) {
      return "Sweet cravings are very common! Try mentioning a specific sweet treat you're craving (like 'chocolate chip cookies' or 'ice cream') and I'll give you the nutritional info plus a healthier homemade alternative.";
    }
    
    if (input.includes("fast food") || input.includes("junk food")) {
      return "Fast food cravings can be tough! Tell me exactly what you're craving (like 'Big Mac' or 'pizza') and I'll show you how many calories it has, the cost, and give you a delicious homemade alternative recipe.";
    }
    
    if (input.includes("help") || input.includes("how")) {
      return "I'm here to help you make healthier choices! Just tell me what specific food you're craving, and I'll provide:\n\n- Calorie and cost information\n- A healthier homemade alternative\n- Step-by-step recipe instructions\n\nTry saying something like 'I'm craving chocolate chip cookies' or 'I want pizza'!";
    }

    if (!isAuthenticated) {
      return "To get personalized recommendations and track your progress, please sign in or create an account first!";
    }
    
    return "Thanks for sharing! I'm here to help you manage your cravings with healthier alternatives. Try mentioning a specific food you're craving (like cookies, pizza, burgers, etc.) and I'll give you nutritional info plus a homemade recipe alternative!";
  };

  // Handle user decision for pending product
  const handleDecision = (choice: 'resist' | 'alternative' | 'original') => {
    if (pendingProduct) {
      const decisionResult = generateDecisionResponse(choice, pendingProduct);
      
      // Add savings based on user's actual decision
      addSavings(decisionResult.moneySaved, decisionResult.caloriesSaved);
      
      // Add the decision response message
      setMessages(prev => [...prev, { 
        text: decisionResult.message, 
        isUser: false 
      }]);
      
      // Clear pending product
      setPendingProduct(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Clear any pending product when user asks a new question
      setPendingProduct(null);
      
      // Add user message
      setMessages(prev => [...prev, { text: message, isUser: true }]);
      
      // Generate intelligent response
      setTimeout(() => {
        if (!isAuthenticated) {
          setMessages(prev => [...prev, { 
            text: "Please sign in to get personalized recommendations and track your progress!", 
            isUser: false 
          }]);
          return;
        }

        const product = findProduct(message);
        let response: string;
        
        if (product) {
          // Product found - provide detailed nutritional info and alternative
          response = generateProductResponse(product);
          // Store the product for decision tracking (don't add savings yet)
          setPendingProduct(product);
        } else {
          // Check if user mentioned an unknown food
          const unknownFood = detectUnknownFood(message);
          if (unknownFood) {
            // User mentioned a food we don't recognize - ask for clarification
            response = generateClarificationResponse(unknownFood);
            setPendingProduct(null);
          } else {
            // No specific product found - provide general support
            response = getGeneralResponse(message);
            // Make sure no pending product for general responses
            setPendingProduct(null);
          }
        }
        
        setMessages(prev => [...prev, { 
          text: response, 
          isUser: false 
        }]);
      }, 1000);
      
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              CraveShield
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
              Your personal craving management assistant
            </p>
          </div>
          <div className="flex space-x-2">
            {isAuthenticated ? (
              <>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Hi, {user?.name}!
                  </div>
                  <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                    ${savings.totalMoneySaved.toFixed(2)} saved
                  </div>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {Math.round(savings.totalCaloriesSaved)} cal saved
                  </div>
                </div>
                <div className="flex space-x-2">
                  {hasProfile() ? (
                    <button
                      onClick={() => setShowGoalsDashboard(true)}
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 text-sm font-medium shadow-md"
                    >
                      Goals
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowUserProfile(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-sm font-medium shadow-md"
                    >
                      Setup Profile
                    </button>
                  )}
                  <button
                    onClick={() => setShowSavingsDashboard(true)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 text-sm font-medium shadow-md"
                  >
                    Savings
                  </button>
                  <button
                    onClick={logout}
                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 text-sm font-medium shadow-md"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Welcome to CraveShield!
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Sign in to track progress
                  </div>
                </div>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg ${
                msg.isUser
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              {/* Show decision buttons for the last AI message if there's a pending product */}
              {!msg.isUser && index === messages.length - 1 && pendingProduct && (
                <DecisionButtons
                  product={pendingProduct}
                  onDecision={handleDecision}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your cravings..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!message.trim()}
          >
            Send
          </button>
        </form>
      </div>

      {/* Modals */}
      {showSavingsDashboard && (
        <SavingsDashboard
          savings={savings}
          onClose={() => setShowSavingsDashboard(false)}
        />
      )}

      {showUserProfile && (
        <UserProfile
          profile={profile}
          onSave={(newProfile) => {
            saveProfile(newProfile);
            setMessages([
              { text: `Welcome, ${newProfile.name}! Your profile has been saved. ${getMotivationalMessage()} Now tell me what you're craving and I'll help you make healthier choices!`, isUser: false }
            ]);
          }}
          onClose={() => setShowUserProfile(false)}
        />
      )}

      {showGoalsDashboard && profile && (
        <GoalsDashboard
          profile={profile}
          savings={savings}
          onClose={() => setShowGoalsDashboard(false)}
          onEditProfile={() => {
            setShowGoalsDashboard(false);
            setShowUserProfile(true);
          }}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={login}
          onRegister={register}
        />
      )}
    </div>
  );
}