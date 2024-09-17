import {
  base64URLStringToBuffer,
  bufferToBase64URLString,
  startRegistration,
} from '@simplewebauthn/browser';
import {
  AuthenticatorTransportFuture,
  RegistrationResponseJSON,
} from '@simplewebauthn/types';
import * as asn1js from 'asn1js';
import cbor from 'cbor';
import elliptic from 'elliptic';

const getPublicKey = async (res: RegistrationResponseJSON) => {
  const { authData } = cbor.decode(
    base64URLStringToBuffer(res.response.attestationObject),
  );

  const dataView = new DataView(new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  idLenBytes.forEach((value: number, index: number) =>
    dataView.setUint8(index, value),
  );
  const credentialIdLength = dataView.getUint16(0);
  const publicKeyBytes = authData.slice(55 + credentialIdLength);

  return Buffer.from(publicKeyBytes).toString('hex');
};

export const getDeviceType = (transports?: AuthenticatorTransportFuture[]) => {
  if (transports?.includes('hybrid')) return 'phone';
  if (transports?.includes('internal')) return 'desktop';
  return 'security-key';
};

function extractPublicKeyHex(arrayBuffer: ArrayBuffer) {
  // Convert ArrayBuffer to Uint8Array
  const uint8Array = new Uint8Array(arrayBuffer);

  // Parse the DER-encoded SubjectPublicKeyInfo
  const asn1 = asn1js.fromBER(uint8Array.buffer);
  if (asn1.offset === -1) {
    throw new Error('Error parsing ASN.1 structure');
  }

  // SubjectPublicKeyInfo structure
  const subjectPublicKeyInfo = asn1.result;

  // Extract the subjectPublicKey field (bit string)
  const subjectPublicKey = (subjectPublicKeyInfo.valueBlock as any).value[1];
  const publicKeyBytes = subjectPublicKey.valueBlock.valueHex;

  const rawPubKeyHex = Buffer.from(publicKeyBytes).toString('hex');

  const ec = new elliptic.ec('p256');
  const key = ec.keyFromPublic(rawPubKeyHex, 'hex');

  return key.getPublic().encode('hex', false);
}
const getAaguid = (authData?: string) => {
  if (!authData) return null;
  const hex = Buffer.from(
    Uint8Array.from(Buffer.from(authData, 'base64')).slice(37, 37 + 16),
  ).toString('hex');
  const segments: string[] = [
    hex.slice(0, 8), // 8
    hex.slice(8, 12), // 4
    hex.slice(12, 16), // 4
    hex.slice(16, 20), // 4
    hex.slice(20, 32), // 8
  ];
  return segments.join('-');
};

export const getNewWebauthnKey = async (displayName: string) => {
  const res = await startRegistration({
    challenge: bufferToBase64URLString(Buffer.from('some-random-string')),
    rp: {
      name: 'Kadena Spirekey',
      id: window.location.hostname,
    },
    pubKeyCredParams: [
      {
        alg: -7,
        type: 'public-key',
      },
    ],
    authenticatorSelection: {
      requireResidentKey: true,
      userVerification: 'preferred',
    },
    attestation: 'direct',
    user: {
      id: displayName + Date.now(),
      displayName: displayName,
      name: displayName,
    },
    timeout: 60000,
  });
  if (!res.response.publicKey)
    throw new Error('No public key returned from webauthn');

  const aaguid = getAaguid(res.response.authenticatorData);
  return {
    credentialId: res.id,
    publicKey: await getPublicKey(res),
    hex: extractPublicKeyHex(base64URLStringToBuffer(res.response.publicKey)),
    deviceType: aaguid || getDeviceType(res.response.transports),
  };
};
