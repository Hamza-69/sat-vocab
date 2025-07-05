import React, { useState, useEffect } from 'react';

const Flashcard = ({ word, definition, onKnow, onDontKnow, onKnowImmediate, onDontKnowImmediate, initialShowDefinition = false }) => {
  const [isFlipped, setIsFlipped] = useState(initialShowDefinition);
  const [showDefinition, setShowDefinition] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownDuration, setCountdownDuration] = useState(5000); // Default 5 seconds

  // Reset card state when word changes (new vocabulary word)
  useEffect(() => {
    setIsFlipped(initialShowDefinition);
    setShowDefinition(false);
    setProgress(0);
    setIsCountingDown(false);
    setCountdownDuration(5000); // Reset to default duration
  }, [word, initialShowDefinition]);

  // Progress bar countdown effect
  useEffect(() => {
    if (isCountingDown) {
      const duration = countdownDuration;
      const interval = 50; // Update every 50ms for smooth animation
      const steps = duration / interval;
      const increment = 100 / steps;
      
      let currentProgress = 0;
      const timer = setInterval(() => {
        currentProgress += increment;
        setProgress(Math.min(currentProgress, 100));
        
        if (currentProgress >= 100) {
          clearInterval(timer);
          setIsCountingDown(false);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isCountingDown, countdownDuration]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnow = () => {
    // Set duration based on whether user knows immediately
    if (onKnowImmediate) {
      // Set 2-second countdown for immediate knowledge
      setCountdownDuration(2000);
      onKnowImmediate();
    } else {
      // Set 5-second countdown for delayed knowledge
      setCountdownDuration(5000);
    }
    
    setShowDefinition(true);
    setIsFlipped(true); // Show the definition immediately
    setIsCountingDown(true);
    setProgress(0);
    
    // Use the appropriate duration for the timeout
    const duration = onKnowImmediate ? 2000 : 5000;
    setTimeout(() => {
      onKnow();
    }, duration);
  };

  const handleDontKnow = () => {
    // Handle immediately if callback provided
    if (onDontKnowImmediate) {
      onDontKnowImmediate();
    }
    
    // Always use 5-second countdown for "Don't Know"
    setCountdownDuration(5000);
    
    setShowDefinition(true);
    setIsFlipped(true); // Show the definition immediately
    setIsCountingDown(true);
    setProgress(0);
    setTimeout(() => {
      onDontKnow();
    }, 5000); // Show definition for 5 seconds before moving to next
  };

  return (
    <div className="card">
      <div 
        className={`flashcard${isFlipped ? ' flipped' : ''}`}
        onClick={handleFlip}
        style={{ cursor: 'pointer', width: '100%', minHeight: '200px' }}
      >
        <div className="flashcard-face flashcard-front" style={{ background: 'inherit' }}>
          <div className="word">{word}</div>
        </div>
        <div className="flashcard-face flashcard-back" style={{ background: 'inherit' }}>
          <div className="definition">{definition}</div>
        </div>
      </div>
      <div className="button-group">
        <button 
          className="btn btn-secondary"
          onClick={handleDontKnow}
          disabled={isCountingDown}
        >
          Don't Know
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleKnow}
          disabled={isCountingDown}
        >
          Know It!
        </button>
      </div>
      <p style={{ marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>
        Click the card to flip • {isFlipped ? 'Definition' : 'Word'}
      </p>
      {/* Circular Progress Bar */}
      {isCountingDown && (
        <div style={{ 
          position: 'relative', 
          width: '60px', 
          height: '60px', 
          margin: '20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background circle */}
            <circle
              cx="30"
              cy="30"
              r="25"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="4"
            />
            {/* Progress circle */}
            <circle
              cx="30"
              cy="30"
              r="25"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 25}`}
              strokeDashoffset={`${2 * Math.PI * 25 * (1 - progress / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.05s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#4CAF50'
          }}>
            {Math.ceil((countdownDuration - (progress / 100) * countdownDuration) / 1000)}s
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard; 