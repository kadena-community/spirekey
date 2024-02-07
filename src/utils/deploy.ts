import { readFile } from 'fs/promises';

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
  sender: keyof Signers;
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

export const executeStep = async (step: ResolvedStep, profiles: Profiles) => {
  for (const chain of profiles[step.profile].chains) {
    // execute step
    console.log(`executing step on chain ${chain}`);
  }
};

export const deploy = async (config: ResolvedDeployConfiguration) => {
  const resolvedConfig = await resolveConfiguration(config);
};
