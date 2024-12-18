'use client';

import { Notification, NotificationHeading, Stack } from '@kadena/kode-ui';
import * as styles from './IntendNotification.css';

const KEY = 'spirekey-firsttime-intend-banner-dismissed';

export default function IntendNotification() {
  if (typeof window === 'undefined' || localStorage.getItem(KEY) === 'true') {
    return null;
  }

  return (
    <Stack className={styles.container}>
      <Notification
        intent="warning"
        role="alert"
        type="inlineStacked"
        onDismiss={() => {
          localStorage.setItem(KEY, 'true');
        }}
      >
        <NotificationHeading>Disclaimer</NotificationHeading>
        <div>
          The Chainweaver V3 Alpha demo wallet is intended for demonstration
          purposes to interact with SpireKey-enabled dApps. Existing wallets
          should implement Kadena SpireKey to enhance their user experience.
        </div>
      </Notification>
    </Stack>
  );
}
