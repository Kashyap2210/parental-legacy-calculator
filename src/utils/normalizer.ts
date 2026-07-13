import type {
  FactorId,
  FactorResult,
  CalculationTotals,
} from "@/types/calculator";

interface RawFactorSplit {
  id: FactorId;
  label: string;
  mother: number;
  father: number;
  total: number;
}

const DECIMAL_PLACES = 3;

function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;

  return Math.round(value * factor) / factor;
}

function normalizeFactors(rawFactors: RawFactorSplit[]): {
  factors: FactorResult[];
  totals: CalculationTotals;
} {
  const rawMotherTotal = rawFactors.reduce((sum, f) => sum + f.mother, 0);
  const rawFatherTotal = rawFactors.reduce((sum, f) => sum + f.father, 0);
  const combinedTotal = rawMotherTotal + rawFatherTotal;

  if (combinedTotal === 0) {
    const zeroFactors: FactorResult[] = rawFactors.map((f) => ({
      id: f.id,
      label: f.label,
      mother: 0,
      father: 0,
      total: 0,
    }));

    return {
      factors: zeroFactors,
      totals: { mother: 0, father: 0, grand: 0, difference: 0 },
    };
  }

  const scaleFactor = 100 / combinedTotal;

  const factors: FactorResult[] = rawFactors.map((f) => ({
    id: f.id,
    label: f.label,
    mother: roundTo(f.mother * scaleFactor, DECIMAL_PLACES),
    father: roundTo(f.father * scaleFactor, DECIMAL_PLACES),
    total: roundTo(f.total, DECIMAL_PLACES),
  }));

  const motherTotal = roundTo(
    factors.reduce((sum, f) => sum + f.mother, 0),
    DECIMAL_PLACES,
  );
  const fatherTotal = roundTo(
    factors.reduce((sum, f) => sum + f.father, 0),
    DECIMAL_PLACES,
  );
  const grandTotal = roundTo(motherTotal + fatherTotal, DECIMAL_PLACES);
  const difference = roundTo(
    Math.abs(motherTotal - fatherTotal),
    DECIMAL_PLACES,
  );

  return {
    factors,
    totals: {
      mother: motherTotal,
      father: fatherTotal,
      grand: grandTotal,
      difference,
    },
  };
}

export { normalizeFactors };
