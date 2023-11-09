"use client";

import { useCallback } from "react";
import { Button, Stack, Text, TrackerCard } from "@kadena/react-ui";
import { startAuthentication } from "@simplewebauthn/browser";
import { useRouter } from "next/navigation";

type WalletProps = {
  searchParams: {
    payload: string;
    returnUrl: string;
    cid: string;
  };
};

const getLabels = (signers: any[]) => {
  return signers.flatMap((signer) => {
    if (!Array.isArray(signer.clist)) return [];
    return signer.clist
      .flatMap((c: any) => [
        {
          label: "Capability",
          value: c.name,
        },
        {
          label: "Values",
          value: c.args
            .map((x: any) => {
              console.log(x);
              if (x?.decimal) return x.decimal;
              if (x?.int) return x.int;
              return x;
            })
            .join(", "),
        },
      ])
      .filter((x: any) => x.value);
  });
};

export default function Wallet(req: WalletProps) {
  const { payload, returnUrl, cid } = req.searchParams;
  const router = useRouter();
  const data = payload ? Buffer.from(payload, "base64").toString() : null;
  const tx = JSON.parse(data ?? "{}");
  const txData = JSON.parse(tx.cmd || "{}");
  const txPretty = JSON.stringify(txData.signers, null, 2);
  const sign = useCallback(async () => {
    const res = await startAuthentication({
      challenge: tx.hash,
      rpId: "localhost",
      allowCredentials: cid ? [{ id: cid, type: "public-key" }] : undefined,
    });
    router.push(
      `${returnUrl}?payload=${payload}&response=${Buffer.from(
        JSON.stringify(res)
      ).toString("base64")}`
    );
  }, [data, router, startAuthentication]);
  return (
    <Stack direction="column" gap="$md" alignItems="center" margin="$xl">
      <h1>Wallet</h1>
      <TrackerCard
        icon="ManageKda"
        labelValues={[
          {
            label: "Website",
            value: new URL(returnUrl).hostname,
          },
          ...getLabels(txData.signers),
        ]}
      />
      <Button onClick={sign}>Sign</Button>
    </Stack>
  );
}
