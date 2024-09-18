import { deviceColors } from '@/styles/shared/tokens.css';
import { hexadecimalToRGB } from '@/utils/color';
import { Box, Stack } from '@kadena/kode-ui';
import classnames from 'classnames';
import Image from 'next/image';
import { ReactNode } from 'react';
import CardLogo from '../../assets/images/card-logo.svg';
import * as styles from './Card.css';

type CardProps = {
  color?: string;
  balancePercentage?: number;
  title?: ReactNode;
  icons?: ReactNode;
  center?: ReactNode;
  cardBottom?: ReactNode;
  children?: ReactNode;
};

export default function Card({
  color = deviceColors.green,
  balancePercentage = 10,
  title,
  icons,
  center,
  cardBottom,
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
      <Stack
        flexDirection="column"
        justifyContent="space-between"
        className={styles.cardContentContainer}
      >
        <Stack flexDirection="row">
          <Stack
            flexDirection="row"
            alignItems="center"
            className={styles.accountAliasContainer}
          >
            {title}
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            {icons}
          </Stack>
        </Stack>
        {center}
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          className={styles.cardContentBottom}
        >
          <Stack flexDirection="column" className={styles.txAndBalance}>
            {cardBottom}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
