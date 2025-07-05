import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import DaySelector from './components/DaySelector';
import DailyLearning from './components/DailyLearning';
import Revision from './components/Revision';
import { useUserData } from './hooks/useUserData';

function App() {
  const { userData, updateUserData } = useUserData();
  const [currentTab, setCurrentTab] = useState('daily');

  // If no user data exists, show day selector
  if (!userData) {
    return (
      <Router>
        <div className="container">
          <Header />
          <DaySelector onDaySelect={updateUserData} />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="container">
        <Header userData={userData} />
        
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${currentTab === 'daily' ? 'active' : ''}`}
            onClick={() => setCurrentTab('daily')}
          >
            Daily Learning
          </button>
          <button 
            className={`nav-tab ${currentTab === 'revision' ? 'active' : ''}`}
            onClick={() => setCurrentTab('revision')}
          >
            Revision
          </button>
        </div>

        {currentTab === 'daily' ? (
          <DailyLearning userData={userData} updateUserData={updateUserData} />
        ) : (
          <Revision userData={userData} updateUserData={updateUserData} />
        )}
      </div>
    </Router>
  );
}

export default App; 