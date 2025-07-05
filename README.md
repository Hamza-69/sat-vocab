# SAT Vocabulary Learning Platform

A modern web application for learning SAT vocabulary with spaced repetition and progress tracking.

## Features

- **90-Day Learning Program**: Structured vocabulary learning over 90 days
- **Smart Revision System**: 
  - Every 3 days: Revision of last 3 days
  - Every 7 days: Revision of last 7 days  
  - Every 30 days: Revision of last 30 days
- **Flashcard Interface**: Interactive flashcards with word/definition flipping
- **Progress Tracking**: Visual progress bar and completion statistics
- **Celebration Screen**: Confetti animation when completing sessions
- **Revision Mode**: Randomized review of all completed vocabulary
- **Local Storage**: All progress saved locally in your browser
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:3000`

## How to Use

1. **Initial Setup**: Choose your starting day (1-90) when you first visit
2. **Daily Learning**: Complete your daily vocabulary session with flashcards
3. **Know It/Dont Know**: Click "Know It!" for words you know, "Don't Know" for words to review
4. **Revision**: Use the Revision tab to review vocabulary from completed days
5. **Progress**: Track your progress through the 90-day program

## Technology Stack

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Vite**: Fast build tool and dev server
- **Canvas Confetti**: Celebration animations
- **Local Storage**: Persistent data storage
- **CSS3**: Modern styling with gradients and animations

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Header with progress bar
│   ├── DaySelector.jsx # Initial day selection
│   ├── DailyLearning.jsx # Daily vocabulary sessions
│   ├── Revision.jsx    # Revision mode
│   ├── Flashcard.jsx   # Flashcard component
│   └── Celebration.jsx # Celebration screen
├── hooks/              # Custom React hooks
│   └── useUserData.js  # User data management
├── utils/              # Utility functions
│   └── vocabData.js    # Vocabulary data handling
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## Data Structure

The application uses the `daily_vocab_labeled.json` file containing 90 days of vocabulary words and definitions, organized as:

```json
{
  "day1": {
    "word": "definition",
    ...
  },
  "day2": {
    ...
  }
}
```

## Local Storage

User data is stored locally and includes:
- Start day and date
- Completed days with statistics
- Revision scores
- Session progress

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.