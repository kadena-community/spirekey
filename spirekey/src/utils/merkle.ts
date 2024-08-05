type HashFunction = (value: string) => string;
export const getRootHashWith =
  (hash: HashFunction) =>
  (hashes: string[]): string => {
    const leaves = constructLeaves(hashes).map(([a = '0', b = '0']) =>
      hash(`${a},${b}`),
    );
    if (leaves.length > 1) return getRootHashWith(hash)(leaves);
    return leaves[0];
  };

type Leaf = [string, string?];
type Leaves = Leaf[];
export const constructLeaves = (hashes: string[]) => {
  const startResult: Leaves = [];

  return hashes.reduce((acc, curr: string, i) => {
    if (i % 2 !== 0) return acc;
    const leaf: Leaf = [curr, hashes[i + 1]];
    return [...acc, leaf];
  }, startResult);
};
