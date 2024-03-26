'use client';

import Recover from '@/components/Recover/Recover';
import { Button } from '@/components/shared/Button/Button';
import { useAccounts, type Account } from '@/context/AccountsContext';
import { deviceColors } from '@/styles/shared/tokens.css';
import { getAccountNameFromRegisterDeviceEvent } from '@/utils/getAccountNameFromRegisterDeviceEvent';
import { getChainwebDataUrl } from '@/utils/getChainwebDataUrl';
import { getAccountFrom } from '@/utils/shared/account';
import { Heading } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { startAuthentication } from '@simplewebauthn/browser';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function RecoverPage() {
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

    if (!userHandle) throw new Error('User handle is required');

    const alias = userHandle.split('(')[0].trim();

    const networkId = process.env.WALLET_NETWORK_ID || '';
    const domain = getChainwebDataUrl(networkId);

    const accountName = await getAccountNameFromRegisterDeviceEvent(
      domain,
      authResult.id,
    );

    if (!accountName) throw new Error('Account is required');

    const account = await getAccountFrom({ accountName, networkId });

    setAccount({
      accountName: account.accountName,
      networkId: account.networkId,
      alias: alias || '',
      devices: account.devices.map((device) => ({
        ...device,
        deviceType: device.name?.split('_')[0] || 'phone',
        color: device.name?.split('_')[1] || deviceColors.purple,
      })),
      balance: account.balance,
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
      <Recover />
    </div>
  );
}
