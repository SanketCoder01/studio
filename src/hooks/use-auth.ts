'use client';
import { useState, useEffect, useCallback } from 'react';

export const useAuth = () => {
  // This state is now the single source of truth for auth status.
  // It defaults to false, assuming the user is not logged in until proven otherwise.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // A separate state to ensure we only check sessionStorage once on the client.
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // This effect runs ONLY on the client, after the initial render.
    try {
      const authStatus = sessionStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
    } catch (error) {
      console.error('Could not access session storage.');
      setIsAuthenticated(false);
    } finally {
      // Mark the check as complete.
      setIsAuthChecked(true);
    }
  }, []); // The empty dependency array is crucial.

  return { isAuthenticated, isAuthChecked };
};
