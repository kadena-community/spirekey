import { useCallback, useEffect, useState } from "react";

export type CredentialPair = {
  cid: string;
  pubkey: string;
};

export const usePubkeys = () => {
  const [pubkeys, setPubkeys] = useState<CredentialPair[]>([]);
  useEffect(() => {
    const pubkeys = localStorage.getItem("publicKeys");
    if (pubkeys) setPubkeys(JSON.parse(pubkeys));
  }, []);
  const addPubkey = useCallback(
    (credPaid: CredentialPair) => {
      const newPubkeys = [...pubkeys, credPaid];
      setPubkeys(newPubkeys);
      localStorage.setItem("publicKeys", JSON.stringify(newPubkeys));
    },
    [pubkeys, setPubkeys]
  );
  return { pubkeys, addPubkey };
};
