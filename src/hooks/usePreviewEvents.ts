import { useNotifications } from '@/context/shared/NotificationsContext';
import { l1Client } from '@/utils/shared/client';
import type { IPactEvent } from '@kadena/types';
import { useEffect, useState } from 'react';

type Props = {
  transaction: string;
};

export const usePreviewEvents = ({ transaction }: Props) => {
  const [events, setEvents] = useState<IPactEvent[]>();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!transaction) return;
    const tx = JSON.parse(Buffer.from(transaction, 'base64').toString());
    l1Client
      .local(tx, { preflight: true, signatureVerification: false })
      .then((res) => {
        setEvents(res.events);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          addNotification({
            variant: 'error',
            title: 'Error previewing events',
            message: error.message,
          });
        }
      });
  }, [transaction]);
  return { events };
};
