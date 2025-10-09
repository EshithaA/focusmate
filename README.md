# FocusMate - Pomodoro Study App

A comprehensive Pomodoro timer app with gamification, leaderboards, and customizable themes designed for students to stay focused and motivated

## Features

### 🎯 Core Functionality
- **Pomodoro Timer**: Customizable study and break sessions
- **User Authentication**: Secure login/signup with Firebase
- **XP System**: Earn Focus Points for completing sessions
- **Level Progression**: 6 different ranks from "New Learner" to "Zen Scholar"
- **Real-time Leaderboard**: Compete with other students
- **Theme System**: Unlock beautiful themes as you level up
- **Statistics Tracking**: Monitor your study progress

### 🏆 Gamification System
- **Focus Points (XP)**: Earn 25 XP per completed Pomodoro
- **Level System**: Progress through 6 levels with unique rank titles
- **Streak Tracking**: Maintain daily study streaks
- **Achievement Badges**: Unlock rewards for milestones
- **Theme Unlocks**: Access new themes based on your level

### 🎨 Themes
- **Default**: Classic gradient theme (Level 1)
- **Ocean Breeze**: Calming ocean colors (Level 2)
- **Forest Serenity**: Nature-inspired greens (Level 3)
- **Sunset Dreams**: Warm evening colors (Level 4)
- **Midnight Focus**: Dark theme for night studying (Level 5)
- **Aurora Borealis**: Magical northern lights (Level 6)
- **Cosmic Explorer**: Space-themed (Level 7+)
- **Neon Cyber**: Futuristic neon colors (Level 8+)
- **Vintage Library**: Classic library atmosphere (Level 9+)

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (ES6 Modules)
- **Backend**: Firebase (Firestore + Authentication)
- **Database**: Firestore (NoSQL)
- **Hosting**: Firebase Hosting
- **Icons**: Font Awesome

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
4. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
5. Get your Firebase config:
   - Go to Project Settings > General > Your apps
   - Add a web app and copy the config object
6. Update `firebase-config.js` with your actual config values

### 2. Firestore Security Rules

Set up the following security rules in Firestore:

```javascript
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
```

### 3. File Structure

```
FocusMate/
├── login.html              # Login/signup page
├── dashboard.html          # Main dashboard
├── Pomodoro.html          # Pomodoro timer (updated)
├── leaderboard.html       # Leaderboard page
├── themes.html            # Themes page
├── firebase-config.js     # Firebase configuration
├── firebase-setup-guide.js # Setup instructions
└── README.md              # This file
```

### 4. Running the App

1. Open `login.html` in your browser
2. Create an account or sign in
3. Start using the Pomodoro timer!

## Database Structure

### Users Collection
```javascript
{
  username: "string",
  email: "string",
  xp: 0,
  level: 1,
  rank: "New Learner",
  studySessions: 0,
  totalStudyTime: 0,
  totalBreakTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  badges: [],
  unlockedThemes: ["default"],
  currentTheme: "default",
  createdAt: timestamp,
  lastActive: timestamp
}
```

## XP System

| Action | XP Reward |
|--------|-----------|
| Complete 1 Pomodoro (25 min focus) | +25 XP |
| Maintain a daily streak | +10 XP bonus |
| Complete 4 Pomodoros in a row (1 set) | +20 XP |
| Hit a milestone (e.g., 1000 minutes studied) | Achievement badge |

## Level System

| Level | XP Range | Rank Title |
|-------|----------|------------|
| 1 | 0–99 | New Learner |
| 2 | 100–249 | Focused Starter |
| 3 | 250–499 | Consistent Learner |
| 4 | 500–999 | Study Sprinter |
| 5 | 1000+ | Focus Master |
| 6+ | 2000+ | Zen Scholar |

## Features in Detail

### Pomodoro Timer
- Customizable study and break durations
- Visual progress bar
- Audio notifications
- Session statistics
- XP rewards for completed sessions

### Leaderboard
- Real-time updates using Firebase
- Shows top users by Focus Points
- Displays user stats (sessions, streaks)
- Highlights current user

### Themes
- Level-based theme unlocks
- Preview themes before applying
- Apply themes to entire app
- Persistent theme selection

### Dashboard
- Overview of user progress
- Quick navigation to all features
- Real-time statistics
- User level and rank display

## Customization

### Adding New Themes
1. Add theme definition to `themes.html`
2. Add CSS styles for the theme
3. Update theme background in `getThemeBackground()` function

### Modifying XP Rewards
1. Update XP amounts in `Pomodoro.html` `completeTimer()` method
2. Modify XP system in `firebase-config.js`

### Adding New Features
1. Update Firebase security rules if needed
2. Add new fields to user document structure
3. Update UI components accordingly

## Troubleshooting

### Common Issues

1. **Firebase not connecting**: Check your config values in `firebase-config.js`
2. **Authentication errors**: Ensure Email/Password is enabled in Firebase
3. **Database permission errors**: Check Firestore security rules
4. **Themes not applying**: Verify theme definitions and CSS

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

**Happy Studying! 🎓**
"# focusmate" 
