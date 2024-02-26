import { ICap } from '@kadena/client';
import { Heading, Stack } from '@kadena/react-ui';
import { FC } from 'react';

interface Props {
  cap: ICap;
}

export const GenericTemplate: FC<Props> = ({ cap }) => {
  return (
    <Stack>
      <Heading as="h6">{cap.name}</Heading>

      {cap.args.map((arg) => (
        <Stack>
          <span>{typeof arg === 'string' ? arg : JSON.stringify(arg)}</span>
        </Stack>
      ))}
    </Stack>
  );
};
