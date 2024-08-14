'use client';

import type { ChainId } from '@kadena/client';
import {
  kadenaDecrypt,
  kadenaEncrypt,
  kadenaGenKeypairFromSeed,
} from '@kadena/hd-wallet';
import { Button, Heading, Stack, Text } from '@kadena/kode-ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  AccountRegistration,
  RegisterAccountFn,
  useAccounts,
} from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { deviceColors } from '@/styles/shared/tokens.css';
import { countWithPrefixOnDomain } from '@/utils/countAccounts';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import {
  getAccountName,
  getRAccountName,
  getWebAuthnPubkeyFormat,
  registerRAccounts,
} from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import cbor from 'cbor';
import elliptic from 'elliptic';

import {
  CardContainer,
  CardContentBlock,
  CardFooter,
} from '@/components/CardPattern/CardPattern';
import { useRAccount } from '@/flags/flags';
import { getUser } from '@/utils/connect';
import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { token } from '@kadena/kode-ui/styles';
import { Account } from '@kadena/spirekey-types';
import {
  base64URLStringToBuffer,
  startAuthentication,
} from '@simplewebauthn/browser';
import AccountNetwork from '../Card/AccountNetwork';
import Alias from '../Card/Alias';
import Card from '../Card/Card';
import CardBottom from '../Card/CardBottom';
import DeviceIcons from '../Card/DeviceIcons';
import PasskeyCard from '../Card/PasskeyCard';
import { Step, Stepper } from '../Stepper/Stepper';
import * as styles from './Registration.css';

interface Props {
  redirectUrl?: string;
  networkId?: string;
  chainId?: ChainId;
  onComplete?: (account: Account) => void;
  onCancel?: () => void;
}
type KeyPair = { publicKey: string; secretKey: string };

const rootkeyPasskeyName = `SpireKey Wallet Key (DO NOT USE FOR SIGNING)`;

export const registerNewDevice =
  (
    registerAccount: RegisterAccountFn,
    onPasskeyRetrieved: (account: Account) => void,
  ) =>
  async ({
    alias,
    networkId,
    chainId,
    color,
    domain,
    keypair,
  }: Omit<
    AccountRegistration,
    'accountName' | 'credentialPubkey' | 'deviceType' | 'credentialId'
  > & { keypair?: KeyPair }): Promise<void> => {
    const { publicKey, deviceType, credentialId } =
      await getNewWebauthnKey(alias);
    const account = {
      networkId,
      credentialId,
      deviceType,
      chainId,
      alias,
      color,
      domain,
      credentialPubkey: publicKey,
    };
    if (useRAccount()) {
      if (!keypair) throw new Error('No keypair provided');
      const { name: accountName, guard } = await getRAccountName(
        publicKey,
        keypair.publicKey,
        networkId,
      );
      const pendingTxs = await registerRAccounts({
        ...account,
        accountName,
        publicKey: keypair.publicKey,
        secretKey: keypair.secretKey,
      });
      onPasskeyRetrieved({
        accountName,
        guard,
        networkId,
        balance: '0.0',
        alias,
        chainIds: Array(20)
          .fill(1)
          .map((_, i) => i.toString()) as ChainId[],
        minApprovals: 1,
        minRegistrationApprovals: 1,
        devices: [
          {
            color,
            deviceType,
            domain,
            guard: {
              keys: [getWebAuthnPubkeyFormat(publicKey)],
              pred: 'keys-any',
            },
            'credential-id': credentialId,
          },
        ],
        txQueue: pendingTxs,
      });
      return;
    }

    const accountName = await getAccountName(publicKey, networkId);
    onPasskeyRetrieved(await registerAccount({ ...account, accountName }));
  };

type UseRegistration = {
  chainId?: ChainId;
  networkId?: string;
};
function i2hex(i: number) {
  return ('0' + i.toString(16)).slice(-2);
}

