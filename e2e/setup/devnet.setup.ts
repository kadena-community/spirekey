import { deploy } from '@/utils/deploy';
import {
  devnetUrl,
  networkId,
  webauthnWalletModule,
} from '@e2e/constants/network.constants';
import { isContractDeployed } from '@e2e/helpers/contract.helper';
import { test as setup } from '@playwright/test';
import { readFile } from 'fs/promises';
import path from 'node:path';

setup('Deploy WebAuthn contract', async () => {
  const isDeployed = await isContractDeployed(
    webauthnWalletModule,
    devnetUrl('0'),
    0,
    networkId,
  );
  const signersFilePath = path.join(__dirname, './e2e-signers.json');
  let configFilePath = '';

  switch (isDeployed) {
    case true:
      configFilePath = path.join(__dirname, '../../pact/deploy/update.json');
      break;
    default:
      configFilePath = path.join(__dirname, '../../pact/deploy/deploy.json');
      break;
  }

  const config = JSON.parse(await readFile(configFilePath, 'utf-8'));
  const signers = JSON.parse(await readFile(signersFilePath, 'utf-8'));
  await deploy({ ...config, signers });
});
