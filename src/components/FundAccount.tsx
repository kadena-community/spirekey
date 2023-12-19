import { useAccounts } from "@/hooks/useAccounts";
import { fundAccount } from "@/utils/fund";
import { Button, Text } from "@kadena/react-ui";
import { useState } from "react";

export const FundAccount = () => {
  const { activeAccount, getAccountDetails } = useAccounts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("AAA");

  const handleFundAccount = async () => {
    try {
      setLoading(true);
      if (!activeAccount) throw new Error("No account selected");

      await fundAccount(activeAccount);
      getAccountDetails();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleFundAccount}>
        {loading ? "Loading..." : "Fund account"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
