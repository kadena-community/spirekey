import { useLocalState } from '@/hooks/useLocalState';
import {
  CardContainer,
  CardContentBlock,
} from '@/steps/CardPattern/CardPattern';
import {
  Accordion,
  AccordionItem,
  maskValue,
  ProductIcon,
  Stack,
  TextareaField,
} from '@kadena/kode-ui';
import { ExampleStepper } from './ExampleStepper';

export const ResultStep = ({ result }: { result: string }) => {
  const [amount] = useLocalState('amount', '0.0');
  const [receiver] = useLocalState('receiver', '');
  return (
    <CardContainer>
      <CardContentBlock
        visual={<ProductIcon.QuickStart size="xl" />}
        title="Step 5: Result"
        description={
          <>
            <p>
              You have succesfully transfered {amount} KDA to{' '}
              {maskValue(receiver)}
            </p>
            <ExampleStepper step={4} />
          </>
        }
      >
        <Stack flexDirection="column" gap="md">
          <Accordion>
            <AccordionItem title="View details">
              <TextareaField label="details" value={result} rows={20} />
            </AccordionItem>
          </Accordion>
        </Stack>
      </CardContentBlock>
    </CardContainer>
  );
};
