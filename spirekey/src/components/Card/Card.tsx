import { deviceColors } from '@/styles/shared/tokens.css';
import { hexadecimalToRGB } from '@/utils/color';
import { Box, Stack } from '@kadena/kode-ui';
import classnames from 'classnames';
import { ReactNode } from 'react';
import * as styles from './Card.css';

type CardProps = {
  color?: string;
  balancePercentage?: number;
  title?: ReactNode;
  icons?: ReactNode;
  center?: ReactNode;
  cardBalance?: ReactNode;
  children?: ReactNode;
};

export default function Card({
  color = deviceColors.green,
  balancePercentage = 10,
  title,
  icons,
  center,
  cardBalance,
  children,
}: CardProps) {
  const { r, g, b } = hexadecimalToRGB(color);
  const colorStart = `rgba(${r}, ${g}, ${b}, 0)`;
  const colorEnd = `rgba(${r}, ${g}, ${b}, 1)`;

  return (
    <Box
      data-testid="card"
      className={classnames(styles.card, 'card')} // class `card` is needed for the `CardCollection` component
      style={
        {
          '--card-progress': `${balancePercentage}%`,
          '--card-progress-color-start': colorStart,
          '--card-progress-color-end': colorEnd,
        } as React.CSSProperties
      }
    >
      {children}
      <Stack flexDirection="column" className={styles.cardContentContainer}>
        <Stack flexDirection="row">
          <Stack
            flexDirection="row"
            alignItems="center"
            className={styles.accountAliasContainer}
          >
            {title}
          </Stack>
        </Stack>
        <Stack flex={1} />
        {center}
        <Stack flexDirection="column" className={styles.txAndBalance}>
          {cardBalance}
        </Stack>
        <Stack flex={1} />
        <Stack
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
          className={styles.cardContentBottom}
          width="100%"
        >
          {icons}
        </Stack>
      </Stack>
    </Box>
  );
}
