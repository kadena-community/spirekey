import { getRootHashWith } from '@/utils/merkle';
import { describe, expect, it } from 'vitest';

describe('Merkle', () => {
  const getRootHash = getRootHashWith((value: string) => `H(${value})`);
  describe('When getting a merkle root hash', () => {
    describe('And we have 4 entries', () => {
      it('should get the hash based on `H(H(A,B),H(C,D))`', () => {
        const hashes = ['A', 'B', 'C', 'D'];
        expect(getRootHash(hashes)).toEqual('H(H(A,B),H(C,D))');
      });
    });
    describe('And we have 3 entries', () => {
      it('should get the hash based on `H(H(A,B),H(C,0))`', () => {
        const hashes = ['A', 'B', 'C'];
        expect(getRootHash(hashes)).toEqual('H(H(A,B),H(C,0))');
      });
    });
    describe('And we have 5 entries', () => {
      it('should get the hash based on `H(H(H(A,B),H(C,D)),H(H(E,0),H(0,0)))`', () => {
        const hashes = ['A', 'B', 'C','D','E'];
        expect(getRootHash(hashes)).toEqual('H(H(H(A,B),H(C,D)),H(H(E,0),H(0,0)))');
      });
    });
  });
});
