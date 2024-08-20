'use client';

import { Notification, NotificationHeading } from '@kadena/kode-ui';

import * as styles from './ErrorNotification.css';
import React, { createContext, useState, ReactNode } from 'react';
import { publishEvent } from '@/utils/publishEvent';

// Define the context type
interface ErrorContextType {
  errorMessage: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a default value
export const ErrorContext = createContext<ErrorContextType>({
  errorMessage: null,
  setErrorMessage: () => {},
});

interface ErrorNotificationProps {
  children: ReactNode;
}

export default function ErrorNotification({ children }: ErrorNotificationProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {errorMessage ? (
        <>
          <div className={styles.container}>
            <Notification
              intent="negative"
              isDismissable
              role="alert"
              type="inlineStacked"
              onDismiss={() => {
                publishEvent('canceled:sign');
                window.close();
              }}
            >
              <NotificationHeading>Error</NotificationHeading>
              <p>{errorMessage}</p>
            </Notification>
          </div>
          {children}
        </>
      ) : (
        <>{children}</>
      )}
    </ErrorContext.Provider>
  );
}
