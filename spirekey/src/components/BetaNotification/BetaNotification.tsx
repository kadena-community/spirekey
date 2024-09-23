'use client';

import { Notification, NotificationHeading, Stack } from '@kadena/kode-ui';
import * as styles from './BetaNotification.css';

export default function BetaNotification() {
  if (
    typeof window === 'undefined' ||
    sessionStorage.getItem('spirekey-beta-banner-dismissed') === 'true'
  ) {
    return null;
  }

  return (
    <Stack className={styles.container}>
      <Notification
        intent="warning"
        isDismissable
        role="alert"
        type="inlineStacked"
        onDismiss={() => {
          sessionStorage.setItem('spirekey-beta-banner-dismissed', 'true');
        }}
      >
        <NotificationHeading>Notice</NotificationHeading>
        <div>
          Kadena SpireKey is currently in beta. Join us on{' '}
          <a
            href="https://discord.com/invite/kadena"
            target="_blank"
            rel="noreferrer"
            className={styles.discordChannel}
          >
            Discord
          </a>{' '}
          and share your feedback!
        </div>
      </Notification>
    </Stack>
  );
}
