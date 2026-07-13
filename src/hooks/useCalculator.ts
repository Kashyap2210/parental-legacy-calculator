import { useCallback, useState } from "react";
import type { CalculationResult, ValidationError } from "@/types/calculator";
import { calculateLegacy } from "@/utils/calculator";
import { parseDate, validateDate } from "@/utils/validators";

interface UseCalculatorReturn {
  selectedDate: string;
  results: CalculationResult | null;
  errors: ValidationError[];
  handleDateChange: (value: string) => void;
  reset: () => void;
}

function useCalculator(): UseCalculatorReturn {
  const [selectedDate, setSelectedDate] = useState("");
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleDateChange = useCallback((value: string) => {
    setSelectedDate(value);

    const validationError = validateDate(value);

    if (validationError) {
      setErrors([validationError]);
      setResults(null);
      return;
    }

    const date = parseDate(value);

    if (!date) {
      setErrors([]);
      setResults(null);
      return;
    }

    const calculationResults = calculateLegacy(date);

    setResults(calculationResults);
    setErrors([]);
  }, []);

  const reset = useCallback(() => {
    setSelectedDate("");
    setResults(null);
    setErrors([]);
  }, []);

  return {
    selectedDate,
    results,
    errors,
    handleDateChange,
    reset,
  };
}

export type { UseCalculatorReturn };
export { useCalculator };
