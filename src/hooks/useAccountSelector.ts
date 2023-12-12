import { l1Client } from "@/utils/client";
import { useCallback } from "react";
import { useAccounts } from "./useAccounts";

export const useAccountSelector = () => {
  const { accounts, account, device, setDevice, setAccount } =
    useAccounts(l1Client);
  const onAccountChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const acc = accounts.find((acc) => acc.account === event.target.value);
      if (!acc) return;
      setAccount(acc);
      setDevice(acc.devices[0]);
    },
    [setAccount, accounts]
  );
  const onDeviceChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const dev = account?.devices.find(
        (dev) => dev["credential-id"] === event.target.value
      );
      if (!dev) return;
      setDevice(dev);
    },
    [account, setDevice]
  );
  return {
    accounts,
    account,
    device,
    onAccountChange,
    onDeviceChange,
  };
};
