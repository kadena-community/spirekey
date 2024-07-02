#!/usr/bin/env tsx

import { decryptContent, getKey } from '@/utils/deploy';
import { readFile, writeFile } from 'fs/promises';

const decryptSigners = async (signersFilePath: string, pw: string) => {
  if (!signersFilePath) throw new Error('No signers file path provided');
  if (!pw) throw new Error('No password provided');
  const file = await readFile(signersFilePath, 'utf8');
  const content = await decryptContent(JSON.parse(file), await getKey(pw));

  await writeFile(signersFilePath, content);
};

if (process.argv.length > 1) {
  const [signersFilePath, pw] = process.argv.slice(2);
  decryptSigners(signersFilePath, pw);
}
