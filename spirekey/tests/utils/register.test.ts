import { deviceColors } from '@/styles/shared/tokens.css';
import { getRegisterCommand } from '@/utils/register';
import { ICommandPayload } from '@kadena/types';
import { describe, expect, it } from 'vitest';

describe('register', () => {
  describe('when registering an account', () => {
    it('should retrieve the c:account to register the account', async () => {
      const { cmd, hash, sigs } = await getRegisterCommand({
        color: deviceColors.red,
        domain: 'https://spirekey.kadena.io',
        chainId: '4',
        networkId: 'development',
        deviceType: 'security-key',
        accountName: 'c:account',
        credentialId: 'XesLN454r',
        credentialPubkey: 'WEBAUTHN-ae5e',
      });
      const { signers, meta, networkId, ...payload }: ICommandPayload =
        JSON.parse(cmd);
      expect(signers.flatMap((s) => s.clist?.map((c) => c.name))).toEqual([
        'coin.GAS',
        'n_eef68e581f767dd66c4d4c39ed922be944ede505.spirekey.GAS_PAYER',
      ]);
      expect(meta).toMatchObject({ chainId: '4' });
      expect(networkId).toEqual('development');
    });
  });
});
