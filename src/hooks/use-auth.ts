'use client';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // This effect runs only on the client after hydration
    try {
      const authStatus = sessionStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
    } catch (error) {
      console.error('Could not access session storage.');
      setIsAuthenticated(false);
    } finally {
      setIsAuthChecked(true);
    }
  }, []);

  return { isAuthenticated, isAuthChecked };
};
