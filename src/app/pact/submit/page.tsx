"use client";

import { l1Client } from "@/app/utils/client";
import { Text } from "@kadena/react-ui";
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
  const [result, setResult] = useState<string>("");
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
          setResult(JSON.stringify(res, null, 2));
          throw new Error("Transaction failed");
        }
        const txRes = await l1Client.submit(tx);
        const result = await l1Client.listen(txRes);
        setResult(JSON.stringify(result, null, 2));
      })
      .catch((err) => {
        console.log(err);
        setResult(err.toString());
      });
  }, []);

  return (
    <Text as="code" variant="code">
      {result}
    </Text>
  );
}
