"use client";

import { useSubmit } from "@/hooks/useSubmit";
import { ContentHeader, Stack, Text, TrackerCard } from "@kadena/react-ui";

type SearchParams = {
  searchParams: {
    payload: string;
    response: string;
  };
};
export default function Submit({ searchParams }: SearchParams) {
  const { result, isLoading } = useSubmit(searchParams);

  return (
    <Stack direction="column" gap="$md" alignItems="center" margin="$xl">
      <ContentHeader
        heading="Submitting Transaction"
        description="Your transaction is being submitted to the network."
        icon="Earth"
      />
      {isLoading ? (
        <Text variant="p">Loading...</Text>
      ) : (
        <TrackerCard
          icon="Concepts"
          labelValues={[
            {
              label: "Status",
              value: result?.result?.status || "Failed",
            },
            {
              label: "Thank you for your purchase!",
              value: `Your cookie is on the way!`,
            },
          ]}
        />
      )}
    </Stack>
  );
}
