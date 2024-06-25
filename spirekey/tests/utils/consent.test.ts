import { describe } from 'vitest';

describe('consent', () => {
  describe('when getting accounts to sign with', () => {
    describe('and there are no applicable accounts', () => {
      describe('but the pubkey exists on a different network', () => {});
      describe('but the pubkey exists on a different chain', () => {});
      describe('and the pubkey does not exists on a different network', () => {});
    });
    describe('and there is one applicable account', () => {});
    describe('and there are multiple applicable accounts', () => {
      describe('and they are all from the same domain', () => {});
      describe('and they are all from another domain', () => {});
      describe('and some belong to a different domain', () => {});
    });
  });
});
