
/**
 * Utility functions for managing scroll position
 */

// Save the current scroll position
export const saveScrollPosition = (category = null) => {
  localStorage.setItem('newsScrollPosition', window.scrollY.toString());
  if (category) {
    localStorage.setItem('activeNewsCategory', category);
  }
};

// Get the saved scroll position
export const getSavedScrollPosition = () => {
  const position = localStorage.getItem('newsScrollPosition');
  return position ? parseInt(position, 10) : 0;
};

// Restore the saved scroll position with a small delay
export const restoreScrollPosition = (delay = 100) => {
  const position = getSavedScrollPosition();
  setTimeout(() => {
    window.scrollTo(0, position);
  }, delay);
};

// Get the last active category
export const getSavedCategory = () => {
  return localStorage.getItem('activeNewsCategory') || 'business';
};

// Clear the saved scroll position
export const clearScrollPosition = () => {
  localStorage.removeItem('newsScrollPosition');
};
