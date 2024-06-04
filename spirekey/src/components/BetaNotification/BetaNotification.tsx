'use client';

import { Notification, NotificationHeading } from '@kadena/react-ui';

import * as styles from './BetaNotification.css';

export const BetaNotification = () => {
  if (
    typeof window === 'undefined' ||
    sessionStorage.getItem('spirekey-beta-banner-dismissed') === 'true'
  ) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Notification
        intent="warning"
        isDismissable
        role="alert"
        type="inlineStacked"
        onDismiss={() => {
          sessionStorage.setItem('spirekey-beta-dismissed', 'true');
        }}
      >
        <NotificationHeading>Notice</NotificationHeading>
        <div>
          Kadena SpireKey is currently in beta. Join us on{' '}
          <a
            href="https://discord.com/channels/502858632178958377/1244573952676724766"
            target="_blank"
            rel="noreferrer"
            className={styles.discordChannel}
          >
            Discord
          </a>{' '}
          and share your feedback!
        </div>
      </Notification>
    </div>
  );
};
