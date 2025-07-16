
'use client';
import { useContext } from 'react';
import { PortfolioContext } from '@/context/portfolio-data-context';

export const usePortfolioData = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};
