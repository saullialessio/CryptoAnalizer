import React, { createContext, useState, useContext } from 'react';

interface DashboardContextType {
  selectedAsset: string;
  setSelectedAsset: (asset: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAsset, setSelectedAsset] = useState<string>('BTC/USD');

  return (
    <DashboardContext.Provider value={{ selectedAsset, setSelectedAsset }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};