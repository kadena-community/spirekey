import { useNotifications } from '@/context/shared/NotificationsContext';
import { Notification, NotificationHeading } from '@kadena/kode-ui';
import { AnimatePresence, motion } from 'framer-motion';
import * as styles from './NotificationsContainer.css';
import { mapVariantToIntent } from './utils';

export const NotificationContainer = () => {
  const { notifications } = useNotifications();

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {notifications.map(({ id, variant, title, message }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100, transition: { duration: 0.1 } }}
            layout
          >
            <Notification intent={mapVariantToIntent(variant)} role="alert">
              <NotificationHeading>{title}</NotificationHeading>
              {message}
            </Notification>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
