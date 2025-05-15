
// Store scroll positions by path
const scrollPositions = new Map();

export const saveScrollPosition = (path) => {
  scrollPositions.set(path, window.scrollY);
};

export const restoreScrollPosition = (path) => {
  const position = scrollPositions.get(path);
  if (position !== undefined) {
    setTimeout(() => {
      window.scrollTo(0, position);
    }, 0);
    return true;
  }
  return false;
};
