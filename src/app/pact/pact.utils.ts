import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from "@kadena/client/fp";

export const readFile = async (file?: File | null): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(String(event.target?.result));
    };
    reader.onerror = (event) => {
      reject(event.target?.error);
    };
    reader.readAsText(file);
  });
};

export const uploadModuleTransaction = ({
  moduleFile,
  data,
  chainId,
  networkdId,
  publicKey,
  capabilities,
  senderAccount,
}: {
  moduleFile: string;
  data: Record<string, unknown>;
  chainId: string;
  networkdId: string;
  publicKey: string;
  capabilities: string[];
  senderAccount: string;
}) =>
  composePactCommand(
    execution(moduleFile),
    setMeta({
      chainId: chainId as "0",
      gasLimit: 100000,
      gasPrice: 0.00000001,
      senderAccount,
    }),
    setNetworkId(networkdId),
    addSigner({ pubKey: publicKey, scheme: "WebAuthn" }, (withCap) =>
      capabilities.map((cap: string) => {
        const [name, ...args] = cap.replace(/^\(|\)$/g, "").split(" ");
        return withCap(name, ...args.map(JSON.parse as any));
      })
    ),
    (cmd) => {
      cmd.payload.exec.data = data;
      return cmd;
    }
  );

export const validateJson = (value: string) => {
  try {
    return (
      Object.prototype.toString.call(JSON.parse(value)) === "[object Object]"
    );
  } catch (_error) {
    return false;
  }
};

const keysetRegex =
  /\(\s*read-(msg|keyset|decimal|string|integer)\s+"(.*?)"\s*\)/g;
const keysetLiteralRegex =
  /\(\s*read-(msg|keyset|decimal|string|integer)\s+'(.*?)\s*\)/g;

export const parseContractData = (contract: string) => {
  const readmatches = [
    ...contract.matchAll(keysetRegex),
    ...contract.matchAll(keysetLiteralRegex),
  ];
  const defaultByType = {
    msg: "",
    keyset: { keys: [], pred: "keys-all" },
    integer: 0,
    string: "",
    decimal: 0.0,
  } as Record<string, unknown>;

  return readmatches.map((match) => {
    const [, type, key] = match;
    return { key, default: defaultByType[type] ?? "" };
  });
};
