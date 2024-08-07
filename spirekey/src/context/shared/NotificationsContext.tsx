import React, { createContext, useContext, useEffect, useState } from 'react';

import { Notification } from '../../components/shared/Notification/Notification';

export type NotificationVariant = 'error' | 'warning' | 'notice' | 'success';

export interface Notification {
  id: number;
  variant: NotificationVariant;
  title: string;
  message?: string;
  timeout?: number;
}

export type AddNotification = Omit<Notification, 'id'> & { id?: number };

interface NotificationsContextType {
  notifications: Notification[];
  addNotification: (props: AddNotification) => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationsProvider',
    );
  }
  return context;
};

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = ({
    variant,
    title,
    message,
    timeout = 3000,
    id = Date.now(),
  }: AddNotification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications.filter((n) => n.id !== id),
      { id, variant, title, message },
    ]);
    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== id),
      );
    }, timeout);
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};
