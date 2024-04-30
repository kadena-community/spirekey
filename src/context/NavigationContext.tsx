import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ContextMenuItem {
  href: string;
  text: string;
}

interface NavigationContextType {
  contextMenuItems: ContextMenuItem[];
  updateContextMenuItems: (contextMenuItems: ContextMenuItem[]) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contextMenuItems, setContextMenuItems] = useState<ContextMenuItem[]>(
    [],
  );

  const updateContextMenuItems = (
    updatedContextMenuItems: ContextMenuItem[],
  ) => {
    if (
      JSON.stringify(updatedContextMenuItems) ===
      JSON.stringify(contextMenuItems)
    ) {
      return;
    }
    setContextMenuItems(updatedContextMenuItems);
  };

  return (
    <NavigationContext.Provider
      value={{ contextMenuItems, updateContextMenuItems }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
