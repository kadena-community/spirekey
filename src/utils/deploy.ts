#!/usr/bin/env tsx

import { ChainId, IClient, createTransaction } from '@kadena/client';
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
  chains: ChainId[];
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

export const executeStepWith =
  (client: Pick<IClient, 'submit' | 'listen'>) =>
  async (
    step: ResolvedStep,
    { profiles, signers }: Pick<DeployConfiguration, 'profiles' | 'signers'>,
  ) =>
    await Promise.all(
      profiles[step.profile].chains.map(async (chain: ChainId) => {
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
  const executeStep = executeStepWith(l1Client);
  for (const step of resolvedConfig.steps) {
    console.log('Executing step', step.code);
    const result = await executeStep(step, resolvedConfig);
    console.log('Executed step', result);
  }
};

export const deployFile = async (
  configFilePath: string,
  signersFilePath: string,
) => {
  const config = JSON.parse(await readFile(configFilePath, 'utf-8'));
  const signers = JSON.parse(await readFile(signersFilePath, 'utf-8'));
  await deploy({ ...config, signers });
};

if (process.argv.length > 1) {
  const [configFilePath, signersFilePath] = process.argv.slice(2);
  if (!configFilePath) throw new Error('No config file path provided');
  if (!signersFilePath) throw new Error('No signers file path provided');
  deployFile(configFilePath, signersFilePath);
}
