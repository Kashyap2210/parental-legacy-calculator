type FactorId =
  | "geneticInheritance"
  | "constitutionalVitality"
  | "mentalPatterns"
  | "intellectualCapacity"
  | "emotionalFoundation"
  | "spiritualLineage"
  | "soulConnections";

interface FactorRange {
  id: FactorId;
  label: string;
  min: number;
  max: number;
}

interface FactorResult {
  id: FactorId;
  label: string;
  mother: number;
  father: number;
  total: number;
}

interface CalculationTotals {
  mother: number;
  father: number;
  grand: number;
  difference: number;
}

type DominantParent = "mother" | "father";

interface CalculationResult {
  factors: FactorResult[];
  totals: CalculationTotals;
  dominantParent: DominantParent;
}

interface ValidationError {
  field: string;
  message: string;
}

export type {
  FactorId,
  FactorRange,
  FactorResult,
  CalculationTotals,
  DominantParent,
  CalculationResult,
  ValidationError,
};
