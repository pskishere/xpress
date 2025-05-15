import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const KeepAlive = ({ children }) => {
  const [cache, setCache] = useState({});
  const location = useLocation();
  const currentPath = location.pathname;
  const scrollPositions = useRef({});

  // Save component state in cache when unmounting
  useEffect(() => {
    return () => {
      if (currentPath) {
        // Store scroll position before unmounting
        scrollPositions.current[currentPath] = window.scrollY;
      }
    };
  }, [currentPath]);

  // Restore scroll position when returning to a cached route
  useEffect(() => {
    if (currentPath && scrollPositions.current[currentPath] !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, scrollPositions.current[currentPath]);
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentPath]);

  // Update cache with current component
  useEffect(() => {
    if (!cache[currentPath]) {
      setCache(prevCache => ({
        ...prevCache,
        [currentPath]: { component: children }
      }));
    }
  }, [children, currentPath, cache]);

  // Render current component and keep previous components in DOM but hidden
  return (
    <>
      {Object.entries(cache).map(([path, { component }]) => (
        <div
          key={path}
          style={{
            display: path === currentPath ? 'block' : 'none',
            width: '100%',
            height: '100%'
          }}
        >
          {component}
        </div>
      ))}
    </>
  );
};

export default KeepAlive;
