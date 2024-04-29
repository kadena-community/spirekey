import { l1Client } from '@/utils/shared/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  transaction: string;
};

export enum SubmitStatus {
  IDLE = 'idle',
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
  SUBMITABLE = 'submitable',
  INCOMPLETE = 'incomplete',
}

export const useSubmit = ({ transaction }: Props) => {
  const [result, setResult] = useState<any>({});
  const [status, setStatus] = useState(SubmitStatus.IDLE);
  const [tx, setTx] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const txSearchParams = useSearchParams();

  useEffect(() => {
    const txParam = txSearchParams.get('transaction') as string;

    if (!transaction && !txParam) return;
    const tx = JSON.parse(
      Buffer.from(transaction || txParam, 'base64').toString(),
    );
    setTx(tx);
    if (tx.sigs.filter((x: any) => x === null).length)
      return setStatus(SubmitStatus.INCOMPLETE);
    l1Client.local(tx).then((res) => {
      setPreview(res);
      setStatus(SubmitStatus.SUBMITABLE);
    });
  }, [transaction]);

  const doSubmit = async () => {
    if (!tx) return;

    setStatus(SubmitStatus.LOADING);

    try {
      const txRes = await l1Client.submit(tx);
      const result = await l1Client.listen(txRes);

      setStatus(SubmitStatus.SUCCESS);
      setResult(result);
      return result;
    } catch (err: any) {
      console.log(err);
      setStatus(SubmitStatus.ERROR);
      setResult({
        status: 'Could not submit transaction',
        data: err.toString(),
      });
    }
  };

  return {
    doSubmit,
    tx,
    preview,
    result,
    status,
    SubmitStatus,
  };
};
