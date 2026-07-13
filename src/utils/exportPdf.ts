import type { CalculationResult } from "@/types/calculator";
import type { jsPDF } from "jspdf";

interface ExportOptions {
  results: CalculationResult;
  selectedDate: string;
}

type jsPDFWithAutoTable = jsPDF & {
  autoTable: (options: Record<string, unknown>) => void;
  lastAutoTable: { finalY: number };
};

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b];
}

async function exportPdf(options: ExportOptions): Promise<boolean> {
  try {
    const [{ jsPDF }, { applyPlugin }] = await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);

    applyPlugin(jsPDF);

    const { results, selectedDate } = options;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    }) as jsPDFWithAutoTable;

    doc.setProperties({
      title: "Parental Legacy Report",
      subject: "Life Factors Assessment Results",
      author: "Parental Legacy Calculator",
      creator: "Parental Legacy Calculator",
    });

    const headerColor = hexToRgb("#2563eb");
    const secondaryColor = hexToRgb("#0d9488");

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Parental Legacy Report", 14, 22);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Date of Birth: ${selectedDate}`, 14, 34);
    doc.text(
      `Exported: ${new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })}`,
      14,
      41,
    );
    doc.text(
      `Dominant Parent: ${results.dominantParent === "mother" ? "Mother" : "Father"}`,
      14,
      48,
    );

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Summary", 14, 60);

    doc.autoTable({
      startY: 64,
      head: [["Metric", "Value"]],
      body: [
        ["Mother Total", `${results.totals.mother.toFixed(3)}%`],
        ["Father Total", `${results.totals.father.toFixed(3)}%`],
        ["Grand Total", `${results.totals.grand.toFixed(3)}%`],
        ["Difference", `${results.totals.difference.toFixed(3)}%`],
      ],
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: headerColor, textColor: 255 },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    });

    const summaryEndY = doc.lastAutoTable.finalY + 12;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Factor Breakdown", 14, summaryEndY);

    doc.autoTable({
      startY: summaryEndY + 4,
      head: [["Factor", "Mother", "Father", "Total"]],
      body: results.factors.map((factor) => [
        factor.label,
        factor.mother.toFixed(3),
        factor.father.toFixed(3),
        factor.total.toFixed(3),
      ]),
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: headerColor, textColor: 255 },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      columnStyles: {
        1: { textColor: headerColor },
        2: { textColor: secondaryColor },
      },
    });

    const pageCount = doc.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(148, 163, 184);
      doc.text(
        `Page ${i} of ${pageCount}`,
        14,
        doc.internal.pageSize.height - 10,
      );
      doc.text(
        "Parental Legacy Calculator",
        doc.internal.pageSize.width - 14,
        doc.internal.pageSize.height - 10,
        { align: "right" },
      );
    }

    doc.save(`parental-legacy-report-${selectedDate}.pdf`);

    return true;
  } catch (error) {
    console.error("PDF export failed:", error);

    return false;
  }
}

export type { ExportOptions };
export { exportPdf };
