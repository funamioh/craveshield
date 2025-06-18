// Demo data setup for testing
import { AuthService } from "./authService";

export function setupDemoUsers() {
  // Check if demo users already exist
  const users = (AuthService as { getUsers: () => Record<string, unknown> }).getUsers();
  
  if (Object.keys(users).length === 0) {
    // Create demo users
    const demoUsers = [
      {
        id: "demo1",
        email: "demo@example.com",
        password: "demo123",
        name: "Demo User",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        lastLogin: new Date().toISOString()
      },
      {
        id: "demo2", 
        email: "user@test.com",
        password: "test123",
        name: "Test User",
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        lastLogin: new Date().toISOString()
      }
    ];

    const userMap: Record<string, unknown> = {};
    demoUsers.forEach(user => {
      userMap[user.id] = user;
    });

    (AuthService as { saveUsers: (users: Record<string, unknown>) => void }).saveUsers(userMap);

    // Create demo profiles and savings data
    setupDemoProfile("demo1", "Demo User");
    setupDemoProfile("demo2", "Test User");
  }
}

function setupDemoProfile(userId: string, name: string) {
  // Demo profile
  const demoProfile = {
    name: name,
    age: userId === "demo1" ? 28 : 35,
    activityLevel: userId === "demo1" ? "moderately_active" : "lightly_active",
    primaryGoal: userId === "demo1" ? "both" : "weight_loss",
    goals: {
      dailyCalorieTarget: userId === "demo1" ? 500 : 400,
      weeklyMoneyTarget: userId === "demo1" ? 25 : 20,
      monthlyCalorieTarget: userId === "demo1" ? 15000 : 12000,
      monthlyMoneyTarget: userId === "demo1" ? 100 : 80,
      personalMotivation: userId === "demo1" 
        ? "I want to feel healthier and save money for my vacation!"
        : "Building better habits for my family and future."
    },
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString()
  };

  localStorage.setItem(`craveshield-profile-${userId}`, JSON.stringify(demoProfile));

  // Demo savings data
  const demoSavings = {
    totalMoneySaved: userId === "demo1" ? 47.50 : 23.75,
    totalCaloriesSaved: userId === "demo1" ? 1250 : 680,
    alternativesChosen: userId === "demo1" ? 8 : 4,
    lastUpdated: new Date().toISOString()
  };

  localStorage.setItem(`craveshield-savings-${userId}`, JSON.stringify(demoSavings));
}