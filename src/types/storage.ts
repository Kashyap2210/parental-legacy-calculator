interface StoredCalculation {
  version: 1;
  dob: string;
  timestamp: string;
}

interface StorageValidationResult {
  valid: boolean;
  data: StoredCalculation | null;
  error?: string;
}

export type { StoredCalculation, StorageValidationResult };
