import { Surface } from '@/components/Surface/Surface';
import { Box, Heading, Stack, SystemIcon } from '@kadena/react-ui';
import { ICap, IPactDecimal } from '@kadena/types';
import { FC } from 'react';
import * as styles from './component.css';

interface Props {
  cap: ICap;
}

export const OrderLineTemplate: FC<Props> = ({ cap }) => {
  const [productTitle, hash, price] = cap.args as [
    string,
    string,
    IPactDecimal,
  ];

  return (
    <Stack flexDirection="column" width="100%" gap="md">
      <Heading as="h5">Order line</Heading>

      <Surface>
        <Box className={styles.wrapper}>
          <div className={styles.product}>
            <SystemIcon.Cookie />
          </div>

          <Stack flexDirection="column">
            <div
              style={{
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {productTitle}
            </div>
            <div>{parseFloat(price.decimal)}</div>
          </Stack>
        </Box>
      </Surface>
    </Stack>
  );
};
