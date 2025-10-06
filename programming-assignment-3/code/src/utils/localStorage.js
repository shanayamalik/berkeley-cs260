// Local storage utility functions for luggage planner

const STORAGE_KEY = 'luggagePlannerData';

export const saveLuggageData = (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serializedData);
    return true;
  } catch (error) {
    console.warn('Failed to save luggage data to localStorage:', error);
    return false;
  }
};

export const loadLuggageData = () => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (serializedData === null) {
      return null; // No saved data
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.warn('Failed to load luggage data from localStorage:', error);
    return null;
  }
};

export const clearLuggageData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.warn('Failed to clear luggage data from localStorage:', error);
    return false;
  }
};

export const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};