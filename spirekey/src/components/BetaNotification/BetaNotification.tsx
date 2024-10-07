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
          The spirekey.kadena.io application is intended for demonstration purposes to interact with SpireKey-enabled dApps. 
          Existing wallets should implement Kadena SpireKey Connect to enhance their user experience.  
        </div>
      </Notification>
    </Stack>
  );
}
