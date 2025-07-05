import React from 'react';
import { getCurrentDay, getCurrentDayOfYear } from '../utils/vocabData';

const Header = ({ userData }) => {
  const calculateProgress = () => {
    if (!userData) return 0;
    
    const completedDays = Object.keys(userData.completedDays || {}).length;
    return Math.min((completedDays / 90) * 100, 100);
  };

  const getCurrentDay = () => {
    if (!userData) return 0;
    
    const startDate = new Date(userData.startDate);
    const today = new Date();
    
    // Reset time to start of day for accurate comparison
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.min(diffDays + 1, 90);
  };

  const getCurrentDayOfYear = () => {
    if (!userData) return 0;
    
    const startDate = new Date(userData.startDate);
    const today = new Date();
    
    // Reset time to start of day for accurate comparison
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const startDayOfYear = userData.startDayOfYear;
    const currentDayOfYear = startDayOfYear + diffDays;
    
    return Math.min(currentDayOfYear, 365);
  };

  const getDayLabel = (day) => {
    const date = new Date(2024, 0, day);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="header">
      <h1>SAT Vocabulary Learning</h1>
      
      {userData && (
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Day {getCurrentDay()} of 90 • {Math.round(calculateProgress())}% Complete
          </div>
          <div className="progress-text" style={{ fontSize: '0.8rem', color: '#666' }}>
            Day of Year: {getCurrentDayOfYear()} ({getDayLabel(getCurrentDayOfYear())})
          </div>
        </div>
      )}
    </div>
  );
};

export default Header; 