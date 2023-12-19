import { Device } from "@/context/AccountContext";
import { useRouter } from "next/navigation";
import { useReturnUrl } from "./useReturnUrl";

export const useSign = (walletUrl: string) => {
  const { getReturnUrl } = useReturnUrl();
  const router = useRouter();

  return {
    sign: async (tx: unknown, device: Device, returnPath: string) => {
      router.push(
        `${walletUrl}/sign?payload=${Buffer.from(JSON.stringify(tx)).toString(
          "base64"
        )}&cid=${device["credential-id"]}&returnUrl=${getReturnUrl(returnPath)}`
      );
    },
  };
};
