"use client";
import React, { createContext, useContext } from "react";

type Theme = "light"; // Only "light" theme is now supported

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The theme is always "light"
  const theme: Theme = "light";

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
