"use client";

import { useReturnUrl } from "@/hooks/useReturnUrl";
import { Box, Button, Stack, Text } from "@kadena/react-ui";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { PreviewFormValues } from "./PreviewForm";

type PreviewFormProps = {
  values: PreviewFormValues;
  onCancel: () => void;
};

export const SubmitForm: FC<PreviewFormProps> = ({ values, onCancel }) => {
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();

  const onSign = async () => {
    router.push(
      `${process.env.WALLET_URL}/sign?payload=${values.payload}&cid=${
        values.cid
      }&returnUrl=${getReturnUrl("/pact/submit")}`
    );
  };

  return (
    <div>
      <Stack
        direction="row"
        margin="$md"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box marginRight="$2">pact module file</Box>
        {values.file?.item(0)?.name}
      </Stack>
      <Stack
        direction="row"
        margin="$md"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box marginRight="$2">module data json</Box>
        <textarea
          id="contractData"
          style={{
            width: "100%",
            minHeight: "120px",
            resize: "vertical",
          }}
          defaultValue={values.contractData}
        />
      </Stack>
      <Stack
        direction="row"
        margin="$md"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box marginRight="$2">Chain ID</Box>
        {values.chainId}
      </Stack>
      <Stack
        direction="row"
        margin="$md"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box marginRight="$2">Network ID</Box>
        {values.networkdId}
      </Stack>
      <Stack
        direction="row"
        margin="$md"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box marginRight="$2">Public Key</Box>
        {values.publicKey}
      </Stack>
      <Stack direction="column" margin="$md" justifyContent="flex-start">
        <Text as="code" variant="code">
          {values.result}
        </Text>
      </Stack>
      <Stack direction="row" margin="$md" justifyContent="flex-start">
        <Button onClick={onSign}>Sign</Button>
        <Button onClick={onCancel}>Back</Button>
      </Stack>
    </div>
  );
};
