import { l1Client } from '@/utils/client';
import { getSig } from '@/utils/getSig';
import { useEffect, useState } from 'react';

type Props = {
  payload: string;
  response: string;
};

export enum SubmitStatus {
  IDLE = 'idle',
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
  SUBMITABLE = 'submitable',
}

export const useSubmit = ({ payload, response }: Props) => {
  const [result, setResult] = useState<any>({});
  const [status, setStatus] = useState(SubmitStatus.IDLE);
  const [tx, setTx] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);

  useEffect(() => {
    if (!payload || !response) return;
    const p = JSON.parse(Buffer.from(payload, 'base64').toString());
    const r = JSON.parse(Buffer.from(response, 'base64').toString());
    const tx = {
      ...p,
      // @TODO: this needs to map the signature to the correct index within the signatures array
      sigs: [getSig(r.response), ...p.sigs].filter(Boolean),
    };
    setTx(tx);
    l1Client.local(tx).then((res) => {
      setPreview(res);
      setStatus(SubmitStatus.SUBMITABLE);
    });
  }, [payload, response]);

  const doSubmit = async () => {
    if (!payload || !response) return;

    setStatus(SubmitStatus.LOADING);

    const p = JSON.parse(Buffer.from(payload, 'base64').toString());
    const r = JSON.parse(Buffer.from(response, 'base64').toString());
    const tx = {
      ...p,
      // @TODO: this needs to map the signature to the correct index within the signatures array
      sigs: [getSig(r.response), ...p.sigs].filter(Boolean),
    };
    try {
      const txRes = await l1Client.submit(tx);
      const result = await l1Client.listen(txRes);

      setStatus(SubmitStatus.SUCCESS);
      setResult(result);
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
