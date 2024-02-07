import { IClient, createTransaction } from '@kadena/client';
import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { readFile } from 'fs/promises';
import { asyncPipe } from './asyncPipe';
import { l1Client } from './client';
import { signWithKeyPair } from './signSubmitListen';

type ProfileConfig = {
  host: string;
  networkId: string;
  chains: string[];
};
type Profiles = {
  [key: string]: ProfileConfig;
};

type SignerConfig = {
  publicKey: string;
  secretKey: string;
};
type Signers = {
  [accountName: string]: SignerConfig;
};

type BaseStep = {
  profile: keyof Profiles;
  data: Record<string, any>;
  sender: string;
  caps?: string[][];
};
type ResolvedStep = BaseStep & {
  code: string;
};
type UnresolvedStep = BaseStep & {
  codeFile: string;
};
type Step = ResolvedStep | UnresolvedStep;

export type DeployConfiguration = {
  profiles: Profiles;
  signers: Signers;
  steps: Step[];
};

type ResolvedDeployConfiguration = DeployConfiguration & {
  steps: ResolvedStep[];
};

const isResolvedStep = (step: Step): step is ResolvedStep => 'code' in step;
export const resolveConfiguration = async (config: DeployConfiguration) => {
  const resolvedSteps = await Promise.all(
    config.steps.map(async (step) => {
      if (isResolvedStep(step)) return step;
      const code = await readFile(step.codeFile, 'utf-8');
      return { ...step, code };
    }),
  );
  return { ...config, steps: resolvedSteps };
};

const logInfo = (message: string) => (tx: any) => {
  console.log(message, tx);
  return tx;
};

export const executeStepWith =
  (client: Pick<IClient, 'submit' | 'listen'>) =>
  async (
    step: ResolvedStep,
    { profiles, signers }: Pick<DeployConfiguration, 'profiles' | 'signers'>,
  ) =>
    await Promise.all(
      profiles[step.profile].chains.map(async (chain) => {
        const signer = signers[step.sender];
        const { publicKey, secretKey } = signer;
        return await asyncPipe(
          composePactCommand(
            execution(step.code),
            setMeta({
              chainId: chain,
              senderAccount: step.sender,
              gasLimit: 100000,
            }),
            setNetworkId(profiles[step.profile].networkId),
            (cmd) => ({
              ...cmd,
              payload: {
                ...cmd.payload,
                exec: {
                  ...cmd.payload.exec,
                  data: step.data || {},
                },
              },
            }),
            addSigner(
              publicKey,
              (withCap) =>
                step.caps?.map((cap) => {
                  const [name, ...args] = cap;
                  return withCap(
                    name,
                    ...args.map((resValue: any) => {
                      if (isNaN(resValue)) return resValue;
                      if (resValue.includes('.')) return Number(resValue);
                      return { int: Number(resValue) };
                    }),
                  );
                }) || [],
            ),
          ),
          createTransaction,
          signWithKeyPair({ publicKey, secretKey }),
          client.submit,
          client.listen,
        )({});
      }),
    );

export const deploy = async (config: ResolvedDeployConfiguration) => {
  const resolvedConfig = await resolveConfiguration(config);
};
