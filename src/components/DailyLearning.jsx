import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import Celebration from './Celebration';
import { getDayVocab, getCurrentDay, getCurrentDayOfYear, getRevisionDays, shuffleArray } from '../utils/vocabData';

const DailyLearning = ({ userData, updateUserData }) => {
  const [currentVocab, setCurrentVocab] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownWords, setKnownWords] = useState(new Set());
  const [unknownWords, setUnknownWords] = useState(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wordAttempts, setWordAttempts] = useState({}); // Track attempts per word
  const [completedWords, setCompletedWords] = useState(new Set()); // Words that are fully learned

  const currentDay = getCurrentDay(userData);
  const currentDayOfYear = getCurrentDayOfYear(userData);
  const revisionDays = getRevisionDays(currentDay);

  useEffect(() => {
    initializeSession();
  }, [currentDay]);

  const initializeSession = () => {
    let allVocab = {};
    
    // Add current day vocab
    const dayVocab = getDayVocab(currentDay);
    Object.assign(allVocab, dayVocab);
    
    // Add revision vocab
    revisionDays.forEach(day => {
      const revisionVocab = getDayVocab(day);
      Object.assign(allVocab, revisionVocab);
    });
    
    // Convert to array and shuffle
    const vocabArray = Object.entries(allVocab);
    const shuffledVocab = shuffleArray(vocabArray);
    
    setCurrentVocab(shuffledVocab);
    setCurrentIndex(0);
    setKnownWords(new Set());
    setUnknownWords(new Set());
    setCorrectAnswers(0);
    setWordAttempts({});
    setCompletedWords(new Set());
    setSessionStats({ correct: 0, total: shuffledVocab.length });
  };

  const handleKnowImmediate = () => {
    const currentWord = currentVocab[currentIndex][0];
    
    // Increment attempts for this word
    setWordAttempts(prev => ({
      ...prev,
      [currentWord]: (prev[currentWord] || 0) + 1
    }));
    
    if (unknownWords.has(currentWord)) {
      // Word was previously unknown, now known
      setUnknownWords(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentWord);
        return newSet;
      });
    }
    
    setKnownWords(prev => new Set([...prev, currentWord]));
    
    // Add point immediately when user knows the word (before countdown)
    const attempts = (wordAttempts[currentWord] || 0) + 1;
    if (attempts >= 1) {
      setCompletedWords(prev => new Set([...prev, currentWord]));
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleKnow = () => {
    // Move to next word
    if (currentIndex < currentVocab.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Check if we need to repeat any words
      const uncompletedWords = currentVocab.filter(([word]) => !completedWords.has(word));
      if (uncompletedWords.length > 0) {
        // Shuffle and add uncompleted words to the end
        const shuffledUncompleted = shuffleArray(uncompletedWords);
        setCurrentVocab(prev => [...prev, ...shuffledUncompleted]);
        setCurrentIndex(currentIndex + 1);
      } else {
        // Session complete
        completeSession();
      }
    }
  };

  const handleDontKnow = () => {
    const currentWord = currentVocab[currentIndex][0];
    setUnknownWords(prev => new Set([...prev, currentWord]));
    
    // Increment attempts for this word
    setWordAttempts(prev => ({
      ...prev,
      [currentWord]: (prev[currentWord] || 0) + 1
    }));
    
    // Move to next word (word will appear again later)
    if (currentIndex < currentVocab.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Check if we need to repeat any words
      const uncompletedWords = currentVocab.filter(([word]) => !completedWords.has(word));
      if (uncompletedWords.length > 0) {
        // Shuffle and add uncompleted words to the end
        const shuffledUncompleted = shuffleArray(uncompletedWords);
        setCurrentVocab(prev => [...prev, ...shuffledUncompleted]);
        setCurrentIndex(currentIndex + 1);
      } else {
        // Session complete
        completeSession();
      }
    }
  };

  const completeSession = () => {
    const finalStats = {
      correct: correctAnswers,
      total: currentVocab.length
    };
    
    setSessionStats(finalStats);
    setShowCelebration(true);
    
    // Mark day as completed
    const updatedCompletedDays = {
      ...userData.completedDays,
      [currentDay]: {
        date: new Date().toISOString(),
        stats: finalStats,
        dayOfYear: currentDayOfYear
      }
    };
    
    updateUserData({
      completedDays: updatedCompletedDays
    });
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    initializeSession();
  };

  if (currentVocab.length === 0) {
    return (
      <div className="card">
        <h2>Loading...</h2>
      </div>
    );
  }

  const currentWord = currentVocab[currentIndex][0];
  const currentDefinition = currentVocab[currentIndex][1];

  const getDayLabel = (day) => {
    const date = new Date(2024, 0, day);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Day {currentDay} Vocabulary</h2>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Day of Year: {currentDayOfYear} ({getDayLabel(currentDayOfYear)})
        </p>
        {revisionDays.length > 0 && (
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Including revision from days: {revisionDays.join(', ')}
          </p>
        )}
        <p>
          Progress: {correctAnswers} / {currentVocab.length}
        </p>
      </div>

      <Flashcard
        word={currentWord}
        definition={currentDefinition}
        onKnow={handleKnow}
        onDontKnow={handleDontKnow}
        onKnowImmediate={handleKnowImmediate}
      />

      {showCelebration && (
        <Celebration
          onClose={handleCelebrationClose}
          stats={sessionStats}
        />
      )}
    </div>
  );
};

export default DailyLearning; 