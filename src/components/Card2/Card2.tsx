import { Box, Heading, MaskedValue, Stack, SystemIcon, Text } from '@kadena/react-ui';
import {
  accountAlias,
  accountAliasContainer,
  accountIcon,
  accountIconInner,
  balance,
  balanceLabel,
  card,
  cardBackground,
  cardContentBottom,
  cardContentCenter,
  cardContentContainer,
  cardLogo,
  device,
  network,
  transactions,
  transactionsLabel,
} from './Card2.css';
import Image from 'next/image';
import CardBackground from '../../assets/images/card-background.svg';
import CardLogo from '../../assets/images/card-logo.svg';
import { ThemeProvider } from 'next-themes';
import classNames from 'classnames';

export default function Card2() {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      forcedTheme='light'
    >
    <Box className={classNames('card', card)} style={{ colorScheme: 'light'}}>
      <Image
        src={CardBackground}
        alt="Card background"
        className={cardBackground}
      />
      <Stack
        flexDirection={'column'}
        justifyContent={'space-between'}
        className={cardContentContainer}
      >
        <Stack flexDirection={'row'} justifyContent={'space-between'}>
          <Stack flexDirection={'row'} alignItems={'center'} className={accountAliasContainer}>
            <Heading
              as={'h3'}
              variant={'h4'}
              className={accountAlias}
            >
              Account Alias
            </Heading>
            <Box className={accountIcon}>
              <SystemIcon.Account className={accountIconInner} />
            </Box>

            <Box className={device}>
              <SystemIcon.UsbFlashDrive />
            </Box>
            <Box className={device}>
              <SystemIcon.UsbFlashDrive />
            </Box>
            <Box className={device}>
              <SystemIcon.UsbFlashDrive />
            </Box>
          </Stack>
        </Stack>
        <Stack
          flexDirection={'column'}
          className={classNames('card__content-center', cardContentCenter)}
        >
          <MaskedValue
            value={'c:lmpNroVTMPQNv8wd6c5QUJjsUgdaoCH7UNMndllgWAE'}
            startUnmaskedValues={16}
          />
          <Text className={network}>Testnet Network</Text>
        </Stack>
        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-end'}
          className={classNames('card__content-bottom', cardContentBottom)}
        >
          <Stack flexDirection={'column'}>
            <Stack alignItems={'center'}>
              <span className={transactionsLabel}># TX</span>
              <span className={transactions}>12</span>
            </Stack>
            <Stack>
              <span className={balanceLabel}>Balance</span>
              <span className={balance}>4567.89</span>
            </Stack>
          </Stack>
          <Image
            src={CardLogo}
            alt="Card logo"
            className={cardLogo}
          />
        </Stack>
      </Stack>
    </Box>
    </ThemeProvider>
  );
}
