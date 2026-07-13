import type { FactorRange } from "@/types/calculator";

const FACTOR_RANGES: readonly FactorRange[] = [
  {
    id: "geneticInheritance",
    label: "Genetic Inheritance",
    min: 9.333,
    max: 10.777,
  },
  {
    id: "constitutionalVitality",
    label: "Constitutional Vitality",
    min: 8.111,
    max: 9.111,
  },
  { id: "mentalPatterns", label: "Mental Patterns", min: 6.111, max: 7.111 },
  {
    id: "intellectualCapacity",
    label: "Intellectual Capacity",
    min: 6.333,
    max: 6.999,
  },
  {
    id: "emotionalFoundation",
    label: "Emotional Foundation",
    min: 7.111,
    max: 7.999,
  },
  {
    id: "spiritualLineage",
    label: "Spiritual Lineage",
    min: 5.011,
    max: 6.011,
  },
  {
    id: "soulConnections",
    label: "Soul Connections",
    min: 5.111,
    max: 6.222,
  },
] as const;

export { FACTOR_RANGES };
