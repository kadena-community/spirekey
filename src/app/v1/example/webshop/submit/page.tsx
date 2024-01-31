'use client';

import { SubmitResult } from '@/components/SubmitResult';
import { useSubmit } from '@/hooks/useSubmit';
import {
  Box,
  Button,
  ContentHeader,
  Heading,
  Stack,
  SystemIcon,
  Text,
} from '@kadena/react-ui';

type SearchParams = {
  searchParams: {
    payload: string;
  };
};
export default function Submit({ searchParams }: SearchParams) {
  const { doSubmit, result, preview, status, SubmitStatus, tx } =
    useSubmit(searchParams);

  if (!tx) return null;

  const sender = JSON.parse(tx.cmd).meta.sender;

  const txCosts = preview?.events
    ?.filter((m: any) => m.module.name === 'coin' && m.name === 'TRANSFER')
    .reduce((s: number, a: any) => s + a.params[2], 0);
  return (
    <Stack flexDirection="column" gap="md" alignItems="center" margin="xl">
      <ContentHeader
        heading="Submit Transaction"
        description="Your transaction will be submitted to the network."
        icon="Earth"
      />

      <Stack flexDirection="column">
        {status !== SubmitStatus.SUCCESS && (
          <Stack flexDirection="column" gap="md">
            <Stack flexDirection="column" gap="sm">
              <Heading variant="h6">Estimated transaction costs:</Heading>
              <Text>{!preview?.gas ? 'Loading...' : `${txCosts} KDA`}</Text>
              <Heading variant="h6">Paid by:</Heading>
              <Text>{sender}</Text>
            </Stack>

            <Stack
              flexDirection="row"
              alignItems="center"
              gap="sm"
              marginBlockEnd="md"
            >
              <SystemIcon.CheckDecagramOutline color="#4bb543" />
              <Text>Transaction can be submitted</Text>
            </Stack>

            <Button
              onClick={doSubmit}
              isDisabled={status === SubmitStatus.IDLE}
            >
              {status === SubmitStatus.LOADING
                ? 'Loading...'
                : 'Submit transaction'}
            </Button>
          </Stack>
        )}{' '}
        {status === SubmitStatus.ERROR && (
          <>
            <Stack flexDirection="row" alignItems="center" gap="sm">
              <SystemIcon.Close color="#ff0000" />
              <Text>Transaction can not be submitted</Text>
            </Stack>
            <Box marginBlockStart="md">
              <Text as="code">
                <pre>{result}</pre>
              </Text>
            </Box>
          </>
        )}
        <Box marginBlockStart="lg">
          <SubmitResult result={result} status={status} />
        </Box>
      </Stack>
    </Stack>
  );
}
