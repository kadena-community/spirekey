"use client";

import { useCallback } from "react";
import { Button, Stack, Text } from "@kadena/react-ui";
import { startAuthentication } from "@simplewebauthn/browser";
import { useRouter } from "next/navigation";

type WalletProps = {
  searchParams: {
    payload: string;
    returnUrl: string;
    cid: string;
  };
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
    <Stack direction="column" margin="$3">
      <h1>Wallet</h1>
      <Text variant="code" as="code">
        {txPretty}
      </Text>
      <Button onClick={sign}>Sign</Button>
    </Stack>
  );
}
