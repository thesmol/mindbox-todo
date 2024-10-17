import { useContext } from "react";
import {
  ThemeContext,
  ThemeContextProps,
} from "../components/providers/ThemeProvider";

export const useTheme = (): ThemeContextProps => {
  const context = useContext<ThemeContextProps>(ThemeContext);

  // Эта проверка технически не нужна, так как у контекста всегда есть значение,
  // но можно оставить для дополнительной безопасности на рантайме
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
