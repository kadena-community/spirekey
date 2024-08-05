import { getMerkleProofWith, getRootHashWith } from '@/utils/merkle';
import { describe, expect, it } from 'vitest';

describe('Merkle', () => {
  const hashMock = (value: string) => `H(${value})`;
  const getRootHash = getRootHashWith(hashMock);
  const getMerkleProof = getMerkleProofWith(hashMock);
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
        const hashes = ['A', 'B', 'C', 'D', 'E'];
        expect(getRootHash(hashes)).toEqual(
          'H(H(H(A,B),H(C,D)),H(H(E,0),H(0,0)))',
        );
      });
    });
  });
  describe('When getting the merkle proof', () => {
    describe('And we have 4 entries', () => {
      describe('And we want to have the proof for A', () => {
        it('should get [B, H(C,D)]', () => {
          const hashes = ['A', 'B', 'C', 'D'];
          expect(getMerkleProof('A', hashes)).toEqual(['B', 'H(C,D)']);
        });
      });
      describe('And we want to have the proof for B', () => {
        it('should get [A, H(C,D)]', () => {
          const hashes = ['A', 'B', 'C', 'D'];
          expect(getMerkleProof('B', hashes)).toEqual(['A', 'H(C,D)']);
        });
      });
      describe('And we want to have the proof for C', () => {
        it('should get [H(A,B), D]', () => {
          const hashes = ['A', 'B', 'C', 'D'];
          expect(getMerkleProof('C', hashes)).toEqual(['H(A,B)', 'D']);
        });
      });
      describe('And we want to have the proof for D', () => {
        it('should get [H(A,B), C]', () => {
          const hashes = ['A', 'B', 'C', 'D'];
          expect(getMerkleProof('D', hashes)).toEqual(['H(A,B)', 'C']);
        });
      });
    });
  });
});