export const hex = (bytes: Uint8Array) => Array.from(bytes).map(i2hex).join('');
async function sha256(clientDataJSON: ArrayBuffer) {
  return await window.crypto.subtle.digest('SHA-256', clientDataJSON);
}
function concatenateData(
  authenticatorData: ArrayBuffer,
  clientDataHash: ArrayBuffer,
) {
  const concatenated = new Uint8Array(
    authenticatorData.byteLength + clientDataHash.byteLength,
  );
  concatenated.set(new Uint8Array(authenticatorData), 0);
  concatenated.set(
    new Uint8Array(clientDataHash),
    authenticatorData.byteLength,
  );
  return concatenated;
}
const useRegistration = ({ chainId, networkId }: UseRegistration) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [allowRedirect, setAllowRedirect] = useState<boolean>(false);
  const [currentAccountName, setCurrentAccountName] = useState<string>('');
  const [succesfulAuthentication, setSuccesfulAuthentication] =
    useState<boolean>(false);
  const [account, setCurrentAccount] = useState<Account>();
  const [keypair, setKeypair] = useState<KeyPair>();

  const { registerAccount, accounts, setAccount } = useAccounts();
  const { host } = useReturnUrl();
  const { addNotification } = useNotifications();

  const accountPrefix = 'SpireKey Account';

  const currentNetwork = networkId || process.env.WALLET_NETWORK_ID!;

  const numberOfSpireKeyAccounts = countWithPrefixOnDomain(
    accounts,
    accountPrefix,
    host,
    currentAccountName,
  );

  const alias = `${accountPrefix} ${numberOfSpireKeyAccounts + 1}`;
  const color = deviceColors.purple;

  const handleConnectWallet = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { response } = await startAuthentication({
        rpId: window.location.hostname,
        challenge: 'reconnectwallet',
      });
      console.warn('DEBUGPRINT[11]: Registration.tsx:196: response=', response);
      const usignature = new Uint8Array(
        base64URLStringToBuffer(response.signature),
      );
      const rStart = usignature[4] === 0 ? 5 : 4;
      const rEnd = rStart + 32;
      const sStart = usignature[rEnd + 2] === 0 ? rEnd + 3 : rEnd + 2;
      const r = usignature.slice(rStart, rEnd);
      const s = usignature.slice(sStart);

      const ec = new elliptic.ec('p256');

      const rBigInt = BigInt('0x' + hex(r));
      const sBigInt = BigInt('0x' + hex(s));

      const sig = { r: rBigInt.toString(16), s: sBigInt.toString(16) };

      const concatenatedData = concatenateData(
        base64URLStringToBuffer(response.authenticatorData),
        await sha256(base64URLStringToBuffer(response.clientDataJSON)),
      );
      const messageHash = new Uint8Array(await sha256(concatenatedData));

      const key = [
        ec.recoverPubKey(messageHash, sig, 0),
        ec.recoverPubKey(messageHash, sig, 1),
      ].map(async (p) => {
        const key = ec.keyFromPublic(p);
        const verified = await key.verify(messageHash, sig);
        const tempPassword = crypto.getRandomValues(new Uint16Array(32));
        const [pubKey, privateKey] = await kadenaGenKeypairFromSeed(
          tempPassword,
          await kadenaEncrypt(
            tempPassword,
            await crypto.subtle.digest(
              'sha-512',
              Buffer.from(p.encode('hex', false)),
            ),
          ),
          0,
        );

        //console.warn('DEBUGPRINT[18]: Registration.tsx:246: pubKey=', pubKey);
        console.warn(
          "DEBUGPRINT[34]: Registration.tsx:241: Buffer.from(p.encode('hex', false)),=",
          p.encode('hex', false),
        );
        return p.encode('hex', false);
      });
    } catch (e) {
      console.warn('DEBUGPRINT[12]: Registration.tsx:228: e=', e);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleRegisterWallet = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { publicKey, hex } = await getNewWebauthnKey(rootkeyPasskeyName);
      // const publicKey =
      // '04e90c1c14a753be4c1b8aa49a11549abae583353c47e85f543fe83d2d5a5fca527844e3fcac67ee423e08bda6555540380743aae6e837a763639f69d3c1f8917b';
      console.warn('DEBUGPRINT[28]: Registration.tsx:266: publicKey=', hex);
      const tempPassword = crypto.getRandomValues(new Uint16Array(32));
      const [pubKey, privateKey] = await kadenaGenKeypairFromSeed(
        tempPassword,
        await kadenaEncrypt(
          tempPassword,
          await crypto.subtle.digest('sha-512', Buffer.from(hex)),
        ),
        0,
      );

      console.warn('DEBUGPRINT[29]: Registration.tsx:274: pubKey=', pubKey);
      const decrypted = await kadenaDecrypt(tempPassword, privateKey);
      setKeypair({
        publicKey: pubKey,
        secretKey: Buffer.from(decrypted).toString('hex'),
      });
    } catch (e) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await registerNewDevice(registerAccount, (account) => {
        setSuccesfulAuthentication(true);
        setAccount(account);
        setCurrentAccount(account);
        setCurrentAccountName(account.accountName);
        setAllowRedirect(true);
      })({
        alias: `${alias} (${getNetworkDisplayName(currentNetwork)})`,
        domain: host,
        color,
        chainId,
        networkId: currentNetwork,
        keypair,
      });
    } catch (error: any) {
      addNotification({
        variant: 'error',
        title: 'Could not create an account',
        message: error?.message || 'Please try again later...',
        timeout: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    allowRedirect,
    isSubmitting,
    succesfulAuthentication,
    handleSubmit,
    handleRegisterWallet,
    handleConnectWallet,
    keypair,
    account,
  };
};

export default function Registration({
  redirectUrl,
  networkId,
  chainId,
  onComplete,
  onCancel,
}: Props) {
  const router = useRouter();
  const decodedRedirectUrl = decodeURI(redirectUrl || '');
  const cancelRedirectUrl = decodedRedirectUrl || '/welcome';
  const completeRedirectUrl = decodedRedirectUrl || '/';
  const handleCancel = () => {
    if (onCancel) return onCancel();
    router.push(cancelRedirectUrl);
  };
  const wut =
    'a50102032620012158204854b3ed7fe013b6c16fc18e8a31f8b99ac3648f472c31689633a15791e5c8b5225820a8e1a087189dc457b67531886c2bb56699cf54488d2e8a4e1af173ab07d2014f';
  const buff = Buffer.from(wut, 'hex');
  const obj = cbor.decode(buff);
  [...obj.entries()].map(([i, v]) => {
    if (i <= -2)
      console.warn(
        'DEBUGPRINT[32]: Registration.tsx:349: cbor.encode(buff)=',
        Buffer.from(v).toString('hex'),
        hex(v),
      );
  });
  const {
    account,
    keypair,
    handleRegisterWallet,
    handleConnectWallet,
    isSubmitting,
    succesfulAuthentication,
    handleSubmit,
  } = useRegistration({
    networkId,
    chainId,
  });
  const handleComplete = () => {
    if (!account) throw new Error('No user registered');
    if (onComplete) return onComplete(account);
    const user = Buffer.from(JSON.stringify(getUser(account))).toString(
      'base64',
    );
    router.push(`${completeRedirectUrl}?${new URLSearchParams({ user })}`);
  };
  return (
    <RegisterComponent
      account={account}
      isSubmitting={isSubmitting}
      succesfulAuthentication={succesfulAuthentication}
      keypair={keypair}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      onComplete={handleComplete}
      onHandleConnectWallet={handleConnectWallet}
      onHandleRegisterWallet={handleRegisterWallet}
    />
  );
}
const RegisterComponent = ({
  account,
  keypair,
  isSubmitting,
  succesfulAuthentication,
  onCancel,
  onHandleRegisterWallet,
  onHandleConnectWallet,
  onSubmit,
  onComplete,
}: {
  account?: Account;
  keypair?: KeyPair;
  isSubmitting: boolean;
  succesfulAuthentication: boolean;
  onCancel: () => void;
  onHandleConnectWallet: () => void;
  onHandleRegisterWallet: () => void;
  onSubmit: () => void;
  onComplete: () => void;
}) => {
  const [isAnimationFinished, setAnimationFinished] = useState(false);

  if (account && isAnimationFinished)
    return (
      <CardContainer>
        <CardContentBlock
          visual={
            <SpireKeyKdacolorLogoGreen
              aria-label="SpireKey"
              fontSize={token('typography.fontSize.9xl')}
            />
          }
          title="Register Account"
          description={
            <>
              <Text>
                Create your account to manage your web3 assets managed by your
                SpireKey wallet.
              </Text>
              <Stepper>
                <Step>Create Wallet</Step>
                <Step>Register Account</Step>
              </Stepper>
            </>
          }
        >
          <div className={styles.card}>
            <Card
              color={deviceColors.purple}
              balancePercentage={50}
              title={<Alias title={account.alias.replace(/\(.*\)/, '')} />}
              icons={<DeviceIcons account={account} />}
              center={<AccountNetwork account={account} isLoading={true} />}
              cardBottom={<CardBottom account={account} />}
            />
          </div>
        </CardContentBlock>
        <CardFooter>
          <Button variant="outlined" onPress={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onPress={onComplete}>
            Complete
          </Button>
        </CardFooter>
      </CardContainer>
    );

  if (keypair)
    return (
      <CardContainer>
        <CardContentBlock
          visual={
            <SpireKeyKdacolorLogoGreen
              aria-label="SpireKey"
              fontSize={token('typography.fontSize.9xl')}
            />
          }
          title="Register Account"
          description={
            <>
              <Text>
                Create your account to manage your web3 assets managed by your
                SpireKey wallet.
              </Text>
              <Stepper>
                <Step>Create Wallet</Step>
                <Step active>Register Account</Step>
              </Stepper>
            </>
          }
        >
          <div className={styles.card}>
            <PasskeyCard
              isInProgress={!succesfulAuthentication && isSubmitting}
              isSuccessful={succesfulAuthentication}
              onSuccessfulAnimationEnd={() => setAnimationFinished(true)}
              onSubmit={onSubmit}
            />
          </div>
        </CardContentBlock>
        <CardFooter>
          <Button
            variant="outlined"
            onPress={onCancel}
            isDisabled={isSubmitting || succesfulAuthentication}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onPress={onSubmit}
            isDisabled={isSubmitting || succesfulAuthentication}
          >
            Continue
          </Button>
        </CardFooter>
      </CardContainer>
    );
  return (
    <CardContainer>
      <CardContentBlock
        visual={
          <SpireKeyKdacolorLogoGreen
            aria-label="SpireKey"
            fontSize={token('typography.fontSize.9xl')}
          />
        }
        title="Connect Wallet"
        description={
          <>
            <Text>
              Do you wish to manage your wallet here on SpireKey? This will
              become your home of operation, your gateway into the a secure web
              3 experience!
            </Text>
            <Stepper>
              <Step active>Create Wallet</Step>
              <Step>Register Account</Step>
            </Stepper>
          </>
        }
      >
        <Stack flexDirection="column" gap="md">
          <Heading as="h5">Already have a wallet?</Heading>
          <Text>
            Provide your passkey named <Text bold>{rootkeyPasskeyName}</Text> to
            add another account to this wallet.
          </Text>
          <CardFooter>
            <Button onPress={onHandleConnectWallet}>Connect</Button>
          </CardFooter>
          <Heading as="h5">No wallet yet?</Heading>
          <Text>
            Create a new wallet using a passkey. This passkey will be stored on
            your device as <Text bold>{rootkeyPasskeyName}</Text>.
          </Text>
          <Text>
            This passkey will be used to perform maintenance operations as well
            as recovery operations. SpireKey will not use this key for signing!
          </Text>
        </Stack>
      </CardContentBlock>
      <CardFooter>
        <Button onPress={onHandleRegisterWallet}>Create</Button>
      </CardFooter>
    </CardContainer>
  );
};
