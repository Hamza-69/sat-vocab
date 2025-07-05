import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import Celebration from './Celebration';
import { getRevisionVocab, shuffleArray } from '../utils/vocabData';

const Revision = ({ userData, updateUserData }) => {
  const [currentVocab, setCurrentVocab] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownWords, setKnownWords] = useState(new Set());
  const [unknownWords, setUnknownWords] = useState(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = () => {
    const revisionVocab = getRevisionVocab(userData);
    
    if (Object.keys(revisionVocab).length === 0) {
      setCurrentVocab([]);
      return;
    }
    
    // Convert to array and shuffle
    const vocabArray = Object.entries(revisionVocab);
    const shuffledVocab = shuffleArray(vocabArray);
    
    setCurrentVocab(shuffledVocab);
    setCurrentIndex(0);
    setKnownWords(new Set());
    setUnknownWords(new Set());
    setSessionStats({ correct: 0, total: shuffledVocab.length });
  };

  const handleKnow = () => {
    const currentWord = currentVocab[currentIndex][0];
    
    if (unknownWords.has(currentWord)) {
      // Word was previously unknown, now known
      setUnknownWords(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentWord);
        return newSet;
      });
    }
    
    setKnownWords(prev => new Set([...prev, currentWord]));
    
    // Move to next word
    if (currentIndex < currentVocab.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Session complete
      completeSession();
    }
  };

  const handleDontKnow = () => {
    const currentWord = currentVocab[currentIndex][0];
    setUnknownWords(prev => new Set([...prev, currentWord]));
    
    // Move to next word
    if (currentIndex < currentVocab.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Session complete
      completeSession();
    }
  };

  const completeSession = () => {
    const finalStats = {
      correct: knownWords.size,
      total: currentVocab.length
    };
    
    setSessionStats(finalStats);
    setShowCelebration(true);
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    initializeSession();
  };

  if (currentVocab.length === 0) {
    return (
      <div className="card">
        <h2>Revision Session</h2>
        <p>No completed days to revise yet. Complete some daily sessions first!</p>
      </div>
    );
  }

  const currentWord = currentVocab[currentIndex][0];
  const currentDefinition = currentVocab[currentIndex][1];

  return (
    <div>
      <div className="card">
        <h2>Revision Session</h2>
        <p>Reviewing vocabulary from all completed days</p>
        <p>
          Progress: {currentIndex} / {currentVocab.length}
        </p>
      </div>

      <Flashcard
        word={currentWord}
        definition={currentDefinition}
        onKnow={handleKnow}
        onDontKnow={handleDontKnow}
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

export default Revision; 