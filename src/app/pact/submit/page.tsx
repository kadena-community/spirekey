"use client";

import { l1Client } from "@/app/utils/client";
import { ContentHeader, Stack, Text, TrackerCard } from "@kadena/react-ui";
import { base64URLStringToBuffer } from "@simplewebauthn/browser";
import { useEffect, useState } from "react";

type SearchParams = {
  searchParams: {
    payload: string;
    response: string;
  };
};
export default function Submit({ searchParams }: SearchParams) {
  const { payload, response } = searchParams;
  const [result, setResult] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!payload || !response) return;
    const p = JSON.parse(Buffer.from(payload, "base64").toString());
    const r = JSON.parse(Buffer.from(response, "base64").toString());
    const tx = {
      ...p,
      sigs: process.env.WEBAUTHN_MOCK
        ? p.sigs
        : [
            {
              sig: JSON.stringify({
                signature: Buffer.from(
                  base64URLStringToBuffer(r.response.signature)
                ).toString("base64"),
                authenticatorData: Buffer.from(
                  base64URLStringToBuffer(r.response.authenticatorData)
                ).toString("base64"),
                clientDataJSON: Buffer.from(
                  base64URLStringToBuffer(r.response.clientDataJSON)
                ).toString("base64"),
              }),
            },
            ...p.sigs,
          ].filter(Boolean),
    };
    l1Client
      .local(tx)
      .then(async (res) => {
        if (res.result.status !== "success") {
          debugger;
          console.error(res);
          setResult(res);
          throw new Error("Transaction failed");
        }
        const txRes = await l1Client.submit(tx);
        const result = await l1Client.listen(txRes);
        setResult(result);
      })
      .catch((err) => {
        console.log(err);
        setResult({
          status: "Could not submit transaction",
          data: err.toString(),
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
      )}
    </Stack>
  );
}
