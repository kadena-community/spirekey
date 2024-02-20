import { l1Client } from '@/utils/client';
import type { IPactEvent } from '@kadena/types';
import { useEffect, useState } from 'react';

type Props = {
  transaction: string;
};

export const usePreviewEvents = ({ transaction }: Props) => {
  const [events, setEvents] = useState<IPactEvent[]>();
  useEffect(() => {
    if (!transaction) return;
    const tx = JSON.parse(Buffer.from(transaction, 'base64').toString());
    l1Client
      .local(tx, { preflight: true, signatureVerification: false })
      .then((res) => {
        setEvents(res.events);
      });
  }, [transaction]);
  return { events };
};
