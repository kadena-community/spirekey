import { Heading } from '@kadena/react-ui';
import { useFormContext } from 'react-hook-form';

export const Fingerprint = () => {
  const { register } = useFormContext();

  return (
    <div>
      <Heading>Fingerprint</Heading>

      <input type="text" {...register('fingerprint')} />
    </div>
  );
};
