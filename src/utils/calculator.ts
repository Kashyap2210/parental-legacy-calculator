import type { CalculationResult, DominantParent } from "@/types/calculator";
import { FACTOR_RANGES } from "@/constants/factorRanges";
import { normalizeFactors } from "@/utils/normalizer";

const SEED_MODULUS = 1000;
const BASE_BIAS = 0.5;
const BIAS_DIVISOR = 100;
const DECIMAL_PLACES = 3;

function extractDateParts(date: Date): {
  day: number;
  month: number;
  year: number;
} {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

function generateSeed(
  day: number,
  month: number,
  year: number,
): { seed: number; ratio: number } {
  const seed = (day * 37 + month * 17 + year) % SEED_MODULUS;
  const ratio = seed / SEED_MODULUS;

  return { seed, ratio };
}

function computeFactorValue(min: number, max: number, ratio: number): number {
  const raw = min + ratio * (max - min);
  const factor = 10 ** DECIMAL_PLACES;

  return Math.round(raw * factor) / factor;
}

function getDominantParent(day: number): DominantParent {
  return day % 2 === 0 ? "father" : "mother";
}

function computeShares(day: number): {
  motherShare: number;
  fatherShare: number;
} {
  const dynamicBias = (day % 10) / BIAS_DIVISOR;
  const isOddDay = day % 2 !== 0;

  const motherShare = isOddDay
    ? BASE_BIAS + dynamicBias
    : 1 - (BASE_BIAS + dynamicBias);
  const fatherShare = 1 - motherShare;

  return { motherShare, fatherShare };
}

function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;

  return Math.round(value * factor) / factor;
}

function calculateLegacy(date: Date): CalculationResult {
  const { day, month, year } = extractDateParts(date);
  const { ratio } = generateSeed(day, month, year);
  const dominantParent = getDominantParent(day);

  const rawFactors = FACTOR_RANGES.map((range) => {
    const total = computeFactorValue(range.min, range.max, ratio);
    const { motherShare, fatherShare } = computeShares(day);

    return {
      id: range.id,
      label: range.label,
      mother: roundTo(total * motherShare, DECIMAL_PLACES),
      father: roundTo(total * fatherShare, DECIMAL_PLACES),
      total,
    };
  });

  const { factors, totals } = normalizeFactors(rawFactors);

  return { factors, totals, dominantParent };
}

export { calculateLegacy };
