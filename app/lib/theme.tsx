// lib/theme.tsx
"use client";

import { createTheme } from "@mui/material/styles";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

// Create RTL cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create MUI theme
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Vazirmatn, sans-serif",
  },
});

export function RTLProvider({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value= { cacheRtl } >
    <ThemeProvider theme={ theme }> { children } </ThemeProvider>
      </CacheProvider>
  );
}
