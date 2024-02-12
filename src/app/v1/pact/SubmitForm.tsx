'use client';

import { useReturnUrl } from '@/hooks/useReturnUrl';
import { Box, Button, Stack, Text } from '@kadena/react-ui';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { PreviewFormValues } from './PreviewForm';

type PreviewFormProps = {
  values: PreviewFormValues;
  onCancel: () => void;
};

export const SubmitForm: FC<PreviewFormProps> = ({ values, onCancel }) => {
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();

  const onSign = async () => {
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${values.payload}&returnUrl=${getReturnUrl('/pact/submit')}`,
    );
  };

  return (
    <div>
      <Stack
        flexDirection="row"
        margin="md"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box marginInlineEnd="md">pact module file</Box>
        {values.file?.item(0)?.name}
      </Stack>
      <Stack
        flexDirection="row"
        margin="md"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box marginInlineEnd="md">module data json</Box>
        <textarea
          id="contractData"
          style={{
            width: '100%',
            minHeight: '120px',
            resize: 'vertical',
          }}
          defaultValue={values.contractData}
        />
      </Stack>
      <Stack
        flexDirection="row"
        margin="md"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box marginInlineEnd="md">Chain ID</Box>
        {values.chainId}
      </Stack>
      <Stack
        flexDirection="row"
        margin="md"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box marginInlineEnd="md">Network ID</Box>
        {values.networkdId}
      </Stack>
      <Stack
        flexDirection="row"
        margin="md"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box marginInlineEnd="md">Public Key</Box>
        {values.publicKey}
      </Stack>
      <Stack flexDirection="column" margin="md" justifyContent="flex-start">
        <Text as="code">{values.result}</Text>
      </Stack>
      <Stack flexDirection="row" margin="md" justifyContent="flex-start">
        <Button onPress={onSign}>Sign</Button>
        <Button onPress={onCancel}>Back</Button>
      </Stack>
    </div>
  );
};
