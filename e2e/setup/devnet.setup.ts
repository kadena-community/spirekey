import { deploy } from '@/utils/deploy';
import {
  devnetUrl,
  networkId,
  webauthnWalletModule,
} from '@e2e/constants/network.constants';
import { getConfigFilePath } from '@e2e/helpers/configPath.helper';
import { isContractDeployed } from '@e2e/helpers/contract.helper';
import { test as setup } from '@playwright/test';
import { readFile } from 'fs/promises';
import { get } from 'http';
import path from 'node:path';

setup('Deploy WebAuthn contract', async () => {
  const isDeployed = await isContractDeployed(
    webauthnWalletModule,
    devnetUrl('0'),
    0,
    networkId,
  );

  const configFilePath = getConfigFilePath(isDeployed);
  const signersFilePath = path.join(__dirname, './e2e-signers.json');

  const config = JSON.parse(await readFile(configFilePath, 'utf-8'));
  const signers = JSON.parse(await readFile(signersFilePath, 'utf-8'));
  await deploy({ ...config, signers });
});
