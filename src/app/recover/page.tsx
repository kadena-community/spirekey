'use client';

import { Button } from '@/components/shared/Button/Button';
import { useAccounts, type Account } from '@/context/AccountsContext';
import { deviceColors } from '@/styles/shared/tokens.css';
import { getChainwebDataUrl } from '@/utils/getChainwebDataUrl';
import { getAccountFrom } from '@/utils/shared/account';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';
import { Heading, TextField } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { startAuthentication } from '@simplewebauthn/browser';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const getAccountNameFromRegisterEvent = async (
  domain: string,
  credentialId: string,
): Promise<string> => {
  const eventsResponse = await fetch(
    `${domain}/txs/events?param=${credentialId}&name=REGISTER&modulename=${process.env.NAMESPACE}.webauthn-guard`,
  );
  const events = await eventsResponse.json();

  if (events.length === 0) {
    return '';
  }

  const requestKey = events[0].requestKey;

  const txResponse = await fetch(`${domain}/txs/tx?requestkey=${requestKey}`);
  const tx = await txResponse.json();

  return tx.result;
};

const getAccountNameFromAddDeviceEvent = async (
  domain: string,
  credentialId: string,
): Promise<string> => {
  const eventsResponse = await fetch(
    `${domain}/txs/events?param=${credentialId}&name=ADD_DEVICE&modulename=${process.env.NAMESPACE}.webauthn-guard`,
  );
  const events = await eventsResponse.json();

  if (events.length === 0) {
    return '';
  }

  const requestKey = events[0].requestKey;

  const txResponse = await fetch(`${domain}/txs/tx?requestkey=${requestKey}`);
  const tx = await txResponse.json();

  return tx.sender;
};

const networkMap = {
  Devnet: getDevnetNetworkId(),
  Testnet: 'testnet04',
  Mainnet: 'mainnet01',
};

type NetworkDisplayName = keyof typeof networkMap;

export default function Recover() {
  const router = useRouter();
  const { setAccount } = useAccounts();
  const { handleSubmit } = useForm({
    defaultValues: {},
    reValidateMode: 'onBlur',
  });

  const onSubmit = async () => {
    const authResult = await startAuthentication({
      challenge: 'doesnotreallymatter',
      rpId: window.location.hostname,
    });

    const userHandle = authResult.response.userHandle;
    const alias = userHandle?.split('(')[0].trim();
    const network = userHandle?.split('(')[1].split(')')[0] || 'Devnet';
    const networkId = networkMap[network as NetworkDisplayName];
    const domain = getChainwebDataUrl(networkId);

    const accountName =
      (await getAccountNameFromRegisterEvent(domain, authResult.id)) ||
      (await getAccountNameFromAddDeviceEvent(domain, authResult.id));

    if (!accountName) throw new Error('Account is required');

    const acc = await getAccountFrom({
      accountName,
      networkId,
    });

    console.log(acc.devices);
    setAccount({
      accountName: acc.accountName,
      networkId: acc.networkId,
      alias: alias || '',
      devices: acc.devices.map((device) => ({
        ...device,
        deviceType: device.name?.split('_')[0] || 'phone',
        color: device.name?.split('_')[1] || deviceColors.purple,
      })),
      balance: acc.balance,
    });

    router.push(`/`);
  };

  return (
    <div
      className={atoms({
        paddingInline: 'lg',
        paddingBlock: 'lg',
      })}
    >
      <Heading>Recover</Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={atoms({
          marginBlockStart: 'lg',
          display: 'flex',
          gap: 'lg',
          flexDirection: 'column',
        })}
      >
        <Button type="submit">Recover</Button>
      </form>
    </div>
  );
}
