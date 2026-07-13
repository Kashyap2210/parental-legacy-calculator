import type { FactorResult, CalculationTotals } from "@/types/calculator";
import type { ThemeMode } from "@/types/theme";
import { getThemeColors } from "@/constants/theme";

interface BarChartDataPoint {
  name: string;
  mother: number;
  father: number;
}

interface PieChartDataPoint {
  name: string;
  value: number;
  color: string;
}

function buildBarChartData(factors: FactorResult[]): BarChartDataPoint[] {
  return factors.map((factor) => ({
    name: factor.label,
    mother: factor.mother,
    father: factor.father,
  }));
}

function buildPieChartData(
  totals: CalculationTotals,
  mode: ThemeMode,
): PieChartDataPoint[] {
  const colors = getThemeColors(mode);

  return [
    {
      name: "Mother",
      value: totals.mother,
      color: colors.chart.mother,
    },
    {
      name: "Father",
      value: totals.father,
      color: colors.chart.father,
    },
  ];
}

export type { BarChartDataPoint, PieChartDataPoint };
export { buildBarChartData, buildPieChartData };
