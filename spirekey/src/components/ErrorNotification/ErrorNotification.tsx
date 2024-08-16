'use client';

import { Notification, NotificationHeading } from '@kadena/kode-ui';

import * as styles from './ErrorNotification.css';
import React, {createContext, useState} from "react";
import {publishEvent} from "@/utils/publishEvent";

export const ErrorContext = createContext();

export default function ErrorNotification({children}) {

  const [errorMessage, setErrorMessage] = useState();


  return (
    <ErrorContext.Provider value={{errorMessage, setErrorMessage}}>
      { errorMessage ? (
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
              }
            }
          >
            <NotificationHeading>Error</NotificationHeading>
            <p>
              { errorMessage }
            </p>
          </Notification>
        </div>
        {children}
      </>
      ):
        <>
          {children}
        </>
      }
    </ErrorContext.Provider>
  )
}
