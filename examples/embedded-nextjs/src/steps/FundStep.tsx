import { CardContainer, CardContentBlock, CardFooter } from "@/steps/CardPattern/CardPattern";
import { fundAccount } from "@/utils/fund";
import { Button, NumberField, ProductIcon, Stack } from "@kadena/kode-ui";
import { Account } from "@kadena/spirekey-sdk";
import { useState } from "react";
import { ExampleStepper } from "./ExampleStepper";

export const FundStep = ({
  setAccount,
  account,
}: {
  setAccount: (account: Account) => void;
  account: Account;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<number>(5);
  const onFund = async () => {
    try {
      setIsLoading(true);
      const tx = await fundAccount(account);
      if (tx.result.status !== 'success') throw tx;
      setAccount({ ...account, balance: amount.toFixed(8) });
    } catch (e) {
      console.warn('Could not fund', e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <CardContainer hasPadding>
      <CardContentBlock
        visual={<ProductIcon.QuickStart size="xl" />}
        title="Step 2: Fund your account"
        description={
          <>
            <p>
              Your account has no funds. In the real world you would be funding
              your account through a dex or other providers. In this example we
              will fund your account using a faucet simulating an onramp.
            </p>
            <ExampleStepper step={1} />
          </>
        }
      >
        <Stack flexDirection="column" gap="md">
          <NumberField
            value={amount}
            minValue={0}
            maxValue={20}
            step={0.1}
            onValueChange={setAmount}
            label="amount"
          />
        </Stack>
      </CardContentBlock>
      <CardFooter>
        <Button isLoading={isLoading} onPress={onFund} isCompact={false}>
          Fund
        </Button>
      </CardFooter>
    </CardContainer>
  );
};


