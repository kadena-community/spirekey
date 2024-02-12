import { l1Client } from '@/utils/client';
import { getSig } from '@/utils/getSig';
import { PactNumber } from '@kadena/pactjs';
import { useEffect, useState } from 'react';

type Props = {
  transaction: string;
  response: string;
};

export const usePreview = ({ transaction, response }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [estimatedGas, setEstimatedGas] = useState<number>();
  const [isSuccessful, setSuccessful] = useState<boolean>();
  const [error, setError] = useState<string>();

  const p = JSON.parse(Buffer.from(transaction, 'base64').toString());
  const r = JSON.parse(Buffer.from(response, 'base64').toString());
  const tx = {
    ...p,
    // @TODO: this needs to map the signature to the correct index within the signatures array
    sigs: [getSig(r.response), ...p.sigs].filter(Boolean),
  };
  const parsedCmd = JSON.parse(tx.cmd);
  const gasPayer = parsedCmd.meta.sender;

  const stringifiedTx = JSON.stringify(tx);

  useEffect(() => {
    const tx = JSON.parse(stringifiedTx);
    const doLocal = async () => {
      setIsLoading(true);
      try {
        const result = await l1Client.local(tx);

        if (result.gas) {
          setEstimatedGas(
            new PactNumber(result.gas)
              .times(parsedCmd.meta.gasPrice)
              .toNumber(),
          );
        }
        setSuccessful(true);
      } catch (e: any) {
        setSuccessful(false);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    doLocal();
  }, [stringifiedTx]);

  return { isSuccessful, error, estimatedGas, isLoading, gasPayer };
};
