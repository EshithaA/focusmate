// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Your Firebase config - Replace with your actual config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

// Authentication functions
export const signUp = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      username: username,
      email: email,
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
    });
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// User data functions
export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateUserData = async (userId, data) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...data,
      lastActive: new Date()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// XP and Level system
export const addXP = async (userId, xpAmount, reason) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      return { success: false, error: 'User not found' };
    }
    
    const userData = userDoc.data();
    const newXP = userData.xp + xpAmount;
    const newLevel = calculateLevel(newXP);
    const newRank = getRankTitle(newLevel);
    
    await updateDoc(doc(db, 'users', userId), {
      xp: newXP,
      level: newLevel,
      rank: newRank
    });
    
    return { 
      success: true, 
      newXP, 
      newLevel, 
      newRank,
      leveledUp: newLevel > userData.level
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
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

// Leaderboard functions
export const getLeaderboard = async (limitCount = 10) => {
  try {
    const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    const leaderboard = [];
    
    querySnapshot.forEach((doc) => {
      leaderboard.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, leaderboard };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Real-time leaderboard subscription
export const subscribeToLeaderboard = (callback, limitCount = 10) => {
  const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(limitCount));
  return onSnapshot(q, (querySnapshot) => {
    const leaderboard = [];
    querySnapshot.forEach((doc) => {
      leaderboard.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(leaderboard);
  });
};

// Theme system
export const unlockTheme = async (userId, themeName) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      return { success: false, error: 'User not found' };
    }
    
    const userData = userDoc.data();
    const unlockedThemes = [...userData.unlockedThemes];
    
    if (!unlockedThemes.includes(themeName)) {
      unlockedThemes.push(themeName);
      await updateDoc(doc(db, 'users', userId), {
        unlockedThemes: unlockedThemes
      });
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const setCurrentTheme = async (userId, themeName) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      currentTheme: themeName
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth state listener
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
