"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { darkThemeClass } from "@kadena/react-ui/theme";

import { AccountsProvider } from "@/context/AccountContext";
import { l1Client } from "@/utils/client";

export default function Providers({ children }: { children: ReactNode }) {
  const client = l1Client;

  return (
    <AccountsProvider client={client}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        value={{
          light: "light",
          dark: darkThemeClass,
        }}
      >
        {children}
      </ThemeProvider>
    </AccountsProvider>
  );
}
