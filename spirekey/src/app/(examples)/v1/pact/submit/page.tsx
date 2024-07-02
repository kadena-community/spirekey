'use client';

import { MonoCheckCircle, MonoClose, MonoFlight } from '@kadena/kode-icons';
import {
  Box,
  Button,
  ContentHeader,
  Heading,
  Stack,
  Text,
} from '@kadena/kode-ui';

import { SubmitResult } from '@/components/shared/SubmitResult';
import { usePreview } from '@/hooks/shared/usePreview';
import { useSubmit } from '@/hooks/shared/useSubmit';

type SearchParams = {
  searchParams: {
    transaction: string;
    response: string;
  };
};

export default function Submit({ searchParams }: SearchParams) {
  const { doSubmit, result, status, SubmitStatus } = useSubmit(searchParams);
  const {
    isSuccessful: isPreviewSuccesfull,
    error,
    estimatedGas,
    isLoading: estimatedGasIsLoading,
    gasPayer,
  } = usePreview(searchParams);

  return (
    <Stack flexDirection="column" gap="md" alignItems="center" margin="xl">
      <ContentHeader
        heading="Submit Transaction"
        description="Your transaction will be submitted to the network."
        icon={<MonoFlight />}
      />

      <Stack flexDirection="column">
        {isPreviewSuccesfull === true && (
          <Stack flexDirection="column" gap="md">
            <Stack flexDirection="column" gap="sm">
              <Heading variant="h6">Estimated transaction costs:</Heading>
              <Text>
                {estimatedGasIsLoading ? 'Loading...' : `${estimatedGas} KDA`}
              </Text>
              <Heading variant="h6">Paid by:</Heading>
              <Text>{gasPayer}</Text>
            </Stack>

            <Stack
              flexDirection="row"
              alignItems="center"
              gap="sm"
              marginBlockEnd="md"
            >
              <MonoCheckCircle color="#4bb543" />
              <Text>Transaction can be submitted</Text>
            </Stack>

            <Button
              onClick={doSubmit}
              isDisabled={status !== SubmitStatus.IDLE}
            >
              {status === SubmitStatus.LOADING
                ? 'Loading...'
                : 'Submit transaction'}
            </Button>
          </Stack>
        )}

        {isPreviewSuccesfull === false && (
          <>
            <Stack flexDirection="row" alignItems="center" gap="sm">
              <MonoClose color="#ff0000" />
              <Text>Transaction can not be submitted</Text>
            </Stack>
            <Box marginBlockStart="md">
              <Text as="code">
                <pre>{error}</pre>
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
