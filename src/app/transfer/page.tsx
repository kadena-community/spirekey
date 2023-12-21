"use client";

import { NetworkSelector } from "@/components/NetworkSelector";
import { useNetwork } from "@/context/NetworkContext";
import { useAccounts } from "@/hooks/useAccounts";
import { useSign } from "@/hooks/useSign";
import { useSubmit } from "@/hooks/useSubmit";
import { transfer } from "@/utils/transfer";
import {
  Button,
  Card,
  ContentHeader,
  Grid,
  GridItem,
  Stack,
  TextField,
} from "@kadena/react-ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const FORM_DEFAULTS = {
  amount: "0",
  receiver: "",
};

type Props = {
  searchParams: {
    payload: string;
    response: string;
  };
};
export default function Page({ searchParams }: Props) {
  const { sign } = useSign(process.env.WALLET_URL!);
  const { activeAccount, activeDevice } = useAccounts();
  const { network } = useNetwork();
  const { getValues, register } = useForm({
    defaultValues: FORM_DEFAULTS,
    reValidateMode: "onBlur",
  });
  const onSign = async () => {
    const amount = getValues("amount");
    const receiver = getValues("receiver");
    if (!activeAccount) throw new Error("No active account");
    if (!activeDevice) throw new Error("No active device");
    if (!amount || !receiver) throw new Error("Invalid form");
    const tx = await transfer({
      amount: parseFloat(amount),
      sender: activeAccount.account,
      receiver: receiver,
      namespace: process.env.NAMESPACE!,
      networkId: network,
      publicKey: activeDevice.guard.keys[0],
    });
    sign(tx, activeDevice, "/transfer");
  };
  const { doSubmit, result, status } = useSubmit(searchParams);
  useEffect(() => {
    if (!searchParams) return;
    doSubmit();
  }, [searchParams]);
  return (
    <Stack direction="column" gap="$md" margin="$md">
      <NetworkSelector />
      <Card fullWidth>
        <Stack direction="column" gap="$md" margin="$md">
          <ContentHeader
            heading="Transfer"
            description="Send KDA to another account"
            icon="BadgeAccount"
          />
          <Grid
            columns={{
              xs: 3,
            }}
            gap="$xs"
          >
            <GridItem columnSpan={2}>
              <TextField
                label="to"
                inputProps={{
                  id: "receiver",
                  type: "text",
                  ...register("receiver"),
                }}
              />
            </GridItem>
            <GridItem>
              <TextField
                label="amount"
                inputProps={{
                  id: "amount",
                  type: "number",
                  step: "0.001",
                  min: "0",
                  ...register("amount"),
                }}
              />
            </GridItem>
          </Grid>
          <Button onClick={onSign}>Send</Button>
        </Stack>
      </Card>
    </Stack>
  );
}
