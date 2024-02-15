'use client';

import { Button } from '@/components/Button/Button';
import { Box, TextField } from '@kadena/react-ui';
import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const FORM_DEFAULTS = {
  amount: 0,
};
type FormValues = typeof FORM_DEFAULTS;

export default function ReceivePage() {
  const params = useParams();
  const { getValues, handleSubmit, register } = useForm({
    defaultValues: FORM_DEFAULTS,
    reValidateMode: 'onBlur',
  });
  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };
  return (
    <Box margin={'lg'}>
      <h1>Receive</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="amount"
          type="number"
          label="Amount"
          {...register('amount')}
        />
        <Button type="submit">Receive</Button>
      </form>
    </Box>
  );
}
