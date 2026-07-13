import type {
  StoredCalculation,
  StorageValidationResult,
} from "@/types/storage";

const APP_STORAGE_KEY = "parental-legacy-calculator" as const;
const CURRENT_VERSION = 1 as const;

function isStoredCalculation(data: unknown): data is StoredCalculation {
  if (typeof data !== "object" || data === null) return false;

  const obj = data as Record<string, unknown>;

  return (
    obj.version === CURRENT_VERSION &&
    typeof obj.dob === "string" &&
    typeof obj.timestamp === "string" &&
    obj.dob.length > 0 &&
    obj.timestamp.length > 0
  );
}

function validate(data: unknown): StorageValidationResult {
  if (!isStoredCalculation(data)) {
    return {
      valid: false,
      data: null,
      error: "Invalid storage format",
    };
  }

  return { valid: true, data };
}

function save(dob: string): boolean {
  try {
    const calculation: StoredCalculation = {
      version: CURRENT_VERSION,
      dob,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(calculation));

    return true;
  } catch {
    return false;
  }
}

function load(): StoredCalculation | null {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY);

    if (raw === null) return null;

    const parsed: unknown = JSON.parse(raw);
    const result = validate(parsed);

    if (!result.valid) {
      localStorage.removeItem(APP_STORAGE_KEY);
      return null;
    }

    return result.data;
  } catch {
    try {
      localStorage.removeItem(APP_STORAGE_KEY);
    } catch {
      // Silently fail if localStorage is unavailable
    }

    return null;
  }
}

function clear(): void {
  try {
    localStorage.removeItem(APP_STORAGE_KEY);
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

function hasData(): boolean {
  try {
    return localStorage.getItem(APP_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

export { save, load, clear, validate, hasData };
