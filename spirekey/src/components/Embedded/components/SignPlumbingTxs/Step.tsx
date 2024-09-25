import { Permissions } from '@/components/Permissions/Permissions';
import { MonoCAccount } from '@kadena/kode-icons/system';
import {
  Accordion,
  AccordionItem,
  ContentHeader,
  Stack,
} from '@kadena/kode-ui';
import { ICap, IUnsignedCommand } from '@kadena/types';
import { FC } from 'react';

interface IProps {
  title: string;
  caps: Map<string, ICap[]>;
  tx: IUnsignedCommand;
}

export const Step: FC<IProps> = ({ title, caps, tx }) => {
  return (
    <Stack flexDirection="column" gap="sm" marginBlock="md" key={tx.hash}>
      <ContentHeader heading={title} icon={<MonoCAccount />} />
      {[...caps.entries()].map(([module, capabilities]) => (
        <Accordion
          key={module + capabilities.map((c) => JSON.stringify(c)).join(',')}
        >
          <AccordionItem title={`Details: ${title}`}>
            <Permissions
              module={module}
              capabilities={capabilities}
              key={module}
            />
          </AccordionItem>
        </Accordion>
      ))}
    </Stack>
  );
};
