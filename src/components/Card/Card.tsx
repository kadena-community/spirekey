import { Account } from '@/context/AccountsContext';
import { Heading, MaskedValue, Stack, Text } from '@kadena/react-ui';
import { AccountDevice } from '../AccountDevice/AccountDevice';
import { Carousel } from '../Carousel/Carousel';
import {
  accountName,
  accountNameCollapsed,
  card,
  cardBody,
  chainweb,
  chainwebIcon,
  desktopIcon,
  devices,
  logo,
  logoCenter,
  network,
  networkCollapsed,
  phoneIcon,
  thickness,
  usbIcon,
} from './Card.css';

interface CardProps {
  account: Account;
  onClick: (account: Account) => void;
  isCollapsed: boolean;
  isActive: boolean;
}

export default function Card({
  account,
  onClick,
  isCollapsed,
  isActive,
}: CardProps) {
  return (
    <Carousel>
      {account.devices.map((d) => (
        <AccountDevice
          name={account.accountName}
          network={account.network}
          balance={account.balance}
          icon="😊"
          color={'red'}
        />
      ))}
    </Carousel>
  );

  return (
    <div
      className={card}
      onClick={() => onClick(account)}
      data-collapsed={isCollapsed}
      data-active={isActive}
    >
      <div className={thickness}></div>
      <div className={thickness}></div>
      <div className={thickness}></div>

      <div className={cardBody}>
        {(isActive || !isCollapsed) && (
          <div className={logo} data-svg-background></div>
        )}
        <div className={logoCenter} data-svg-background></div>
        <div
          className={
            isCollapsed && !isActive ? accountNameCollapsed : accountName
          }
        >
          <MaskedValue
            value={account.accountName}
            startUnmaskedValues={isCollapsed && !isActive ? 16 : 16}
          />
        </div>
        <Stack className={devices} flexDirection="row-reverse">
          {account.devices.length > 0 && (
            <div className={phoneIcon} data-svg-background></div>
          )}
          {account.devices.length > 1 && (
            <div className={usbIcon} data-svg-background></div>
          )}
          {account.devices.length > 2 && (
            <div className={desktopIcon} data-svg-background></div>
          )}
        </Stack>
        <div className={isCollapsed && !isActive ? networkCollapsed : network}>
          {account.network}
        </div>
        <Stack className={chainweb} flexDirection="column">
          <div className={chainwebIcon} data-svg-background></div>
          <Heading
            variant="h6"
            as="h6"
            style={{ lineHeight: 0.8, transform: 'scale(0.7)' }}
          >
            chainweb
          </Heading>
        </Stack>
      </div>
      {/* <div className="hash-container">
          c:JCAmBaWvYNucn9QFzbsak0achzWMjK1fX3T2auZWM58
        </div> */}

      {/* <Heading variant="h5" as="h2">
          {account.devices.map((d: any) => d.identifier).join(', ')}
        </Heading>

        <MaskedValue value={account.accountName} />

        <Text>{account.network}</Text> */}

      {isActive &&
        account.devices.map((d) => (
          <Stack>
            <AccountDevice
              name={d.identifier}
              network={account.network}
              balance={account.balance}
              icon="😊"
              color={'red'}
            />
          </Stack>
        ))}
    </div>
  );
}
