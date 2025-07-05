import { useState, useEffect } from 'react';

export const useUserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('satVocabUserData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const updateUserData = (newData) => {
    const updatedData = { ...userData, ...newData };
    setUserData(updatedData);
    localStorage.setItem('satVocabUserData', JSON.stringify(updatedData));
  };

  const resetUserData = () => {
    localStorage.removeItem('satVocabUserData');
    setUserData(null);
  };

  return { userData, updateUserData, resetUserData };
}; 