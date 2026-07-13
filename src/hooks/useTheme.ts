import { useEffect, useSyncExternalStore } from "react";
import type { ThemeMode } from "@/types/theme";
import * as themeService from "@/services/theme.service";

function useTheme() {
  const mode = useSyncExternalStore(
    themeService.subscribe,
    themeService.getTheme,
  );

  useEffect(() => {
    themeService.initializeTheme();
  }, []);

  return {
    theme: mode,
    toggleTheme: themeService.toggleTheme,
    isDark: mode === ("dark" as ThemeMode),
  };
}

export { useTheme };
