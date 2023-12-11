"use client";

import { getSig } from "@/app/utils/getSig";
import { createTransaction } from "@kadena/client";
import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from "@kadena/client/fp";
import {
  Button,
  FormFieldWrapper,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Text,
  TrackerCard,
} from "@kadena/react-ui";
import { startAuthentication } from "@simplewebauthn/browser";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { readFile } from "../pact/pact.utils";
import { asyncPipe } from "../utils/asyncPipe";
import { l1Client } from "../utils/client";
import { signWithKeyPair } from "../utils/signSubmitListen";

type Profile = {
  host: string;
  networkId: string;
  chains: string[];
};

type Profiles = {
  [key: string]: Profile;
};

type Step = {
  code?: string;
  codeFile?: string;
  data?: { [key: string]: any };
  profile: string;
  caps?: (string | number)[][];
  sender: string;
  cid?: string;
  pubKey?: string;
};

type OrchestrationData = {
  profiles: Profiles;
  steps: Step[];
  signers: {
    [key: string]: {
      publicKey: string;
      secretKey: string;
    };
  };
};

type PactContracts = {
  [key: string]: string;
};

export default function DeployPage() {
  const [orchestrationData, setOrchestrationData] =
    useState<OrchestrationData | null>(null);
  const [contracts, setContracts] = useState<PactContracts | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const { setTheme } = useTheme();
  const { register, setValue } = useForm({
    defaultValues: {
      orchestrationFile: "",
      orchestrationData: null as OrchestrationData | null,
      pactFiles: "",
      pactContracts: {} as PactContracts,
    },
    reValidateMode: "onBlur",
  });
  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files) return;
      const content = await readFile(event.target.files?.item(0));
      const data = JSON.parse(content);
      setValue("orchestrationData", data);
      if (data.contracts) setContracts(data.contracts);
      setOrchestrationData(data);
    } catch (error) {
      console.error("could not parse file", error);
    }
  };
  const onChangePactFiles = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (!event.target.files) return;
      const files = await Array.from(event.target.files).reduce(
        async (allFiles, file) => ({
          ...(await allFiles),
          [file.name]: await readFile(file),
        }),
        {} as any
      );
      const newContracts = { ...contracts, ...files };
      setValue("pactContracts", newContracts);
      setContracts(newContracts);
    } catch (error) {
      console.error("could add pact file", error);
    }
  };
  const onSave = async () => {
    const data = { ...orchestrationData, contracts };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    window.open(URL.createObjectURL(blob));
  };
  const onDeploy = async () => {
    if (!orchestrationData) return;
    for (const step of orchestrationData.steps) {
      const signer = orchestrationData.signers[step.sender];
      const pubKey = step.pubKey || signer?.publicKey || "";
      const tx = await asyncPipe(
        composePactCommand(
          execution(getCode(contracts, step.code, step.codeFile)),
          setMeta({
            chainId: "14",
            gasLimit: 100000,
            senderAccount: step.sender, // c:account
          }),
          setNetworkId(orchestrationData.profiles[step.profile].networkId), // fast-development
          (cmd) => {
            cmd.payload.exec.data = step.data;
            return cmd;
          }, // add data
          addSigner(
            // @ts-expect-error WebAuthn is not yet added to the @kadena/client types
            {
              pubKey,
              scheme: !step.cid ? "ED25519" : "WebAuthn",
            },
            Array.isArray(step.caps)
              ? (withCap) =>
                  (step.caps as any).map((cap: string[]) => {
                    const [name, ...args] = cap;
                    return withCap(
                      name,
                      ...args.map((resValue: any) => {
                        if (isNaN(resValue)) return resValue;
                        if (resValue.includes(".")) return Number(resValue);
                        return { int: Number(resValue) };
                      })
                    );
                  })
              : undefined
          )
        ),
        createTransaction,
        !step.cid
          ? signWithKeyPair({
              publicKey: orchestrationData.signers[step.sender].publicKey,
              secretKey: orchestrationData.signers[step.sender].secretKey,
            })
          : async (tx) => {
              const res = await startAuthentication({
                challenge: tx.hash,
                rpId: window.location.hostname,
                allowCredentials: step.cid
                  ? [{ id: step.cid, type: "public-key" }]
                  : undefined,
              });
              tx.sigs = [tx.sigs[0], getSig(res.response)];
              return tx;
            },
        (tx) => {
          setResults((results) => [...results, tx]);
          return tx;
        },
        l1Client.submit,
        l1Client.listen
      )({});
      setResults((results) => {
        console.log("hello", results);
        console.log("write", results.slice(0, results.length - 1));
        return [...results.slice(0, results.length - 1), tx];
      });
    }
  };
  useEffect(() => {
    setTheme("dark");
  }, []);
  return (
    <Stack direction="column">
      <Heading>Deploy</Heading>
      <FormFieldWrapper htmlFor="file" label="orchestrationFile">
        <Input
          id="orchestrationFile"
          type="file"
          {...register("orchestrationFile", {
            onChange: onChangeFile,
          })}
        />
      </FormFieldWrapper>
      <FormFieldWrapper htmlFor="pactFiles" label="pact module file">
        <Input
          id="pactFiles"
          type="file"
          multiple
          {...register("pactFiles", {
            onChange: onChangePactFiles,
          })}
        />
      </FormFieldWrapper>
      <Profiles profiles={orchestrationData?.profiles} />
      {orchestrationData?.steps && <Button onClick={onDeploy}>Deploy</Button>}
      <DeploySteps
        steps={orchestrationData?.steps}
        contracts={contracts}
        results={results}
      />
      <Button variant="alternative" onClick={onSave}>
        Save
      </Button>
      <Button onClick={onDeploy}>Deploy</Button>
    </Stack>
  );
}

