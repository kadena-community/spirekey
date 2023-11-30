import { useEffect, useState } from "react";

export const useReturnUrl = () => {
  const [host, setHost] = useState("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    setHost(window.location.protocol + "//" + window.location.host);
  }, []);
  return {
    getReturnUrl: (path: string) => {
      return host + path;
    },
  };
};
