import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Celebration = ({ onClose, stats }) => {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="celebration">
      <div className="celebration-content">
        <div className="celebration-icon">✅</div>
        <h2>Congratulations!</h2>
        <p>You've completed today's vocabulary session!</p>
        
        {stats && (
          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">{stats.correct}</div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Words</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Math.round((stats.correct / stats.total) * 100)}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
          </div>
        )}
        
        <button className="btn btn-primary" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Celebration; 