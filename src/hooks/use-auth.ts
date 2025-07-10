import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const authStatus = sessionStorage.getItem('isAuthenticated');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Could not access session storage.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isAuthenticated, isLoading };
};
