import { useCallback, useEffect, useState } from "react";
import type { StoredCalculation } from "@/types/storage";
import * as storage from "@/services/storage.service";

interface UseLocalStorageReturn {
  loading: boolean;
  storedCalculation: StoredCalculation | null;
  save: (dob: string) => void;
  load: () => StoredCalculation | null;
  clear: () => void;
}

function useLocalStorage(): UseLocalStorageReturn {
  const [loading, setLoading] = useState(true);
  const [storedCalculation, setStoredCalculation] =
    useState<StoredCalculation | null>(null);

  const loadCalculation = useCallback((): StoredCalculation | null => {
    const data = storage.load();

    setStoredCalculation(data);

    return data;
  }, []);

  const saveCalculation = useCallback((dob: string): void => {
    const success = storage.save(dob);

    if (success) {
      const data = storage.load();

      setStoredCalculation(data);
    }
  }, []);

  const clearCalculation = useCallback((): void => {
    storage.clear();
    setStoredCalculation(null);
  }, []);

  useEffect(() => {
    loadCalculation();
    setLoading(false);
  }, [loadCalculation]);

  return {
    loading,
    storedCalculation,
    save: saveCalculation,
    load: loadCalculation,
    clear: clearCalculation,
  };
}

export type { UseLocalStorageReturn };
export { useLocalStorage };
