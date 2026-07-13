function parseISODate(isoString: string): Date | null {
  try {
    const date = new Date(isoString);

    if (Number.isNaN(date.getTime())) return null;

    return date;
  } catch {
    return null;
  }
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDateParts(date: Date): {
  day: number;
  month: string;
  year: number;
} {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return { day, month, year };
}

function isToday(date: Date): boolean {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isYesterday(date: Date): boolean {
  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

function formatRelativeDate(isoString: string): string {
  const date = parseISODate(isoString);

  if (!date) return "Unknown date";

  const time = formatTime(date);

  if (isToday(date)) return `Today \u2022 ${time}`;
  if (isYesterday(date)) return `Yesterday \u2022 ${time}`;

  const { day, month, year } = formatDateParts(date);

  return `${day} ${month} ${year} \u2022 ${time}`;
}

function formatDate(isoString: string): string {
  const date = parseISODate(isoString);

  if (!date) return "Unknown date";

  const { day, month, year } = formatDateParts(date);

  return `${day} ${month} ${year}`;
}

function formatTimestamp(isoString: string): string {
  return formatRelativeDate(isoString);
}

export {
  parseISODate,
  formatTimestamp,
  formatDate,
  formatRelativeDate,
  formatTime,
};
