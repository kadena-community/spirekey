import {
  ChainId,
  IClient,
  ICommand,
  ICommandResult,
  ITransactionDescriptor,
  IUnsignedCommand,
  createClient,
  createTransaction,
} from '@kadena/client';
import {
  addData,
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { sign } from '@kadena/cryptography-utils';
import { readFileSync } from 'fs';

const asyncPipe =
  (...args: any) =>
  (init: any) =>
    args.reduce((chain: any, fn: any) => chain.then(fn), Promise.resolve(init));

export type DeployConfig = {
  host: string;
  code: string;
  caps?: (string | number)[][];
  chainId: ChainId;
  networkId: string;
  sender: string;
  data: any;
  keypair: {
    publicKey: string;
    secretKey: string;
  };
};

export type DeploySettings = Omit<
  DeployConfig,
  'code' | 'data' | 'host' | 'chainId'
> & {
  data?: DeployConfig['data'];
  code?: DeployConfig['code'];
  dataFile?: string;
  codeFile?: string;
  hosts: {
    host: string;
    chainIds: ChainId[];
  }[];
};

const composeDeployCommand = ({
  code,
  networkId,
  data,
  sender,
  keypair,
  caps = [],
}: DeployConfig) =>
  composePactCommand(
    execution(code),
    setMeta({
      ttl: 28800,
      gasLimit: 100000,
      gasPrice: 0.00000001,
      senderAccount: sender,
    }),
    setNetworkId(networkId),
    addSigner(keypair.publicKey, (withCapability) =>
      caps.map((capArgs) => withCapability.apply({}, capArgs)),
    ),
    ...Object.entries(data || {}).map(([key, value]) =>
      addData(key, value as any),
    ),
  );

const signWithKeyPair =
  ({ publicKey, secretKey }) =>
  (tx: IUnsignedCommand) => {
    const { sig } = sign(tx.cmd, { publicKey, secretKey });
    return {
      ...tx,
      sigs: [{ sig }],
    };
  };

const signSubmitListen = (client: IClient, config: DeployConfig) =>
  asyncPipe(
    createTransaction,
    signWithKeyPair(config.keypair),
    (tx: ICommand) => {
      client.local(tx);
      return tx;
    },
    (tx: ICommand) => client.submit(tx),
    (tx: ITransactionDescriptor) =>
      asyncPipe(
        () => client.listen(tx),
        (tx: ICommandResult) => {
          if (tx.result.status === 'success')
            return console.log('success:', tx.result.data);
          return console.error(tx.result.error);
        },
      ),
  );

const deploy = async (config: DeployConfig) => {
  const client = createClient(
    ({ chainId, networkId }) =>
      `${config.host}/chainweb/0.0/${networkId}/chain/${chainId}/pact`,
  );
  return asyncPipe(
    composeDeployCommand(config),
    composePactCommand(
      setMeta({
        chainId: config.chainId,
      }),
    ),
    signSubmitListen(client, config),
  )({});
};

const mapDeployConfig = (config: DeploySettings) =>
  config.hosts.flatMap(({ host, chainIds }) =>
    chainIds.map((chainId) => ({
      ...config,
      host,
      chainId,
    })),
  );

const mapData = ({ dataFile, ...config }: Omit<DeploySettings, 'hosts'>) => {
  if (dataFile)
    return { ...config, data: JSON.parse(readFileSync(dataFile).toString()) };
  return config;
};

const mapCode = ({ codeFile, ...config }: Omit<DeploySettings, 'hosts'>) => {
  if (codeFile) return { ...config, code: readFileSync(codeFile).toString() };
  return config;
};

export const local = async (
  code: string,
  host: string,
  networkId: string,
  chainId: any,
) => {
  const client = createClient(
    ({ chainId, networkId }) =>
      `${host}/chainweb/0.0/${networkId}/chain/${chainId}/pact`,
  );
  return asyncPipe(
    composePactCommand(
      execution(code),
      setMeta({
        ttl: 28800,
        gasLimit: 100000,
        gasPrice: 0.00000001,
        chainId,
      }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx: any) => client.local(tx, { preflight: false }),
    (tx: any) => tx.result.data,
  )({});
};

export default async function deployWith(config: DeploySettings[]) {
  const deployConfig = config
    .flatMap(mapDeployConfig)
    .map(mapData)
    .map(mapCode) as DeployConfig[];

  const queuedUpTxs: Function[] = [];
  for (const config of deployConfig) {
    console.log('deploying', config.code);
    console.log('host:', config.host, 'chain:', config.chainId);
    queuedUpTxs.push(await deploy(config as DeployConfig));
  }

  await Promise.all(queuedUpTxs.map((queuedUpTx) => queuedUpTx()));
}
