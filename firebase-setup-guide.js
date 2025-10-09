// Firebase Configuration Setup Guide
// Replace the placeholder values below with your actual Firebase project configuration

const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Instructions for setting up Firebase:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select an existing one
// 3. Enable Authentication (Email/Password)
// 4. Enable Firestore Database
// 5. Go to Project Settings > General > Your apps
// 6. Add a web app and copy the config object
// 7. Replace the values above with your actual config
// 8. Set up Firestore security rules (see below)

/*
Firestore Security Rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read leaderboard data
    match /leaderboard/{document} {
      allow read: if true;
    }
  }
}
*/

// Database Structure:
// Collection: users
// Document: {userId}
// Fields:
// - username: string
// - email: string
// - xp: number
// - level: number
// - rank: string
// - studySessions: number
// - totalStudyTime: number
// - totalBreakTime: number
// - currentStreak: number
// - longestStreak: number
// - badges: array
// - unlockedThemes: array
// - currentTheme: string
// - createdAt: timestamp
// - lastActive: timestamp

export { firebaseConfig };
