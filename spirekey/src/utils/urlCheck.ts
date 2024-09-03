import { AddNotification } from '@/context/shared/NotificationsContext';

export const urlCheck =
  (
    returnUrl: string,
    addNotification: (notification: AddNotification) => void,
  ) =>
  () => {
    try {
      const url = new URL(returnUrl);
      if (url.host !== new URL(document.referrer).host)
        throw new Error('return url does not match referrer');

      addNotification({
        id: 2,
        title: 'Deprecation warning',
        message:
          'This method of connecting to a dApp has been deprecated. Please use the SpireKey SDK instead.',
        variant: 'warning',
        timeout: 30000,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      addNotification({
        id: 1,
        title: 'Invalid return url received',
        message: 'Please contact the dApp you tried to interact with',
        variant: 'error',
        timeout: 30000,
      });
    }
  };
