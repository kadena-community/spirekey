import { FC } from 'react';
import { Surface } from '../Surface/Surface';

import { ICap, ISigner } from '@kadena/types';
import * as styles from './Capability.css';
import { GenericTemplate } from './templates/generic/Component';
import { OrderLineTemplate } from './templates/orderLine/Component';
import { SendReceiveTemplate } from './templates/sendReceive/Component';

const getDisplayComponent = (cap: ICap) => {
  if (
    cap.name === 'coin.transfer' ||
    cap.name === `${process.env.NAMESPACE}.webauthn-wallet.TRANSFER`
  ) {
    return <SendReceiveTemplate cap={cap} />;
  } else if (
    (cap.name = `${process.env.NAMESPACE}.delivery.CREATE_ORDER_LINE`)
  ) {
    return <OrderLineTemplate cap={cap} />;
  }

  return <GenericTemplate cap={cap} />;
};

interface CapabilityProps {
  cap: ICap;
}

export const Capability: FC<CapabilityProps> = ({ cap }) => {
  return (
    <Surface className={styles.wrapper}>{getDisplayComponent(cap)}</Surface>
  );
};
