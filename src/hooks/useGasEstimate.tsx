import { l1Client } from "@/app/utils/client";
import { getSig } from "@/app/utils/getSig";
import { ICommand } from "@kadena/client";
import { PactNumber } from "@kadena/pactjs";
import { useEffect, useState } from "react";

type Props = {
  payload: string;
  response: string;
};

export const useGasEstimate = ({ payload, response }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [estimatedGas, setEstimatedGas] = useState<number>();

  const p = JSON.parse(Buffer.from(payload, "base64").toString());
  const r = JSON.parse(Buffer.from(response, "base64").toString());
  const tx = {
    ...p,
    // @TODO: this needs to map the signature to the correct index within the signatures array
    sigs: [getSig(r.response), ...p.sigs].filter(Boolean),
  };

  const parsedCmd = JSON.parse(tx.cmd);

  const gasPayer = parsedCmd.meta.sender;
  useEffect(() => {
    const calculateGas = async () => {
      setIsLoading(true);
      const result = await l1Client.local(tx, {
        signatureVerification: false,
      });

      if (result.gas) {
        setEstimatedGas(
          new PactNumber(result.gas).times(parsedCmd.meta.gasPrice).toNumber()
        );
        setIsLoading(false);
      }
    };

    calculateGas();
  }, [tx]);

  return { estimatedGas, isLoading, gasPayer };
};
