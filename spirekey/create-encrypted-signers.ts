#!/usr/bin/env tsx

import { encryptContent, getKey } from '@/utils/deploy';
import { readFile, writeFile } from 'fs/promises';

const createEncrpyptedSigners = async (signersFilePath: string, pw: string) => {
  if (!signersFilePath) throw new Error('No signers file path provided');
  if (!pw) throw new Error('No password provided');
  const file = await readFile(signersFilePath, 'utf8');
  const content = await encryptContent(file, await getKey(pw));

  await writeFile(signersFilePath, JSON.stringify(content, null, 2), 'utf8');
};

if (process.argv.length > 1) {
  const [signersFilePath, pw] = process.argv.slice(2);
  createEncrpyptedSigners(signersFilePath, pw);
}
