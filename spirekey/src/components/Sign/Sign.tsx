'use client';

import { Button } from '@/components/shared/Button/Button';
import { ButtonLink } from '@/components/shared/ButtonLink/ButtonLink';
import { Surface } from '@/components/Surface/Surface';
import { useAccounts } from '@/context/AccountsContext';
import { useSign } from '@/hooks/useSign';
import { getDeviceByPublicKey } from '@/utils/getDeviceByPublicKey';
import { Box, Heading, ProductIcon, Stack, Text } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import fingerprint from '@/assets/images/fingerprint.svg';
import {
  arrayParameterValue,
  objectParameterValue,
  urlWithSearchParams,
} from '@/utils/searchParameters';
import { getTranslations } from '@/utils/shared/getTranslationBundle';
import {
  filterAcceptorCapabilities,
  filterGranterCapabilities,
} from '@/utils/shared/smartContractMeta';
import type { ICommandPayload } from '@kadena/types';
import { Capability } from '../Capability/Capability';
import { container, goBack, step, wrapper } from './Sign.css';

interface Props {
  transaction: string;
  returnUrl: string;
  optimistic?: boolean;
  meta?: string;
  translations?: string;
  useHash: boolean;
}

export default function Sign(props: Props) {
  const {
    transaction,
    returnUrl,
    optimistic = true,
    meta,
    translations,
    useHash,
  } = props;
  const [autoRedirect, setAutoRedirect] = useState<boolean>(true);
  const [redirectLocation, setRedirectLocation] = useState<string>('');
  const router = useRouter();
  const { accounts } = useAccounts();

  const data = transaction
    ? Buffer.from(transaction, 'base64').toString()
    : null;
  const [tx, setTx] = useState<any>(JSON.parse(data ?? '{}'));

  const metaDataString = meta ? Buffer.from(meta, 'base64').toString() : null;
  const metaData = metaDataString ? JSON.parse(metaDataString) : [];

  const translationsDataString = translations
    ? Buffer.from(translations, 'base64').toString()
    : null;
  const translationsData = getTranslations(
    translationsDataString ? JSON.parse(translationsDataString) : {},
  );
  const { sign } = useSign();

  const txData: ICommandPayload = JSON.parse(tx.cmd || '{}');

  const publicKeys: string[] = txData.signers.map(
    (s: { pubKey: string }) => s.pubKey,
  );

  const pubkeysForTx = publicKeys.filter((key) =>
    accounts.some((account) =>
      account.devices.some((device) => device.guard.keys.includes(key)),
    ),
  );
  // Find capabilities applicable to the current transaction for accounts found
  const signers = txData.signers
    .filter((signer: { pubKey: string }) =>
      pubkeysForTx.includes(signer.pubKey),
    )
    .map((signer) => ({
      signer,
      account: accounts.find((account) =>
        account.devices.some((device) =>
          device.guard.keys.includes(signer.pubKey),
        ),
      ),
    }))
    .filter((signer) => !!signer.account && !!signer.signer)
    .map(({ signer, account }) => {
      const granterCapabilities = signer.clist?.filter(
        filterGranterCapabilities({
          account: account!,
          meta: metaData,
        }),
      );
      const acceptorCapabilities = signer.clist?.filter(
        filterAcceptorCapabilities({
          account: account!,
          meta: metaData,
        }),
      );
      return {
        signer,
        account,
        granterCapabilities,
        acceptorCapabilities,
      };
    });

  const devices = pubkeysForTx.map((publicKey) =>
    getDeviceByPublicKey(accounts, publicKey),
  );
  const pendingRegistrationTxs = devices
    .map((device) => device?.pendingRegistrationTx)
    .filter(Boolean);

  const isReadyToSubmit =
    (!optimistic && !pendingRegistrationTxs.length) || optimistic;

  const [signaturesToSign, setSignaturesToSign] = useState<number>(
    devices.length,
  );

  useEffect(() => {
    if (isReadyToSubmit && redirectLocation && autoRedirect) {
      router.push(redirectLocation);
    }
  }, [redirectLocation, isReadyToSubmit, router, returnUrl, autoRedirect]);

  const onSign = async (deviceIndex: number) => {
    const signedTx = await sign(tx, devices?.[deviceIndex]?.['credential-id']!);

    setTx(signedTx);
    const newAmountOfSigsToSign = signaturesToSign - 1;
    setSignaturesToSign(newAmountOfSigsToSign);

    // No more available signers in this wallet (we don't use `tx` here since setTx is async)
    if (newAmountOfSigsToSign === 0) {
      const params = { transaction: '', pendingTxIds: '[]' };
      params.transaction = objectParameterValue(signedTx);

      if (optimistic && pendingRegistrationTxs) {
        params.pendingTxIds = arrayParameterValue(pendingRegistrationTxs);
      }

      setTimeout(() => {
        setRedirectLocation(urlWithSearchParams(returnUrl, params, useHash));
      }, 2000);
    }
  };

  const onAutoRedirectChange = () => {
    setAutoRedirect(!autoRedirect);
  };

  const signerGranterCapabilities = signers.flatMap(
    (signer) => signer.granterCapabilities,
  );

  const signerAcceptorCapabilities = signers.flatMap(
    (signer) => signer.acceptorCapabilities,
  );

  return (
    <>
      <Stack flexDirection="column" gap="md" alignItems="center" margin="xl">
        <Stack gap="sm" alignItems="center">
          <ProductIcon.ManageKda size="lg" />
          <Heading variant="h5">Preview and sign transaction</Heading>
        </Stack>
        <Stack gap="md" flexDirection="column">
          {!!signerAcceptorCapabilities.length && (
            <Surface>
              <Heading variant="h4">Accepting capabilities</Heading>
              <Stack gap="sm" flexDirection="column" marginBlockStart="md">
                {signerAcceptorCapabilities.map(
                  (capability) =>
                    !!capability && (
                      <Capability
                        key={capability.name + capability.args.join(',')}
                        capability={capability}
                        translations={translationsData}
                        metaData={metaData}
                        type="acceptor"
                      />
                    ),
                )}
              </Stack>
            </Surface>
          )}
          {!!signerGranterCapabilities.length && (
            <Surface>
              <Heading variant="h4">Granting capabilities</Heading>
              <Stack gap="sm" flexDirection="column" marginBlockStart="md">
                {signerGranterCapabilities.map(
                  (capability) =>
                    !!capability && (
                      <Capability
                        key={capability?.name + capability?.args.join(',')}
                        capability={capability}
                        translations={translationsData}
                        metaData={metaData}
                        type="granter"
                      />
                    ),
                )}
              </Stack>
            </Surface>
          )}
        </Stack>
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
                        <Image
                          src={fingerprint}
                          alt="fingerprint icon"
                          width={40}
                          height={40}
                        />
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
                      <Text className={goBack}>
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
        <Box width="100%">
          <Text variant="body">
            <details>
              <summary>View raw transaction</summary>
              <pre>{JSON.stringify({ ...tx, cmd: txData }, null, 2)}</pre>
            </details>
          </Text>
        </Box>
      </Stack>
    </>
  );
}
