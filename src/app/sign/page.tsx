'use client';

import { Button } from '@/components/Button/Button';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink';
import { Surface } from '@/components/Surface/Surface';
import { Account, useAccounts } from '@/context/AccountsContext';
import { useSign } from '@/hooks/useSign';
import { getDeviceByPublicKey } from '@/utils/getDeviceByPublicKey';
import { getLabels } from '@/utils/signUtils';
import {
  Box,
  Heading,
  ProductIcon,
  Stack,
  SystemIcon,
  Text,
  Tooltip,
} from '@kadena/react-ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import fingerprint from '@/assets/images/fingerprint.svg';
import { usePreviewEvents } from '@/hooks/usePreviewEvents';
import type { ICommandPayload, IPactEvent } from '@kadena/types';
import { container, step, wrapper } from './page.css';

interface SignProps {
  searchParams: {
    transaction: string;
    returnUrl: string;
    optimistic?: boolean;
  };
}

export default function Sign(req: SignProps) {
  const { transaction, returnUrl, optimistic = false } = req.searchParams;
  const [autoRedirect, setAutoRedirect] = useState<boolean>(true);
  const [redirectLocation, setRedirectLocation] = useState<string>('');
  const router = useRouter();
  const { accounts } = useAccounts();

  const data = transaction
    ? Buffer.from(transaction, 'base64').toString()
    : null;
  const [tx, setTx] = useState<any>(JSON.parse(data ?? '{}'));

  const { sign } = useSign();
  const [language, setLanguage] = useState('en');

  const txData: ICommandPayload = JSON.parse(tx.cmd || '{}');

  const publicKeys: string[] = txData.signers.map(
    (s: { pubKey: string }) => s.pubKey,
  );

  const devices = publicKeys
    .filter((key) =>
      accounts.some((account) =>
        account.devices.some((device) => device.guard.keys.includes(key)),
      ),
    )
    .map((publicKey) => getDeviceByPublicKey(accounts, publicKey));
  const pendingRegistrationTxs = devices.map(
    (device) => device?.pendingRegistrationTx,
  );

  const isReadyToSubmit =
    (!optimistic && !!pendingRegistrationTxs.length) || optimistic;

  const [signaturesToSign, setSignaturesToSign] = useState<number>(
    devices.length,
  );

  useEffect(() => {
    if (isReadyToSubmit && redirectLocation && autoRedirect) {
      router.push(redirectLocation);
    }
  }, [redirectLocation, isReadyToSubmit, router, returnUrl, autoRedirect]);

  const { events } = usePreviewEvents(req.searchParams);

  const onSign = async (deviceIndex: number) => {
    const signedTx = await sign(tx, devices?.[deviceIndex]?.['credential-id']!);

    setTx(signedTx);
    const newAmountOfSigsToSign = signaturesToSign - 1;
    setSignaturesToSign(newAmountOfSigsToSign);

    // No more available signers in this wallet (we don't use `tx` here since setTx is async)
    if (newAmountOfSigsToSign === 0) {
      const params = new URLSearchParams();
      params.append(
        'transaction',
        Buffer.from(JSON.stringify(signedTx)).toString('base64'),
      );

      if (optimistic && pendingRegistrationTxs) {
        params.append(
          'pendingTxIds',
          encodeURIComponent(JSON.stringify(pendingRegistrationTxs)),
        );
      }

      setTimeout(() => {
        setRedirectLocation(`${returnUrl}?${params.toString()}`);
      }, 2000);
    }
  };

  const onAutoRedirectChange = () => {
    setAutoRedirect(!autoRedirect);
  };

  const isCoinEventForAccounts =
    (accounts: Account[]) => (event: IPactEvent) => {
      if (event.module.name !== 'coin') return false;
      if (event.module.namespace) return false;
      if (!event.params[0]) return false;
      return accounts.some(
        (account) => event.params[0] === account.accountName,
      );
    };
  const coinEvents = events?.filter(isCoinEventForAccounts(accounts));
  const otherEvents = events?.filter((event) => {
    if (event.module.name === 'webauthn-wallet' && event.name === 'TRANSFER')
      return false;
    return !isCoinEventForAccounts(accounts)(event);
  });
  return (
    <>
      <Stack flexDirection="column" gap="md" alignItems="center" margin="xl">
        <Stack gap="sm" alignItems="center">
          <ProductIcon.ManageKda size="lg" />
          <Heading variant="h5">Preview and sign transaction</Heading>
        </Stack>
        <Heading variant="h5">Transaction details</Heading>
        {/* <Select
          id="lanuage"
          label="Language"
          onChange={(evt) => setLanguage(evt.currentTarget.value)}
        >
          <SelectItem>
            <option value="">Select language</option>
          </SelectItem>
          <SelectItem>
            <option value="en">English</option>
          </SelectItem>
          <SelectItem>
            <option value="nl">Nederlands</option>
          </SelectItem>
          <SelectItem>
            <option value="fr">Français</option>
          </SelectItem>
        </Select> */}
        {getLabels(txData.signers, language).map((x, index) => (
          <Box key={x.label + index} width="100%">
            <Heading variant="h6">{x.label}</Heading>
            <Stack alignItems="center" gap="sm">
              <Text>{x.description ?? 'No description available'}</Text>
              {!x.description && (
                <Tooltip
                  content="The owner of this smart contract hasn't provided a description for
                this type of transaction yet."
                >
                  <SystemIcon.AlertCircleOutline size="sm" />
                </Tooltip>
              )}
            </Stack>
            <Box marginBlockStart="sm">
              <Text variant="base">
                <details>
                  <summary>View raw capability</summary>
                  <Text bold variant="base">
                    Capability:
                  </Text>{' '}
                  {x.raw.name}
                  <br />
                  {x.valuesString && (
                    <>
                      <Text bold variant="base">
                        Values:
                      </Text>{' '}
                      {x.valuesString}
                    </>
                  )}
                </details>
              </Text>
            </Box>
          </Box>
        ))}
        <Box width="100%">
          <Heading variant="h6">Events</Heading>
          <Text>
            <details>
              <summary>View coin events</summary>

              {coinEvents?.length
                ? coinEvents.map((event) => (
                    <>
                      <h3>
                        {event.module.namespace
                          ? event.module.namespace + '.'
                          : ''}
                        {event.module.name}:{event.name}
                      </h3>
                      <Text>
                        You will be paying {event.params[1].toString()}:{' '}
                        {event.params[2].toString()}
                      </Text>
                    </>
                  ))
                : 'No KDA will be transfered in this transaction using this account.'}
            </details>
            <details>
              <summary>View other events</summary>
              {!!otherEvents?.length &&
                otherEvents.map((event) => (
                  <>
                    <h3>
                      {event.module.namespace
                        ? event.module.namespace + '.'
                        : ''}
                      {event.module.name}:{event.name}
                    </h3>
                    <Text>
                      {event.params.map((param) => (
                        <p>{JSON.stringify(param)}</p>
                      ))}
                    </Text>
                  </>
                ))}
            </details>
          </Text>
        </Box>
        <Box width="100%">
          <Text variant="base">
            <details>
              <summary>View raw transaction</summary>
              <pre>{JSON.stringify({ ...tx, cmd: txData }, null, 2)}</pre>
            </details>
          </Text>
        </Box>

        <div className={wrapper}>
          <motion.div
            animate={{ x: `-${(devices.length - signaturesToSign) * 100}%` }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className={container}
          >
            {devices.map((d, i) => (
              <Box className={step} key={d?.['credential-id']}>
                <Surface>
                  <Stack flexDirection="column" gap="sm">
                    <Heading variant="h5">Sign</Heading>
                    <Text>
                      Sign this transaction with the following credential:{' '}
                      {d?.['credential-id']}
                    </Text>
                    <Text>
                      (Device {i + 1} of {devices.length})
                    </Text>
                    <Surface>
                      <Stack
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="md"
                      >
                        <Image src={fingerprint} alt="fingerprint icon" />
                        <Button onPress={() => onSign(i)}>Sign</Button>
                      </Stack>
                    </Surface>
                  </Stack>
                </Surface>
              </Box>
            ))}

            <Box className={step}>
              <Surface>
                <Stack flexDirection="column" gap="md" margin="xl">
                  {!isReadyToSubmit && <p>Minting...</p>}
                  {!redirectLocation && !isReadyToSubmit && (
                    <label>
                      <input
                        type="checkbox"
                        checked={autoRedirect}
                        onChange={onAutoRedirectChange}
                      />
                      <Text style={{ wordBreak: 'break-all' }}>
                        Go back to {returnUrl} when ready
                      </Text>
                    </label>
                  )}

                  {redirectLocation && isReadyToSubmit && !autoRedirect ? (
                    <ButtonLink href={redirectLocation}>
                      Go back to {returnUrl}
                    </ButtonLink>
                  ) : (
                    <Text>Redirecting you back to {returnUrl}</Text>
                  )}
                </Stack>
              </Surface>
            </Box>
          </motion.div>
        </div>
      </Stack>
    </>
  );
}
