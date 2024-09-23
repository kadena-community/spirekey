import { MonoCopyAll } from '@kadena/kode-icons/system';
import {
  Button,
  maskValue,
  ProductIcon,
  Stack,
  TextField,
} from '@kadena/kode-ui';
import { CardContentBlock, CardFixedContainer } from '@kadena/kode-ui/patterns';
import { atoms } from '@kadena/kode-ui/styles';
import { useState } from 'react';

export const ResultStep = ({ result }: { result: string }) => {
  const [showDetails, setShowDetails] = useState(false);
  const tx = JSON.parse(result);
  return (
    <CardFixedContainer>
      <CardContentBlock
        visual={<ProductIcon.QuickStart size="xl" />}
        title="Step 5: Result"
        description="You have successfully transferred KDA to another account, without the need to manually manage the concept of multiple chains."
      >
        <Stack flexDirection="column" gap="md">
          <TextField
            isReadOnly
            value={tx.reqKey}
            label="Request Key"
            endAddon={
              <Button
                variant="transparent"
                onPress={() => navigator.clipboard.writeText(tx.reqKey)}
              >
                <Stack as="span" flexDirection="row" gap="xs">
                  Copy
                  <MonoCopyAll />
                </Stack>
              </Button>
            }
          />
          <TextField isReadOnly label="Status" value={tx.result.status} />
          <Button
            variant="outlined"
            onPress={() => setShowDetails(!showDetails)}
            className={atoms({ marginInlineStart: 'auto' })}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </Stack>
      </CardContentBlock>
      {showDetails &&
        tx.events
          .sort((a: any, b: any) => b.params[2] - a.params[2])
          .map(({ params }: any) => {
            const isGasEvent = params[2] < 0.1;
            return (
              <CardContentBlock
                title={isGasEvent ? 'Gas Fees' : 'Transfer Amount'}
                key={params[2]}
                description={
                  isGasEvent
                    ? `You have paid ${params[2]} on gas fees for this transaction`
                    : `You have successfully transferred ${params[2]} KDA to ${maskValue(params[1])}`
                }
              >
                <Stack flexDirection="column" gap="md">
                  <TextField label="Receiver" isReadOnly value={params[1]} />
                  <TextField label="Amount" isReadOnly value={params[2]} />
                </Stack>
              </CardContentBlock>
            );
          })}
    </CardFixedContainer>
  );
};
