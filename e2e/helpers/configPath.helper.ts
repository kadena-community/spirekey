import path from 'node:path';

export const getConfigFilePath = (isDeployed: boolean): string => {
  if (isDeployed) return path.join(__dirname, '../../pact/deploy/update.json');
  return path.join(__dirname, '../../pact/deploy/deploy.json');
};
