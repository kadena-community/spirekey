'use client';

import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const defaultState = {
  devMode:
    typeof window !== 'undefined' && localStorage.getItem('devMode') === 'true',
};

export const SettingsContext = createContext(defaultState);

type Props = {
  children: React.ReactNode;
  displayDevMode?: boolean;
};

const SettingsProvider = ({ children, displayDevMode }: Props) => {
  const [devMode] = useLocalStorage('devMode', false);

  useEffect(() => {
    if (!displayDevMode) return;

    if (devMode) {
      document.body.classList.add('developer');
    } else {
      document.body.classList.remove('developer');
    }
  }, [displayDevMode, devMode]);

  return (
    <SettingsContext.Provider value={{ devMode }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export { SettingsProvider, useSettings };
