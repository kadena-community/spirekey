"use client";

import { usePreview } from "@/hooks/usePreview";
import { useSubmit } from "@/hooks/useSubmit";
import {
  Box,
  Button,
  ContentHeader,
  Heading,
  Stack,
  Text,
  SystemIcon,
} from "@kadena/react-ui";
import { SubmitResult } from "@/app/components/SubmitResult";

type SearchParams = {
  searchParams: {
    payload: string;
    response: string;
  };
};
export default function Submit({ searchParams }: SearchParams) {
  const { doSubmit, result, status, SubmitStatus } = useSubmit(searchParams);
  const {
    isSuccessful,
    error,
    estimatedGas,
    isLoading: estimatedGasIsLoading,
    gasPayer,
  } = usePreview(searchParams);

  return (
    <Stack direction="column" gap="$md" alignItems="center" margin="$xl">
      <ContentHeader
        heading="Submit Transaction"
        description="Your transaction will be submitted to the network."
        icon="Earth"
      />

      <Stack direction="column">
        {isSuccessful === true && (
          <Stack direction="column" gap="$md">
            <Stack direction="column" gap="$sm">
              <Heading variant="h6">Estimated transaction costs:</Heading>
              <Text>
                {estimatedGasIsLoading ? "Loading..." : `${estimatedGas} KDA`}
              </Text>
              <Heading variant="h6">Paid by:</Heading>
              <Text>{gasPayer}</Text>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              gap="$3"
              marginBottom="$md"
            >
              <SystemIcon.CheckDecagramOutline color="#4bb543" />
              <Text>Transaction can be submitted</Text>
            </Stack>

            <Button onClick={doSubmit} disabled={status !== SubmitStatus.IDLE}>
              {status === SubmitStatus.LOADING
                ? "Loading..."
                : "Submit transaction"}
            </Button>
          </Stack>
        )}{" "}
        {isSuccessful === false && (
          <>
            <Stack direction="row" alignItems="center" gap="$3">
              <SystemIcon.Close color="#ff0000" />
              <Text>Transaction can not be submitted</Text>
            </Stack>
            <Box marginTop="$md">
              <Text font="mono">
                <pre>{error}</pre>
              </Text>
            </Box>
          </>
        )}
        <Box marginTop="$lg">
          <SubmitResult result={result} status={status} />
        </Box>
      </Stack>
    </Stack>
  );
}
