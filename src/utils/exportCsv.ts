import type { CalculationResult } from "@/types/calculator";

interface ExportOptions {
  results: CalculationResult;
  selectedDate: string;
}

function buildCsvContent(options: ExportOptions): string {
  const { results } = options;
  const lines: string[] = [];

  lines.push("Factor,Mother,Father,Total");

  for (const factor of results.factors) {
    lines.push(
      [
        factor.label,
        factor.mother.toFixed(3),
        factor.father.toFixed(3),
        factor.total.toFixed(3),
      ].join(","),
    );
  }

  lines.push(
    [
      "Grand Total",
      results.totals.mother.toFixed(3),
      results.totals.father.toFixed(3),
      results.totals.grand.toFixed(3),
    ].join(","),
  );

  return lines.join("\n");
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}

function exportCsv(options: ExportOptions): boolean {
  try {
    const csv = buildCsvContent(options);
    const bom = "\uFEFF";
    const blob = new Blob([bom, csv], {
      type: "text/csv;charset=utf-8;",
    });
    const filename = `parental-legacy-data-${options.selectedDate}.csv`;

    triggerDownload(blob, filename);

    return true;
  } catch (error) {
    console.error("CSV export failed:", error);

    return false;
  }
}

export type { ExportOptions };
export { exportCsv };
