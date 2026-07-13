import type { ThemeMode } from "@/types/theme";

const STORAGE_KEY = "parental-legacy-theme" as const;
const MEDIA_QUERY = "(prefers-color-scheme: dark)" as const;

let currentMode: ThemeMode = "light";

const listeners = new Set<() => void>();

function getStoredTheme(): ThemeMode | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getPreferredTheme(): ThemeMode {
  if (typeof window !== "undefined" && window.matchMedia(MEDIA_QUERY).matches) {
    return "dark";
  }
  return "light";
}

function saveTheme(mode: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // localStorage unavailable
  }
}

function applyTheme(mode: ThemeMode): void {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }
}

function notify(): void {
  for (const listener of listeners) {
    listener();
  }
}

function getTheme(): ThemeMode {
  return currentMode;
}

function setTheme(mode: ThemeMode): void {
  currentMode = mode;
  applyTheme(mode);
  saveTheme(mode);
  notify();
}

function toggleTheme(): void {
  setTheme(currentMode === "light" ? "dark" : "light");
}

function initializeTheme(): void {
  const stored = getStoredTheme();
  const mode = stored ?? getPreferredTheme();
  setTheme(mode);
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export {
  getTheme,
  setTheme,
  toggleTheme,
  applyTheme,
  subscribe,
  initializeTheme,
  getStoredTheme,
  getPreferredTheme,
};
