import React, { useState } from 'react';

const DaySelector = ({ onDaySelect }) => {
  const [todaysDate, setTodaysDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todaysDate) {
      // Calculate day of year from the selected date
      const selectedDate = new Date(todaysDate);
      const startOfYear = new Date(selectedDate.getFullYear(), 0, 1);
      const dayOfYear = Math.ceil((selectedDate - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
      
      const userData = {
        startDayOfYear: dayOfYear,
        startDate: todaysDate,
        completedDays: {},
        scores: {}
      };
      onDaySelect(userData);
    }
  };

  const getDayLabel = (day) => {
    const date = new Date(2024, 0, day);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateDayOfYear = (dateString) => {
    if (!dateString) return null;
    const selectedDate = new Date(dateString);
    const startOfYear = new Date(selectedDate.getFullYear(), 0, 1);
    return Math.ceil((selectedDate - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
  };

  const dayOfYear = calculateDayOfYear(todaysDate);

  return (
    <div className="day-selector">
      <h2>Welcome to SAT Vocabulary Learning!</h2>
      <p style={{ marginBottom: '30px', color: '#666', textAlign: 'center' }}>
        Tell us what today's date is to start your 90-day vocabulary journey.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="todays-date">Today's Date:</label>
          <input
            id="todays-date"
            type="date"
            className="day-input"
            value={todaysDate}
            onChange={(e) => setTodaysDate(e.target.value)}
            required
          />
        </div>
        
        {todaysDate && dayOfYear && (
          <div className="selected-day-info">
            <p>Today's Date: <strong>{new Date(todaysDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</strong></p>
            <p>Day of Year: <strong>{dayOfYear} ({getDayLabel(dayOfYear)})</strong></p>
            <p>Your 90-day program will run from day {dayOfYear} to day {Math.min(dayOfYear + 89, 365)}</p>
          </div>
        )}
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!todaysDate}
        >
          Start Learning
        </button>
      </form>
    </div>
  );
};

export default DaySelector; 