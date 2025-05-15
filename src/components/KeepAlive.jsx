
import React, { useRef, useEffect } from 'react';

const KeepAlive = ({ children }) => {
  // Store cached instances of components and their scroll positions
  const cache = useRef(new Map());
  const scrollPositions = useRef(new Map());
  const currentPath = window.location.pathname;

  useEffect(() => {
    // On mount, restore the scroll position if it exists
    const savedPosition = scrollPositions.current.get(currentPath);
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(0, savedPosition);
      }, 0);
    }

    // Save scroll position before unmounting
    return () => {
      scrollPositions.current.set(currentPath, window.pageYOffset);
    };
  }, [currentPath]);

  // Add component to cache
  if (!cache.current.has(currentPath)) {
    cache.current.set(currentPath, children);
  }

  return <>{cache.current.get(currentPath)}</>;
};

export default KeepAlive;
