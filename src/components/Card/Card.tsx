import { Account } from '@/context/AccountsContext';
import { deviceColors } from '@/styles/tokens.css';
import { hexadecimalToRGB } from '@/utils/color';
import { Box, Stack } from '@kadena/react-ui';
import classnames from 'classnames';
import Image from 'next/image';
import { ReactNode } from 'react';
import CardLogo from '../../assets/images/card-logo.svg';
import {
  accountAliasContainer,
  card,
  cardContentBottom,
  cardContentContainer,
  cardLogo,
  txAndBalance,
} from './Card.css';

type CardProps = {
  color?: string;
  balancePercentage?: number;
  title?: ReactNode;
  icons?: ReactNode;
  center?: ReactNode;
  cardBottom?: ReactNode;
};

export default function Card({
  color = deviceColors.green,
  balancePercentage = 10,
  title = undefined,
  icons = undefined,
  center = undefined,
  cardBottom = undefined,
}: CardProps) {
  const { r, g, b } = hexadecimalToRGB(color);
  const colorStart = `rgba(${r}, ${g}, ${b}, 0)`;
  const colorEnd = `rgba(${r}, ${g}, ${b}, 1)`;

  return (
    <Box
      className={classnames(card, 'card')}
      style={{
        '--card-progress': `${balancePercentage}%`,
        '--card-progress-color-start': colorStart,
        '--card-progress-color-end': colorEnd,
      }}
    >
      <Stack
        flexDirection="column"
        justifyContent="space-between"
        className={cardContentContainer}
      >
        <Stack flexDirection="row">
          <Stack
            flexDirection="row"
            alignItems="center"
            className={accountAliasContainer}
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
          className={cardContentBottom}
        >
          <Stack flexDirection="column" className={txAndBalance}>
            {cardBottom}
          </Stack>
          <Image src={CardLogo} alt="Card logo" className={cardLogo} />
        </Stack>
      </Stack>
    </Box>
  );
}
