import { base64URLStringToBuffer } from "@simplewebauthn/browser";

type SignResponse = {
  signature: string;
  authenticatorData: string;
  clientDataJSON: string;
};

export const getSig = (response: SignResponse) => {
  const signature = Buffer.from(
    base64URLStringToBuffer(response.signature)
  ).toString("base64");
  const authenticatorData = Buffer.from(
    base64URLStringToBuffer(response.authenticatorData)
  ).toString("base64");
  const clientDataJSON = Buffer.from(
    base64URLStringToBuffer(response.clientDataJSON)
  ).toString("base64");
  if (process.env.STRING_SIG)
    return {
      sig: JSON.stringify({
        signature,
        authenticatorData,
        clientDataJSON,
      }),
    };
  return { sig: signature, authenticatorData, clientDataJSON };
};
