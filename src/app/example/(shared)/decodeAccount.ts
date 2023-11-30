import { Account } from "./Account";

export const decodeAccount = (response: string) => {
  if (!response) return null;
  const account: Account = JSON.parse(
    Buffer.from(response, "base64").toString()
  );

  return account;
};
