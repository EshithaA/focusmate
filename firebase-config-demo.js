// Firebase Configuration - DEMO VERSION
// This version works without Firebase setup for testing purposes

// Mock Firebase functions for demo purposes
const mockUser = {
  uid: 'demo-user-123',
  email: 'demo@example.com'
};

const mockUserData = {
  username: 'Demo User',
  email: 'demo@example.com',
  xp: 0,
  level: 1,
  rank: 'New Learner',
  studySessions: 0,
  totalStudyTime: 0,
  totalBreakTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  badges: [],
  unlockedThemes: ['default'],
  currentTheme: 'default',
  createdAt: new Date(),
  lastActive: new Date()
};

// Mock authentication functions
export const signUp = async (email, password, username) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Store user data in localStorage for demo
  const userData = {
    ...mockUserData,
    username: username,
    email: email
  };
  
  localStorage.setItem('demoUser', JSON.stringify(userData));
  localStorage.setItem('isLoggedIn', 'true');
  
  return { success: true, user: mockUser };
};

export const signIn = async (email, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user exists in localStorage
  const storedUser = localStorage.getItem('demoUser');
  if (storedUser) {
    localStorage.setItem('isLoggedIn', 'true');
    return { success: true, user: mockUser };
  }
  
  return { success: false, error: 'User not found. Please sign up first.' };
};

export const logout = async () => {
  localStorage.removeItem('isLoggedIn');
  return { success: true };
};

// Mock user data functions
export const getUserData = async (userId) => {
  const storedUser = localStorage.getItem('demoUser');
  if (storedUser) {
    return { success: true, data: JSON.parse(storedUser) };
  }
  return { success: false, error: 'User not found' };
};

export const updateUserData = async (userId, data) => {
  const storedUser = localStorage.getItem('demoUser');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    const updatedData = { ...userData, ...data, lastActive: new Date() };
    localStorage.setItem('demoUser', JSON.stringify(updatedData));
    return { success: true };
  }
  return { success: false, error: 'User not found' };
};

// Mock XP system
export const addXP = async (userId, xpAmount, reason) => {
  const storedUser = localStorage.getItem('demoUser');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    const newXP = userData.xp + xpAmount;
    const newLevel = calculateLevel(newXP);
    const newRank = getRankTitle(newLevel);
    
    const updatedData = {
      ...userData,
      xp: newXP,
      level: newLevel,
      rank: newRank
    };
    
    localStorage.setItem('demoUser', JSON.stringify(updatedData));
    
    return { 
      success: true, 
      newXP, 
      newLevel, 
      newRank,
      leveledUp: newLevel > userData.level
    };
  }
  return { success: false, error: 'User not found' };
};

// Level calculation
export const calculateLevel = (xp) => {
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 1000) return 4;
  if (xp < 2000) return 5;
  return 6;
};

// Rank titles
export const getRankTitle = (level) => {
  const ranks = {
    1: 'New Learner',
    2: 'Focused Starter',
    3: 'Consistent Learner',
    4: 'Study Sprinter',
    5: 'Focus Master',
    6: 'Zen Scholar'
  };
  return ranks[level] || 'Zen Scholar';
};

// Mock leaderboard functions
export const getLeaderboard = async (limitCount = 10) => {
  const storedUser = localStorage.getItem('demoUser');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    return { 
      success: true, 
      leaderboard: [{
        id: 'demo-user-123',
        ...userData
      }]
    };
  }
  return { success: true, leaderboard: [] };
};

export const subscribeToLeaderboard = (callback, limitCount = 10) => {
  const storedUser = localStorage.getItem('demoUser');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    callback([{
      id: 'demo-user-123',
      ...userData
    }]);
  } else {
    callback([]);
  }
  
  // Return a mock unsubscribe function
  return () => {};
};

// Mock theme functions
export const unlockTheme = async (userId, themeName) => {
  const storedUser = localStorage.getItem('demoUser');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    const unlockedThemes = [...userData.unlockedThemes];
    
    if (!unlockedThemes.includes(themeName)) {
      unlockedThemes.push(themeName);
      const updatedData = { ...userData, unlockedThemes };
      localStorage.setItem('demoUser', JSON.stringify(updatedData));
    }
    
    return { success: true };
  }
  return { success: false, error: 'User not found' };
};

export const setCurrentTheme = async (userId, themeName) => {
  const storedUser = localStorage.getItem('demoUser');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    const updatedData = { ...userData, currentTheme: themeName };
    localStorage.setItem('demoUser', JSON.stringify(updatedData));
    return { success: true };
  }
  return { success: false, error: 'User not found' };
};

// Mock auth state listener
export const onAuthStateChange = (callback) => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (isLoggedIn) {
    callback(mockUser);
  } else {
    callback(null);
  }
  
  // Return a mock unsubscribe function
  return () => {};
};

// Mock auth and db exports for compatibility
export const auth = {
  currentUser: mockUser
};

export const db = {};

export const functions = {};
