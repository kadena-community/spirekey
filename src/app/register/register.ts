import { createTransaction, Pact } from "@kadena/client";
import {
  addData,
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from "@kadena/client/fp";
import { asyncPipe } from "../utils/asyncPipe";
import { l2Client } from "../utils/client";
import {
  genesisAccount,
  genesisPrivateKey,
  genesisPubKey,
} from "../utils/constants";
import { signKeyPairLocal, signWithKeyPair } from "../utils/signSubmitListen";

export const getAccountName = async (name: string) =>
  asyncPipe(
    composePactCommand(
      execution(
        `(n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn.get-account-name "${name}")`
      ),
      setMeta({
        chainId: "2",
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
        senderAccount: genesisAccount,
      }),
      addSigner(genesisPubKey),
      setNetworkId("fast-development")
    ),
    signKeyPairLocal(l2Client, {
      publicKey: genesisPubKey,
      secretKey: genesisPrivateKey,
    }),
    (tx) => tx.result.data
  )({});

export const registerAccount = ({
  account,
  credentialId,
  credentialPubkey,
}: {
  account: string;
  credentialId: string;
  credentialPubkey: string;
}) => {
  return asyncPipe(
    registerAccountCommand({
      account,
      credentialId,
      credentialPubkey,
    }),
    createTransaction,
    signWithKeyPair({
      publicKey: genesisPubKey,
      secretKey: genesisPrivateKey,
    })
  )({});
};

const registerAccountCommand = ({
  account,
  credentialId,
  credentialPubkey,
}: {
  account: string;
  credentialId: string;
  credentialPubkey: string;
}) =>
  composePactCommand(
    execution(
      Pact.modules["n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn"][
        "create-account"
      ](
        account,
        () => "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.l2",
        () => `(read-keyset 'ks)`,
        credentialId,
        credentialPubkey
      )
    ),
    process.env.WEBAUTHN_MOCK
      ? (tx) => {
          console.warn(
            "WEBAUTHN_MOCK is set, not adding webauthn pubkey as signer"
          );
          return tx;
        }
      : addSigner({
          pubKey: credentialPubkey,
          scheme: "WebAuthn",
        }),
    addSigner(genesisPubKey),
    addData("ks", {
      keys: process.env.WEBAUTHN_MOCK ? [genesisPubKey] : [credentialPubkey],
      pred: "keys-any",
    }),
    setMeta({
      chainId: "14",
      gasLimit: 1000,
      gasPrice: 0.0000001,
      ttl: 60000,
      senderAccount: genesisAccount,
    }),
    setNetworkId("fast-development")
  );
