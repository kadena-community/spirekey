import { deploy } from '@/utils/deploy';
import { getConfigFilePath } from '@e2e/helpers/configPath.helper';
import { isContractDeployed } from '@e2e/helpers/contract.helper';
import { test as setup } from '@playwright/test';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import path from 'node:path';

dotenv.config({
  path: [
    path.resolve(__dirname, '..', '..', '.env.test'),
    path.resolve(__dirname, '..', '..', '.env'),
  ],
});

setup('Deploy WebAuthn contract', async () => {
  const isDeployed = await isContractDeployed(
    `${process.env.NAMESPACE}.webauthn-wallet`,
    `${process.env.DEVNET_HOST}/chainweb/0.0/${process.env.DEVNET_NETWORK_ID}/chain/0/pact`,
    0,
    process.env.DEVNET_NETWORK_ID as string,
  );

  const configFilePath = getConfigFilePath(isDeployed);
  const signersFilePath = path.join(__dirname, './e2e-signers.json');

  const config = JSON.parse(await readFile(configFilePath, 'utf-8'));
  const signers = JSON.parse(await readFile(signersFilePath, 'utf-8'));
  await deploy({ ...config, signers }, false);
});
