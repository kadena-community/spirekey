'use client';

import { Button } from '@/components/Button/Button';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink';
import { usePubkeys } from '@/hooks/usePubkeys';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { asyncPipe } from '@/utils/asyncPipe';
import { l1Client } from '@/utils/client';
import { decodeAccount } from '@/utils/decodeAccount';
import { createTransaction } from '@kadena/client';
import {
  Card,
  Select,
  Stack,
  Text,
  TextField,
  TextareaField,
  TrackerCard,
} from '@kadena/react-ui';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  parseContractData,
  readFile,
  uploadModuleTransaction,
  validateJson,
} from './pact.utils';

const FORM_DEFAULT = {
  chainId: '14',
  networkdId: process.env.NETWORK_ID || 'fast-development',
  code: '',
  file: null as FileList | null,
  contractData: JSON.stringify({}),
  publicKey: '',
  publicKeyList: [],
  alias: '',
  capabilities: '',
  senderAccount: '',
  result: '',
  payload: '',
  cid: '',
};
export type PreviewFormValues = typeof FORM_DEFAULT;

// somehow get and store public keys and cred-ids

type PreviewFormProps = {
  defaults?: PreviewFormValues | null;
  onSubmit: (data: PreviewFormValues) => void;
  searchParams: {
    response: string;
  };
};

