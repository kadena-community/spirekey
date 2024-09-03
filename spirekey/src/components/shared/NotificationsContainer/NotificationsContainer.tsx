import { Notification } from '@/components/shared/Notification/Notification';
import { useNotifications } from '@/context/shared/NotificationsContext';

import { AnimatePresence } from 'framer-motion';
import * as styles from './NotificationsContainer.css';

export const NotificationContainer = () => {
  const { notifications } = useNotifications();

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {notifications.map(({ id, variant, title, message }) => (
          <Notification
            key={id}
            variant={variant}
            title={title}
            message={message}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
