"use client";

import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Heading,
  ProductIcon,
  Select,
  Stack,
  Text,
  Tooltip,
  SystemIcon,
} from "@kadena/react-ui";
import { startAuthentication } from "@simplewebauthn/browser";
import { useRouter } from "next/navigation";
import { ICap } from "@kadena/client";

type SignProps = {
  searchParams: {
    payload: string;
    returnUrl: string;
    cid: string;
  };
};

/* valueLabels to be used to explain cmd.code */
const capTranslations: Record<string, any> = {
  "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet.TRANSFER": {
    default: {
      title: "Transfer",
      description: "Transfer {{2}} KDA from {{0}} to {{1}}",
      valueLabels: ["From", "To", "Amount"],
    },
    en: {
      title: "Transfer",
      description: "Transfer {{2}} KDA from {{0}} to {{1}}",
      valueLabels: ["From", "To", "Amount"],
    },
    nl: {
      title: "Transfer",
      description: "Transfer {{2}} KDA van {{0}} naar {{1}}",
      valueLabels: ["Van", "Naar", "Hoeveelheid"],
    },
  },
};

const getDescription = (key: string, args: any, language: string) => {
  const translation =
    capTranslations?.[key]?.[language] || capTranslations[key]?.default;

  if (!translation) return;

  return {
    title: translation.title,
    description: translation.description.replace(
      /\{\{(\w+)\}\}/g,
      (match: string, index: string) => args[parseInt(index, 10)] || match
    ),
  };
};

const getArgValue = (x: any) => (x?.decimal ? x.decimal : x?.int ? x.int : x);

const getLabels = (signers: any[], language: string) =>
  signers.flatMap((signer) =>
    Array.isArray(signer.clist)
      ? signer.clist
          .filter(
            (c: ICap) =>
              c.name !== "coin.GAS" &&
              !c.name.includes("webauthn-wallet.GAS_PAYER")
          )
          .flatMap((c: ICap) => {
            const { title, description } =
              getDescription(c.name, c.args, language) || {};
            const valuesString = c.args.map(getArgValue).join(", ");

            return [
              title
                ? {
                    raw: c,
                    label: title,
                    description,
                    valueString: valuesString,
                  }
                : { raw: c, label: c.name, values: valuesString },
            ];
          })
      : []
  );

export default function Sign(req: SignProps) {
  const { payload, returnUrl, cid } = req.searchParams;
  const router = useRouter();
  const data = payload ? Buffer.from(payload, "base64").toString() : null;
  const tx = JSON.parse(data ?? "{}");
  const txData = JSON.parse(tx.cmd || "{}");

  const [language, setLanguage] = useState("en");

  const sign = useCallback(async () => {
    const res = await startAuthentication({
      challenge: tx.hash,
      rpId: window.location.hostname,
      allowCredentials: cid ? [{ id: cid, type: "public-key" }] : undefined,
    });
    router.push(
      `${returnUrl}?payload=${payload}&response=${Buffer.from(
        JSON.stringify(res)
      ).toString("base64")}`
    );
  }, [data, router, startAuthentication]);

  return (
    <Stack direction="column" gap="$md" alignItems="center" margin="$xl">
      <h1>Wallet</h1>

      <Stack gap="$sm" alignItems="center">
        <ProductIcon.ManageKda size="lg" />
        <Heading variant="h5">Preview and sign transaction</Heading>
      </Stack>

      <Heading variant="h5">Transaction details</Heading>

      <Select
        id="lanuage"
        ariaLabel="Chain ID"
        onChange={(evt) => setLanguage(evt.currentTarget.value)}
      >
        <option value="">Select language</option>
        <option value="en">English</option>
        <option value="nl">Nederlands</option>
      </Select>

      {getLabels(txData.signers, language).map((x) => (
        <div key={x.label}>
          <Heading variant="h6">{x.label}</Heading>
          <Stack alignItems="center">
            <Text>{x.description ?? "No description available"}</Text>
            {!x.description && (
              <Tooltip
                content="The owner of this smart contract hasn't provided a description for
              this type of transaction yet."
              >
                <SystemIcon.AlertCircleOutline size="sm" />
              </Tooltip>
            )}
          </Stack>
          <Box marginTop="$sm">
            <Text size="md">
              <details>
                <summary>View raw capability</summary>
                <Text bold size="md">
                  Capability:
                </Text>{" "}
                {x.raw.name}
                <br />
                <Text bold size="md">
                  Values:
                </Text>{" "}
                {x.raw.values}
              </details>
            </Text>
          </Box>
        </div>
      ))}

      <Button onClick={sign}>Sign</Button>
    </Stack>
  );
}
