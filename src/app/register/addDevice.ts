import { Account, Device } from "@/hooks/useAccounts";
import {asyncPipe} from "@/utils/asyncPipe";
import {composePactCommand, execution} from "@kadena/client/fp";

export const addDevice = (account: Account, device: Device) => {

  asyncPipe(
    composePactCommand(
      execution(``)
    )
  )

  return account.account;
};
