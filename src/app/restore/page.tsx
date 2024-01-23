'use client';

import { Heading, TextField } from "@kadena/react-ui";
import { Button } from "react-aria-components";
import { useForm } from "react-hook-form";

const FORM_DEFAULT = {
  account: '',
};

export default function Restore() {
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: FORM_DEFAULT,
    reValidateMode: 'onBlur',
  });

  const onSubmit = async () => {
    const { account } = getValues();
    if (!account) throw new Error('Account is required');
    console.log(account);
  };

  return (<>
    <Heading>Restore</Heading>
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Account"
        {...{
          id: 'account',
          ...register('account', { required: true }),
        }}
        info="The c:account you want to restore"
        helperText="The c:account you want to restore"
      />
      <Button type="submit">Restore</Button>
    </form>
  </>);
}