const Profiles = ({ profiles }: { profiles?: Profiles }) => {
  if (!profiles) return null;
  return (
    <>
      {Object.entries(profiles).map(([name, profile]) => {
        return (
          <TrackerCard
            key={name}
            icon="PactLanguage"
            labelValues={[
              {
                label: "Profile",
                value: name,
              },
              {
                label: "Host",
                value: profile.host,
              },
              {
                label: "Network ID",
                value: profile.networkId,
              },
              {
                label: "Chains",
                value: profile.chains.join(", "),
              },
            ]}
          />
        );
      })}
    </>
  );
};

const getCode = (
  contracts: PactContracts | null,
  code?: string,
  codeFile?: string
) => {
  if (code) return code;
  if (!codeFile) return "no code or code file";
  if (!contracts) return `code file ${codeFile} not found`;
  return contracts[codeFile] || `code file ${codeFile} not found`;
};

const DeploySteps = ({
  steps,
  contracts,
  results,
}: {
  steps?: Step[];
  contracts: PactContracts | null;
  results: any[];
}) => {
  if (!steps) return null;
  return (
    <>
      {steps.map((step, index) => (
        <Grid
          key={step.profile + index}
          columns={{
            xs: 1,
            md: 2,
          }}
        >
          <GridItem>
            <TrackerCard
              icon="PactLanguage"
              labelValues={[
                {
                  label: "Profile",
                  value: step.profile,
                },
                {
                  label: "Sender",
                  value: step.sender,
                },
                {
                  label: "Code",
                  value: getCode(contracts, step.code, step.codeFile),
                },
                {
                  label: "Data",
                  value: JSON.stringify(step.data) || "No data",
                },
                {
                  label: "Caps",
                  value: JSON.stringify(step.caps) || "unrestricted",
                },
              ]}
            />
          </GridItem>
          <GridItem>
            <Stack margin="$md">
              {!results[index] && <Text>Ready for deployment</Text>}
              {results[index] && (
                <Text variant="code">
                  {JSON.stringify(results[index], null, 2)}
                </Text>
              )}
            </Stack>
          </GridItem>
        </Grid>
      ))}
    </>
  );
};
