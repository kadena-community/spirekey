'use client';

// import { transfer } from '@/utils/transfer';
import { Button, TextField } from '@kadena/react-ui';
import React from 'react';
import { useForm } from 'react-hook-form';

const FORM_DEFAULTS = {
  to: '',
  amount: 0,
};
type FormValues = typeof FORM_DEFAULTS;

type SendPageProps = {
  account:string;
  cid: string;
};
export default function SendPage({ cid }: SendPageProps) {
  const { getValues, handleSubmit, register } = useForm({
    defaultValues: FORM_DEFAULTS,
    reValidateMode: 'onBlur',
  });
  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Send</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField id="to" label="To" {...register('to')} />
        <TextField
          id="amount"
          type="number"
          label="Amount"
          {...register('amount')}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
