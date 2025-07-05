import vocabData from '../../daily_vocab_labeled.json';

export const getDayVocab = (day) => {
  return vocabData[`day${day}`] || {};
};

export const getRevisionVocab = (userData) => {
  const allVocab = {};
  
  // Get vocab from completed days
  Object.keys(userData.completedDays || {}).forEach(day => {
    const dayVocab = getDayVocab(day);
    Object.assign(allVocab, dayVocab);
  });
  
  return allVocab;
};

export const getCurrentDay = (userData) => {
  const startDate = new Date(userData.startDate);
  const today = new Date();
  
  // Reset time to start of day for accurate comparison
  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = today - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate which day of the 90-day program we're on
  // Day 1 starts on the first day (diffDays = 0)
  const programDay = diffDays + 1;
  
  // Map to vocabulary day (1-90)
  return Math.min(programDay, 90);
};

export const getCurrentDayOfYear = (userData) => {
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

export const getRevisionDays = (currentDay) => {
  const revisionDays = [];
  
  // Every 3 days: revision of last 3 days
  if (currentDay % 3 === 0 && currentDay >= 3) {
    for (let i = currentDay - 2; i <= currentDay; i++) {
      revisionDays.push(i);
    }
  }
  
  // Every 7 days: revision of last 7 days
  if (currentDay % 7 === 0 && currentDay >= 7) {
    for (let i = currentDay - 6; i <= currentDay; i++) {
      if (!revisionDays.includes(i)) {
        revisionDays.push(i);
      }
    }
  }
  
  // Every 30 days: revision of last 30 days
  if (currentDay % 30 === 0 && currentDay >= 30) {
    for (let i = currentDay - 29; i <= currentDay; i++) {
      if (!revisionDays.includes(i)) {
        revisionDays.push(i);
      }
    }
  }
  
  return revisionDays;
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}; 