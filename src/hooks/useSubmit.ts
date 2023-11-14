import { l1Client } from "@/app/utils/client";
import { base64URLStringToBuffer } from "@simplewebauthn/browser";
import { useEffect, useState } from "react";

type SearchParams = {
  payload: string;
  response: string;
};

export const useSubmit = (searchParams: SearchParams) => {
  const { payload, response } = searchParams;
  const [result, setResult] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!payload || !response) return;
    const p = JSON.parse(Buffer.from(payload, "base64").toString());
    const r = JSON.parse(Buffer.from(response, "base64").toString());
    const tx = {
      ...p,
      // @TODO: this needs to map the signature to the correct index within the signatures array
      sigs: [
        {
          sig: Buffer.from(
            base64URLStringToBuffer(r.response.signature)
          ).toString("base64"),
          authenticatorData: Buffer.from(
            base64URLStringToBuffer(r.response.authenticatorData)
          ).toString("base64"),
          clientDataJSON: Buffer.from(
            base64URLStringToBuffer(r.response.clientDataJSON)
          ).toString("base64"),
        },
        ...p.sigs,
      ].filter(Boolean),
    };
    l1Client
      .local(tx)
      .then(async (res) => {
        if (res.result.status !== "success") {
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
  }, [payload, response]);

  return {
    result,
    isLoading,
  };
};
