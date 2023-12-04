import { useEffect, useState } from "react";

export type CredentialPair = {
  cid: string;
  pubkey: string;
};

const getUniquePairs = (pairs: CredentialPair[]) => {
  const uniquePairs = new Set();
  for (const pair of pairs) {
    uniquePairs.add(JSON.stringify(pair));
  }
  return Array.from(uniquePairs).map((pair) => JSON.parse(pair as string));
};

export const usePubkeys = () => {
  const [pubkeys, setPubkeys] = useState<CredentialPair[]>([]);
  const [newPubkey, setNewPubkey] = useState<CredentialPair>();
  useEffect(() => {
    const pubkeys = localStorage.getItem("publicKeys");
    if (pubkeys) setPubkeys(JSON.parse(pubkeys));
  }, []);
  useEffect(() => {
    if (!newPubkey) return;
    const newPubkeys = getUniquePairs([...pubkeys, newPubkey]); // get unique pairs
    setPubkeys(newPubkeys);
    localStorage.setItem("publicKeys", JSON.stringify(newPubkeys));
  }, [newPubkey]);

  return { pubkeys, addPubkey: setNewPubkey };
};
