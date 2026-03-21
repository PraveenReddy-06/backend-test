import { createContext, useContext, useState } from 'react';

const ComparisonContext = createContext();

export function ComparisonProvider({ children }) {
  const [compareCareers, setCompareCareers] = useState([]);

  const addToCompare = (career) => {
    setCompareCareers(prev => {
      if (prev.some(c => c.id === career.id)) return prev;
      if (prev.length >= 2) return [prev[1], career];
      return [...prev, career];
    });
  };

  const removeFromCompare = (careerId) => {
    setCompareCareers(prev => prev.filter(c => c.id !== careerId));
  };

  const clearCompare = () => setCompareCareers([]);

  const isInCompare = (careerId) => compareCareers.some(c => c.id === careerId);

  return (
    <ComparisonContext.Provider value={{ compareCareers, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within ComparisonProvider');
  }
  return context;
}
