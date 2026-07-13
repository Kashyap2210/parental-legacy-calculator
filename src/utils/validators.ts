import type { ValidationError } from "@/types/calculator";

const ERROR_MESSAGES = {
  REQUIRED: "Date of birth is required",
  INVALID: "Please enter a valid date",
  FUTURE: "Date of birth cannot be in the future",
} as const;

function parseDate(value: string): Date | null {
  if (!value.trim()) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  const [year, month, day] = value.split("-").map(Number);
  const parsedYear = date.getFullYear();
  const parsedMonth = date.getMonth() + 1;
  const parsedDay = date.getDate();

  if (parsedYear !== year || parsedMonth !== month || parsedDay !== day) {
    return null;
  }

  return date;
}

function isFutureDate(date: Date): boolean {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const compare = new Date(date);

  compare.setHours(0, 0, 0, 0);

  return compare > today;
}

function validateDate(value: string): ValidationError | null {
  if (!value.trim()) {
    return { field: "dateOfBirth", message: ERROR_MESSAGES.REQUIRED };
  }

  const date = parseDate(value);

  if (!date) {
    return { field: "dateOfBirth", message: ERROR_MESSAGES.INVALID };
  }

  if (isFutureDate(date)) {
    return { field: "dateOfBirth", message: ERROR_MESSAGES.FUTURE };
  }

  return null;
}

export { validateDate, parseDate };
