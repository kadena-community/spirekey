import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  Select,
  InputWrapper,
  Card,
} from "@kadena/react-ui";
import { Controller, useForm } from "react-hook-form";
import { l1Client } from "../utils/client";
import { FC, useEffect } from "react";
import {
  parseContractData,
  readFile,
  uploadModuleTransaction,
  validateJson,
} from "./pact.utils";
import { createTransaction } from "@kadena/client";
import { asyncPipe } from "../utils/asyncPipe";
import { getAccount } from "../utils/account";

const FORM_DEFAULT = {
  chainId: "14",
  networkdId: "fast-development",
  code: "",
  file: null as FileList | null,
  contractData: JSON.stringify({}),
  publicKey: "",
  publicKeyList: [],
  alias: "",
  capabilities: "",
  senderAccount: "",
  result: "",
  payload: "",
  cid: "",
};
export type PreviewFormValues = typeof FORM_DEFAULT;

type PreviewFormProps = {
  defaults?: PreviewFormValues | null;
  onSubmit: (data: PreviewFormValues) => void;
};

export const PreviewForm: FC<PreviewFormProps> = ({
  defaults,
  onSubmit: onSubmitForm,
}) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    setError,
    formState,
    control,
  } = useForm({
    defaultValues: defaults ?? FORM_DEFAULT,
    reValidateMode: "onBlur",
  });

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const content = await readFile(event.target.files?.item(0));
      const reads = parseContractData(content);
      const data = JSON.parse(getValues("contractData"));
      reads.forEach((value) => {
        if (!data[value.key]) data[value.key] = value.default;
      });
      setValue("contractData", JSON.stringify(data, null, 2));
      setValue("code", content);
    } catch (error) {
      // do nothing
    }
  };

  const onAliasChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, devices } = await getAccount(event.target.value);
      setValue("publicKey", devices[0]["credential-pubkey"]);
      setValue(
        "publicKeyList",
        devices.map((d: any) => d["credential-pubkey"])
      );
      setValue("senderAccount", name);
      setValue("cid", devices[0]["credential-id"]);
    } catch (error) {
      console.error(error);
    }
  };

  const onCodeChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    try {
      const reads = parseContractData(event.target.value);
      const data = JSON.parse(getValues("contractData"));
      reads.forEach((value) => {
        if (!data[value.key]) data[value.key] = value.default;
      });
      setValue("contractData", JSON.stringify(data, null, 2));
    } catch (error) {
      //do nothing
    }
  };

  const formatContractData = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    try {
      const json = JSON.parse(value);
      setValue("contractData", JSON.stringify(json, null, 2));
    } catch (error) {
      // do nothing
    }
  };

  const onSubmit = async (data: PreviewFormValues) => {
    const pk = data.publicKey;

    if (!pk) return console.log("keypair not found");

    const result = await asyncPipe(
      uploadModuleTransaction({
        moduleFile: data.code,
        data: JSON.parse(data.contractData),
        chainId: data.chainId,
        networkdId: data.networkdId,
        publicKey: pk,
        senderAccount: data.senderAccount,
        capabilities: data.capabilities
          .replace(/\r/g, "")
          .split(/\n/g)
          .filter(Boolean),
      }),
      createTransaction,
      (tx) => {
        data.payload = Buffer.from(JSON.stringify(tx)).toString("base64");
        return tx;
      },
      (tx) =>
        l1Client.local(tx, { preflight: false, signatureVerification: false })
    )({});

    const error = ((result as any)?.result?.error?.message as string) || null;
    const success = result?.result?.status === "success";
    if (error || !success) {
      setError("root", { message: error ?? "Something went wrong" });
      return;
    }

    // Store data to be able to submit the transaction without changes
    onSubmitForm({
      ...data,
      payload: data.payload,
      result: JSON.stringify(result, null, 2),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box margin="$md">
        <Card>
          <InputWrapper htmlFor="publicKey" label="Chain ID">
            <Controller
              control={control}
              name="chainId"
              rules={{ required: true }}
              render={({ field }) => (
                <Select id="select-chain-id" ariaLabel="Chain ID" {...field}>
                  {Array.from({ length: 20 }, (_, i) => i).map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Select>
              )}
            />
          </InputWrapper>
          <InputWrapper htmlFor="networkdId" label="Network ID">
            <Controller
              control={control}
              name="networkdId"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  id="select-network-id"
                  ariaLabel="Network ID"
                  {...field}
                >
                  {["fast-development", "testnet04", "mainnet01"].map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Select>
              )}
            />
          </InputWrapper>
          <InputWrapper htmlFor="publicKey" label="Public Key">
            <Controller
              control={control}
              name="publicKey"
              defaultValue={getValues("publicKeyList")[0]}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  id="select-public-key"
                  ariaLabel="Public Key"
                  {...field}
                >
                  {getValues("publicKeyList").map((key: string) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </Select>
              )}
            />
          </InputWrapper>
          <InputWrapper htmlFor="alias" label="alias">
            <Input
              id="alias"
              {...register("alias", {
                onBlur: onAliasChange,
              })}
            />
          </InputWrapper>
          <InputWrapper htmlFor="senderAccount" label="sender">
            <Input id="senderAccount" {...register("senderAccount")} />
          </InputWrapper>
          <InputWrapper htmlFor="file" label="pact module file">
            <Input
              id="file"
              type="file"
              {...register("file", {
                onChange: onChangeFile,
              })}
            />
          </InputWrapper>
        </Card>
        <InputWrapper htmlFor="code" label="pact code">
          <textarea
            id="code"
            style={{
              width: "100%",
              minHeight: "120px",
              resize: "vertical",
              border: formState.touchedFields.code
                ? formState.errors.code
                  ? "1px solid #d52020"
                  : "1px solid #38ac38"
                : "1px solid #cccccc",
            }}
            {...register("code", {
              onChange: onCodeChange,
            })}
          />
        </InputWrapper>
        <InputWrapper htmlFor="contractData" label="module data json">
          <textarea
            id="contractData"
            style={{
              width: "100%",
              minHeight: "120px",
              resize: "vertical",
              border: formState.touchedFields.contractData
                ? formState.errors.contractData
                  ? "1px solid #d52020"
                  : "1px solid #38ac38"
                : "1px solid #cccccc",
            }}
            {...register("contractData", {
              onBlur: formatContractData,
              validate: validateJson,
            })}
          />
        </InputWrapper>
        <InputWrapper htmlFor="capabilities" label="Capabilities">
          <textarea
            id="capabilities"
            style={{
              width: "100%",
              minHeight: "120px",
              resize: "vertical",
              border: formState.touchedFields.capabilities
                ? formState.errors.capabilities
                  ? "1px solid #d52020"
                  : "1px solid #38ac38"
                : "1px solid #cccccc",
            }}
            {...register("capabilities")}
          />
        </InputWrapper>
      </Box>

      <Stack direction="column" margin="$md" justifyContent="flex-start">
        {formState.errors.root && (
          <div style={{ marginBottom: "0.5rem" }}>
            <b>Error: </b>
            <Text>{formState.errors.root.message}</Text>
          </div>
        )}
      </Stack>
      <Stack direction="row" margin="$md" justifyContent="flex-start">
        <Button type="submit">Preview</Button>
      </Stack>
    </form>
  );
};