export const PreviewForm: FC<PreviewFormProps> = ({
  defaults,
  onSubmit: onSubmitForm,
  searchParams,
}) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    setError,
    formState,
    control,
  } = useForm({
    defaultValues: defaults ?? FORM_DEFAULT,
    reValidateMode: 'onBlur',
  });

  const { response } = searchParams;
  const account = decodeAccount(response);
  const { getReturnUrl } = useReturnUrl();

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const content = await readFile(event.target.files?.item(0));
      const reads = parseContractData(content);
      const data = JSON.parse(getValues('contractData'));
      reads.forEach((value) => {
        if (!data[value.key]) data[value.key] = value.default;
      });
      setValue('contractData', JSON.stringify(data, null, 2));
      setValue('code', content);
    } catch (error) {
      // do nothing
    }
  };

  const { pubkeys, addPubkey } = usePubkeys();

  useEffect(() => {
    if (!account) return;
    setValue('publicKey', account.publicKey);
    setValue('senderAccount', account.accountName);
    setValue('cid', account.cid);
    addPubkey({ pubkey: account.publicKey, cid: account.cid });
  }, [account?.cid, account?.accountName, account?.publicKey]);

  const onCodeChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    try {
      const reads = parseContractData(event.target.value);
      const data = JSON.parse(getValues('contractData'));
      reads.forEach((value) => {
        if (!data[value.key]) data[value.key] = value.default;
      });
      setValue('contractData', JSON.stringify(data, null, 2));
    } catch (error) {
      //do nothing
    }
  };

  const onPublicKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pubkey = event.target.value;
    const pk = pubkeys.find((pk) => pk.pubkey === pubkey);
    if (!pk) return;
    setValue('publicKey', pk.pubkey);
    setValue('cid', pk.cid);
  };

  const formatContractData = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    try {
      const json = JSON.parse(value);
      setValue('contractData', JSON.stringify(json, null, 2));
    } catch (error) {
      // do nothing
    }
  };

  const onSubmit = async (data: PreviewFormValues) => {
    const pk = data.publicKey;

    if (!pk) return console.log('keypair not found');

    const result = await asyncPipe(
      uploadModuleTransaction({
        moduleFile: data.code,
        data: JSON.parse(data.contractData),
        chainId: data.chainId,
        networkdId: data.networkdId,
        publicKey: pk,
        senderAccount: data.senderAccount,
        capabilities: data.capabilities
          .replace(/\r/g, '')
          .split(/\n/g)
          .filter(Boolean),
      }),
      createTransaction,
      (tx) => {
        data.payload = Buffer.from(JSON.stringify(tx)).toString('base64');
        return { ...tx, sigs: [] };
      },
      (tx) =>
        l1Client.local(tx, { preflight: false, signatureVerification: false }),
    )({});

    const error = ((result as any)?.result?.error?.message as string) || null;
    const success = result?.result?.status === 'success';
    if (error || !success) {
      setError('root', { message: error ?? 'Something went wrong' });
      return;
    }

    // Store data to be able to submit the transaction without changes
    onSubmitForm({
      ...data,
      payload: data.payload,
      result: JSON.stringify(result, null, 2),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ButtonLink
        href={`${process.env.WALLET_URL}/login?returnUrl=${getReturnUrl(
          '/pact',
        )}`}
      >
        Select account
      </ButtonLink>
      {account && (
        <TrackerCard
          icon="ManageKda"
          labelValues={[
            {
              label: 'Account',
              value: account.accountName,
              isAccount: true,
            },
            {
              label: 'Display Name',
              value: account.displayName,
            },
            {
              label: 'Device',
              value: account.cid,
            },
            {
              label: 'Public key',
              value: account.publicKey,
            },
          ]}
          helperText="This is the account you will use to login."
        />
      )}
      <Card fullWidth>
        <Controller
          control={control}
          name="publicKey"
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              id="public-key"
              label="Public Key"
              {...field}
              {...register('publicKey', {
                onChange: onPublicKeyChange,
              })}
            >
              {pubkeys.map(({ pubkey, cid }) => (
                <option key={cid} value={pubkey}>
                  {pubkey}
                </option>
              ))}
            </Select>
          )}
        />
        <TextField
          id="senderAccount"
          type="text"
          {...register('senderAccount')}
        />
        <Controller
          control={control}
          name="chainId"
          rules={{ required: true }}
          render={({ field }) => (
            <Select id="select-chain-id" label="Chain ID" {...field}>
              {Array.from({ length: 20 }, (_, i) => i).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </Select>
          )}
        />
        <Controller
          control={control}
          name="networkdId"
          rules={{ required: true }}
          render={({ field }) => (
            <Select id="select-network-id" label="Network ID" {...field}>
              {['fast-development', 'testnet04', 'mainnet01'].map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </Select>
          )}
        />
        <TextField
          id="file"
          type="file"
          {...register('file', {
            onChange: onChangeFile,
          })}
        />
      </Card>
      <Stack margin="md" flexDirection="column">
        <TextareaField
          id="code"
          // @ts-expect-error style is not supported by react-ui
          style={{
            width: '100%',
            minHeight: '120px',
            resize: 'vertical',
            border: formState.touchedFields.code
              ? formState.errors.code
                ? '1px solid #d52020'
                : '1px solid #38ac38'
              : '1px solid #cccccc',
          }}
          {...register('code', {
            onChange: onCodeChange,
          })}
        />
        <TextareaField
          id="contractData"
          label="module data json"
          // @ts-expect-error style is not supported by react-ui
          style={{
            width: '100%',
            minHeight: '120px',
            resize: 'vertical',
            border: formState.touchedFields.contractData
              ? formState.errors.contractData
                ? '1px solid #d52020'
                : '1px solid #38ac38'
              : '1px solid #cccccc',
          }}
          {...register('contractData', {
            onBlur: formatContractData,
            validate: validateJson,
          })}
        />
        <TextareaField
          id="capabilities"
          label="Capabilities"
          // @ts-expect-error style is not supported by react-ui
          style={{
            width: '100%',
            minHeight: '120px',
            resize: 'vertical',
            border: formState.touchedFields.capabilities
              ? formState.errors.capabilities
                ? '1px solid #d52020'
                : '1px solid #38ac38'
              : '1px solid #cccccc',
          }}
          {...register('capabilities')}
        />
      </Stack>
      <Stack flexDirection="column" margin="md" justifyContent="flex-start">
        {formState.errors.root && (
          <div style={{ marginBottom: '0.5rem' }}>
            <b>Error: </b>
            <Text>{formState.errors.root.message}</Text>
          </div>
        )}
      </Stack>
      <Stack flexDirection="row" margin="md" justifyContent="flex-start">
        <Button type="submit">Preview</Button>
      </Stack>
    </form>
  );
};
