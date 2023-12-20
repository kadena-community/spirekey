import {
  base64URLStringToBuffer,
  bufferToBase64URLString,
  startRegistration,
} from "@simplewebauthn/browser";
import { RegistrationResponseJSON } from "@simplewebauthn/typescript-types";
import cbor from "cbor";

const getPublicKey = async (res: RegistrationResponseJSON) => {
  const { authData } = cbor.decode(
    base64URLStringToBuffer(res.response.attestationObject)
  );

  const dataView = new DataView(new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  idLenBytes.forEach((value: number, index: number) =>
    dataView.setUint8(index, value)
  );
  const credentialIdLength = dataView.getUint16(0);
  const publicKeyBytes = authData.slice(55 + credentialIdLength);

  return Buffer.from(publicKeyBytes).toString("hex");
};

export const getNewWebauthnKey = async (displayName: string) => {
  const res = await startRegistration({
    challenge: bufferToBase64URLString(Buffer.from("some-random-string")),
    rp: {
      name: "Kadena WebAuthN Wallet",
      id: window.location.hostname,
    },
    pubKeyCredParams: [
      {
        alg: -7,
        type: "public-key",
      },
    ],
    authenticatorSelection: {
      requireResidentKey: true,
      userVerification: "preferred",
    },
    attestation: "direct",
    user: {
      id: displayName + Date.now(),
      displayName: displayName,
      name: displayName,
    },
    timeout: 60000,
  });
  if (!res.response.publicKey)
    throw new Error("No public key returned from webauthn");

  return {
    credentialId: res.id,
    publicKey: await getPublicKey(res),
  };
};
