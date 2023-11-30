"use client";

import { getSig } from "@/app/utils/getSig";
import { useGasEstimate } from "@/hooks/useGasEstimate";
import { useSubmit } from "@/hooks/useSubmit";
import {
  Button,
  ContentHeader,
  Heading,
  Stack,
  Text,
  TrackerCard,
} from "@kadena/react-ui";

type SearchParams = {
  searchParams: {
    payload: string;
    response: string;
  };
};
export default function Submit({ searchParams }: SearchParams) {
  const { doSubmit, result, status, SubmitStatus } = useSubmit(searchParams);
  const {
    estimatedGas,
    isLoading: estimatedGasIsLoading,
    gasPayer,
  } = useGasEstimate(searchParams);

  return (
    <Stack direction="column" gap="$md" alignItems="center" margin="$xl">
      <ContentHeader
        heading="Submit Transaction"
        description="Your transaction will be submitted to the network."
        icon="Earth"
      />

      <Heading variant="h5">Transaction costs</Heading>
      <Stack direction="column">
        <Heading variant="h6">Estimated transaction costs:</Heading>
        <Text>
          {estimatedGasIsLoading ? "Loading..." : `${estimatedGas} KDA`}
        </Text>
        <Heading variant="h6">Paid by:</Heading>
        <Text>{gasPayer}</Text>
      </Stack>

      <Button onClick={doSubmit} disabled={status !== SubmitStatus.IDLE}>
        {status === SubmitStatus.LOADING ? "Loading..." : "Submit transaction"}
      </Button>

      {status === SubmitStatus.ERROR ||
        (status === SubmitStatus.SUCCESS && (
          <TrackerCard
            icon="Chainweb"
            labelValues={[
              {
                label: "Status",
                value: result?.result?.status || "Failed",
              },
              {
                label: "Data",
                value:
                  JSON.stringify(result?.result?.data, null, 2) ||
                  "Something went wrong...",
              },
            ]}
          />
        ))}
    </Stack>
  );
}
