import { getRootkeyPasskeyName } from '@/utils/getNetworkDisplayName';
import { registerCredentialOnChain } from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { ApolloClient, gql } from '@apollo/client';
import {
  kadenaDecrypt,
  kadenaEncrypt,
  kadenaGenKeypairFromSeed,
} from '@kadena/hd-wallet';
import { ChainId } from '@kadena/types';
import {
  base64URLStringToBuffer,
  startAuthentication,
} from '@simplewebauthn/browser';
import elliptic from 'elliptic';

type WalletsVariable = {
  networkId: string;
  chainId: ChainId;
};
type ApolloContext = {
  client: ApolloClient<any>;
};
export const createWallet = async (
  _: any,
  { networkId, chainId }: WalletsVariable,
) => {
  const { credentialId, hex } = await getNewWebauthnKey(
    getRootkeyPasskeyName(networkId!),
  );
  const tempPassword = crypto.getRandomValues(new Uint16Array(32));
  const [pubKey, privateKey] = await kadenaGenKeypairFromSeed(
    tempPassword,
    await kadenaEncrypt(
      tempPassword,
      await crypto.subtle.digest('sha-512', Buffer.from(hex)),
    ),
    0,
  );

  await registerCredentialOnChain({
    networkId: networkId!,
    chainId: chainId!,
    credentialId,
    pubkey: pubKey,
    domain: window.location.hostname,
  });
  localStorage.setItem(`${networkId}:wallet:cid`, credentialId);
  const decrypted = await kadenaDecrypt(tempPassword, privateKey);
  return {
    publicKey: pubKey,
    secretKey: Buffer.from(decrypted).toString('hex'),
  };
};
const getCredentialsQuery = gql`
query getCredentials($filter: String) {
  events(
    qualifiedEventName: "${process.env.NAMESPACE}.spirekey.REGISTER_CREDENTIAL"
    parametersFilter: $filter
    first: 1
  ) {
    totalCount
    edges {
      cursor
      node {
        chainId
        parameters
      }
    }
  }
}
`;
type Query = InstanceType<typeof ApolloClient>['query'];
const getCredentials = async (
  networkId: string,
  credentialId: string,
  domain: string,
  query: Query,
) => {
  const res = await query({
    query: getCredentialsQuery,
    variables: {
      filter: `{\"array_contains\": [\"${credentialId}\", \"${domain}\"]}`,
      networkId,
    },
  });
  const edges = res.data?.events?.edges;
  if (!edges.length) throw new Error('No credentials found');
  return edges.map((e: any) => {
    const [, c] = JSON.parse(e?.node?.parameters);
    return c;
  });
};

export const connectWallet = async (
  _: any,
  { networkId }: WalletsVariable,
  { client }: ApolloContext,
) => {
  localStorage.getItem(`${networkId}:wallet:cid`);
  const { publicKey, secretKey } = await getPubkeyFromPasskey(
    networkId,
    client.query,
  );
  return { publicKey, secretKey };
};

const getPubkeyFromPasskey = async (networkId: string, query: Query) => {
  const { response, id } = await startAuthentication({
    rpId: window.location.hostname,
    challenge: 'reconnectwallet',
  });
  const usignature = new Uint8Array(
    base64URLStringToBuffer(response.signature),
  );
  const rStart = usignature[4] === 0 ? 5 : 4;
  const rEnd = rStart + 32;
  const sStart = usignature[rEnd + 2] === 0 ? rEnd + 3 : rEnd + 2;
  const r = usignature.slice(rStart, rEnd);
  const s = usignature.slice(sStart);

  const ec = new elliptic.ec('p256');

  const rBigInt = BigInt('0x' + hex(r));
  const sBigInt = BigInt('0x' + hex(s));

  const sig = { r: rBigInt.toString(16), s: sBigInt.toString(16) };

  const concatenatedData = concatenateData(
    base64URLStringToBuffer(response.authenticatorData),
    await sha256(base64URLStringToBuffer(response.clientDataJSON)),
  );
  const messageHash = new Uint8Array(await sha256(concatenatedData));

  const foundKeys = await getCredentials(
    networkId,
    id,
    window.location.hostname,
    query,
  );
  const recoveredKeys = await Promise.all(
    [
      ec.recoverPubKey(messageHash, sig, 0),
      ec.recoverPubKey(messageHash, sig, 1),
    ].map(async (p) => {
      const tempPassword = crypto.getRandomValues(new Uint16Array(32));
      const [pubKey, privateKey] = await kadenaGenKeypairFromSeed(
        tempPassword,
        await kadenaEncrypt(
          tempPassword,
          await crypto.subtle.digest(
            'sha-512',
            Buffer.from(p.encode('hex', false)),
          ),
        ),
        0,
      );
      const secretBin = await kadenaDecrypt(tempPassword, privateKey);
      return {
        publicKey: pubKey,
        secretKey: Buffer.from(secretBin).toString('hex'),
      };
    }),
  );
  const recoveredKey = recoveredKeys.find(({ publicKey }) =>
    foundKeys.includes(publicKey),
  );
  if (!recoveredKey) throw new Error('No public key could be recovered');
  return recoveredKey;
};
const hex = (bytes: Uint8Array) => Array.from(bytes).map(i2hex).join('');
function i2hex(i: number) {
  return ('0' + i.toString(16)).slice(-2);
}
async function sha256(clientDataJSON: ArrayBuffer) {
  return await window.crypto.subtle.digest('SHA-256', clientDataJSON);
}
function concatenateData(
  authenticatorData: ArrayBuffer,
  clientDataHash: ArrayBuffer,
) {
  const concatenated = new Uint8Array(
    authenticatorData.byteLength + clientDataHash.byteLength,
  );
  concatenated.set(new Uint8Array(authenticatorData), 0);
  concatenated.set(
    new Uint8Array(clientDataHash),
    authenticatorData.byteLength,
  );
  return concatenated;
}
