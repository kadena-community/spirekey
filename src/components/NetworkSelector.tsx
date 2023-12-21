import { useNetwork } from '@/context/NetworkContext';
import { SelectField } from '@kadena/react-ui';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const NetworkSelector = () => {
  const { network, setNetwork } = useNetwork();
  const { getValues, setValue, register } = useForm({
    defaultValues: {
      network,
    },
    reValidateMode: 'onBlur',
  });

  const onNetworkChange = () => setNetwork(getValues('network'));

  useEffect(() => {
    setValue('network', network);
  }, [network]);

  return (
    <SelectField
      label="Network"
      selectProps={{
        id: 'network',
        ariaLabel: 'Network',
        ...register('network', {
          onChange: onNetworkChange,
          value: network,
        }),
      }}
    >
      <option value="testnet04">Testnet04</option>
      <option value="fast-development">Fast Development</option>
    </SelectField>
  );
};
