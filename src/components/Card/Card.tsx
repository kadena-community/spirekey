import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { Account } from '@/context/AccountsContext';
import { Box, Heading, Stack, SystemIcon, Text } from '@kadena/react-ui';
import Image from 'next/image';
import CardBackground from '../../assets/images/card-background.svg';
import CardLogo from '../../assets/images/card-logo.svg';
import {
  accountAlias,
  accountAliasContainer,
  accountIcon,
  accountIconInner,
  account as accountStyle,
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
  txAndBalance,
} from './Card.css';

type CardProps = {
  account: Account;
  onClick?: (account: Account) => void;
  balancePercentage?: number;
  isCollapsed?: boolean;
  isActive?: boolean;
};

export default function Card({
  account,
  onClick = (account: Account) => {},
  balancePercentage = 10,
  isCollapsed = false,
  isActive = false,
}: CardProps) {
  const uniqueDeviceTypes = new Set();
  account.devices.map((d) => uniqueDeviceTypes.add(d.identifier.split('_')[0]));

  return (
    <Box
      className={card}
      style={{
        '--card-progress': `${balancePercentage}%`,
      }}
      onClick={() => onClick(account)}
    >
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
        <Stack flexDirection={'row'}>
          <Stack
            flexDirection={'row'}
            alignItems={'center'}
            className={accountAliasContainer}
          >
            {account.alias && (
              <>
                <Heading as={'h3'} variant={'h4'} className={accountAlias}>
                  {account.alias}
                </Heading>
                <Box className={accountIcon}>
                  <SystemIcon.Account className={accountIconInner} />
                </Box>
              </>
            )}
          </Stack>
          <Stack flexDirection={'row'} alignItems={'center'}>
            {Array.from(uniqueDeviceTypes).map((type) => {
              switch (type) {
                case 'security-key':
                  return (
                    <Box className={device}>
                      <SystemIcon.UsbFlashDrive />
                    </Box>
                  );
                case 'phone':
                  return (
                    <Box className={device}>
                      <SystemIcon.Cookie />
                    </Box>
                  );
                case 'desktop':
                  return (
                    <Box className={device}>
                      <SystemIcon.Application />
                    </Box>
                  );
                default:
                  return (
                    <Box className={device}>
                      <SystemIcon.Information />
                    </Box>
                  );
              }
            })}
          </Stack>
        </Stack>
        <Stack flexDirection={'column'} className={cardContentCenter}>
          <MaskedValue
            value={account.accountName}
            startUnmaskedValues={16}
            className={accountStyle}
          />
          <Text className={network}>{account.network}</Text>
        </Stack>
        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-end'}
          className={cardContentBottom}
        >
          <Stack flexDirection={'column'} className={txAndBalance}>
            <Stack alignItems={'center'}>
              <span className={transactionsLabel}># TX</span>
              <span className={transactions}>0</span>
            </Stack>
            <Stack>
              <span className={balanceLabel}>Balance</span>
              <span className={balance}>{account.balance}</span>
            </Stack>
          </Stack>
          <Image src={CardLogo} alt="Card logo" className={cardLogo} />
        </Stack>
      </Stack>
    </Box>
  );
}
