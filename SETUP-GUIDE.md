# Quick Setup Guide for FocusMate

## 🚀 **Option 1: Demo Mode (Works Immediately)**

The app is currently set to **demo mode** and will work without any Firebase setup! You can:

1. Open `index.html` in your browser
2. Click "Get Started"
3. Sign up with any email/password
4. Use all features (timer, leaderboard, themes)

**Note**: Data is stored locally and will be lost when you clear browser data.

---

## 🔥 **Option 2: Full Firebase Setup (Recommended)**

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `focusmate-pomodoro`
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password**
5. Click **Save**

### Step 3: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode**
4. Select a location (choose closest to you)
5. Click **Done**

### Step 4: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click **Web** icon (`</>`)
4. Enter app nickname: `FocusMate Web`
5. Click **Register app**
6. Copy the config object

### Step 5: Update Configuration

1. Open `firebase-config.js`
2. Replace the placeholder config with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### Step 6: Set Firestore Security Rules

1. In Firebase Console, go to **Firestore Database**
2. Click **Rules** tab
3. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Click **Publish**

### Step 7: Switch to Production Mode

1. Update all HTML files to use `firebase-config.js` instead of `firebase-config-demo.js`
2. Change the import statements from:
   ```javascript
   import { ... } from './firebase-config-demo.js';
   ```
   to:
   ```javascript
   import { ... } from './firebase-config.js';
   ```

### Files to Update:
- `login.html`
- `dashboard.html`
- `Pomodoro.html`
- `leaderboard.html`
- `themes.html`

---

## 🧪 **Testing the App**

### Demo Mode Testing:
1. Open `index.html` in browser
2. Sign up with any credentials
3. Test all features

### Firebase Mode Testing:
1. Complete Firebase setup
2. Update all files to use `firebase-config.js`
3. Open `index.html` in browser
4. Sign up with real email
5. Test all features

---

## 🐛 **Troubleshooting**

### Common Issues:

1. **"Firebase not initialized" error**
   - Check your Firebase config values
   - Ensure all fields are filled correctly

2. **"Permission denied" error**
   - Check Firestore security rules
   - Ensure rules allow authenticated users

3. **"User not found" error**
   - Check if Authentication is enabled
   - Verify Email/Password is enabled

4. **Import errors**
   - Ensure you're using a local server (not file://)
   - Use `npm start` or similar local server

### Running Locally:

```bash
# Install dependencies
npm install

# Start local server
npm start
```

Then open `http://localhost:3000`

---

## 📱 **Features Available**

✅ **Authentication**: Sign up/Login with email
✅ **Pomodoro Timer**: Customizable study sessions
✅ **XP System**: Earn points and level up
✅ **Leaderboard**: Real-time rankings
✅ **Themes**: Unlock themes by level
✅ **Statistics**: Track study progress
✅ **Responsive**: Works on mobile and desktop

---

## 🎯 **Next Steps**

1. **Test Demo Mode**: Try all features with local storage
2. **Setup Firebase**: Follow Option 2 for full functionality
3. **Customize**: Modify themes, XP rewards, or add features
4. **Deploy**: Use Firebase Hosting to deploy your app

---

**Need Help?** Check the browser console for error messages and ensure all steps are completed correctly!
