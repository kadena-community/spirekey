import { createTransaction } from "@kadena/client";
import {
  addData,
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from "@kadena/client/fp";
import { asyncPipe } from "@/utils/asyncPipe";
import { l1Client } from "@/utils/client";
import {
  genesisAccount,
  genesisPrivateKey,
  genesisPubKey,
} from "@/utils/constants";
import { signWithKeyPair } from "@/utils/signSubmitListen";

export const getAccountName = async (publicKey: string) =>
  asyncPipe(
    composePactCommand(
      execution(`
(let* ((guard (read-keyset 'ks))
       (account (create-principal guard))
      )
  (${process.env.NAMESPACE}.webauthn-wallet.get-account-name account)
)
`),
      setMeta({
        chainId: "14",
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
      }),
      addData("ks", {
        keys: [getWebAuthnPubkeyFormat(publicKey)],
        pred: "keys-any",
      }),
      setNetworkId("fast-development")
    ),
    createTransaction,
    (tx) =>
      l1Client.local(tx, { preflight: false, signatureVerification: false }),
    (tx) => tx.result.data
  )({});

export const registerAccount = async ({
  displayName,
  domain,
  credentialId,
  credentialPubkey,
}: {
  displayName: string;
  domain: string;
  credentialId: string;
  credentialPubkey: string;
}): Promise<string> => {
  const caccount = await getAccountName(credentialPubkey);
  return asyncPipe(
    registerAccountCommand({
      account: caccount,
      displayName,
      domain,
      credentialId,
      credentialPubkey,
    }),
    createTransaction,
    signWithKeyPair({
      publicKey: genesisPubKey,
      secretKey: genesisPrivateKey,
    }),
    l1Client.submit,
    l1Client.listen,
    () => caccount
  )({});
};

const getWebAuthnPubkeyFormat = (pubkey: string) => `WEBAUTHN-${pubkey}`;
const registerAccountCommand = ({
  account,
  displayName,
  credentialId,
  credentialPubkey,
  domain,
}: {
  account: string;
  displayName: string;
  credentialId: string;
  credentialPubkey: string;
  domain: string;
}) =>
  composePactCommand(
    execution(
      `
(namespace '${process.env.NAMESPACE})
(let ((guard (read-keyset 'ks)))
  (coin.transfer 
    "sender00"
    (webauthn-wallet.create-wallet 
      1 1
      [{ 'name          : "${displayName}"
       , 'credential-id : "${credentialId}"
       , 'domain        : "${domain}"
       , 'guard         : guard
       }
      ]
    )
    10.0
  )
)
      `
    ),
    addSigner(genesisPubKey, (withCap) => [
      withCap("coin.GAS"),
      withCap("coin.TRANSFER", "sender00", account, 10.0),
    ]),
    addData("ks", {
      keys: [getWebAuthnPubkeyFormat(credentialPubkey)],
      pred: "keys-any",
    }),
    setMeta({
      chainId: "14",
      gasLimit: 2000,
      gasPrice: 0.0000001,
      ttl: 60000,
      senderAccount: genesisAccount,
    }),
    setNetworkId("fast-development")
  );
