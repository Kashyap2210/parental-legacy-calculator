import type { ThemeMode } from "@/types/theme";

type ThemeColors = {
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  surface: string;
  surfaceAlt: string;
  surfaceMuted: string;
  text: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderHover: string;
  chart: {
    mother: string;
    father: string;
    grid: string;
    tooltipBg: string;
    tooltipBorder: string;
    legendText: string;
  };
};

const LIGHT_COLORS = {
  primary: "#2563eb",
  primaryLight: "#dbeafe",

  secondary: "#0d9488",
  secondaryLight: "#ccfbf1",

  surface: "#ffffff",
  surfaceAlt: "#f8fafc",
  surfaceMuted: "#f1f5f9",

  text: "#334155",
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  textMuted: "#94a3b8",

  border: "#e2e8f0",
  borderHover: "#cbd5e1",

  chart: {
    mother: "#2563eb",
    father: "#0d9488",
    grid: "#e2e8f0",
    tooltipBg: "#ffffff",
    tooltipBorder: "#e2e8f0",
    legendText: "#334155",
  },
} as const satisfies ThemeColors;

const DARK_COLORS = {
  primary: "#60a5fa",
  primaryLight: "#1e3a5f",

  secondary: "#2dd4bf",
  secondaryLight: "#134e4a",

  surface: "#141a24",
  surfaceAlt: "#1c2433",
  surfaceMuted: "#232d3f",

  text: "#cbd5e1",
  textPrimary: "#e2e8f0",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",

  border: "#1e2a3a",
  borderHover: "#2d3a4d",

  chart: {
    mother: "#60a5fa",
    father: "#2dd4bf",
    grid: "#1e2a3a",
    tooltipBg: "#141a24",
    tooltipBorder: "#2d3a4d",
    legendText: "#cbd5e1",
  },
} as const satisfies ThemeColors;

function getThemeColors(mode: ThemeMode): ThemeColors {
  return mode === "dark" ? DARK_COLORS : LIGHT_COLORS;
}

const THEME = { colors: LIGHT_COLORS } as const;

export { THEME, LIGHT_COLORS, DARK_COLORS, getThemeColors };
export type { ThemeColors };
