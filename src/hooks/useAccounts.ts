import { useContext } from "react";

import { AccountContext } from "@/context/AccountContext";

export function useAccounts() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccounts must be used within an AccountProvider");
  }

  return context;
}
