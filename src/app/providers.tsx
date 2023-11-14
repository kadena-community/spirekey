"use client";

import { darkThemeClass } from "@kadena/react-ui/theme";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
