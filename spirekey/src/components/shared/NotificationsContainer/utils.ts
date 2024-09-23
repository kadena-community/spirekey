import { NotificationVariant } from '@/context/shared/NotificationsContext';
import { INotificationProps } from '@kadena/kode-ui';

export const mapVariantToIntent = (
  variant: NotificationVariant,
): INotificationProps['intent'] => {
  switch (variant) {
    case 'error':
      return 'negative';
    case 'notice':
      return 'info';
    case 'warning':
      return 'warning';
    case 'success':
      return 'positive';
    default:
      return undefined;
  }
};
