import { useMemo } from "react";
import clsx from "clsx";
import type { CalculationResult } from "@/types/calculator";
import { buildBarChartData, buildPieChartData } from "@/utils/chartData";
import ChartCard from "@/components/charts/ChartCard";
import GroupedBarChart from "@/components/charts/GroupedBarChart";
import ParentSharePieChart from "@/components/charts/ParentSharePieChart";
import SectionTitle from "@/components/ui/SectionTitle";
import EmptyState from "@/components/ui/EmptyState";

interface ChartsSectionProps {
  results: CalculationResult | null;
  className?: string;
}

function ChartsSection({ results, className }: ChartsSectionProps) {
  const barData = useMemo(
    () => (results ? buildBarChartData(results.factors) : []),
    [results],
  );

  const pieData = useMemo(
    () => (results ? buildPieChartData(results.totals) : []),
    [results],
  );

  if (!results) {
    return (
      <section aria-labelledby="charts-heading">
        <div className={clsx("space-y-8", className)}>
          <EmptyState
            message="No data to visualize"
            description="Enter a date of birth above to generate charts and visualizations."
          />
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="charts-heading">
      <div className={clsx("space-y-6", className)}>
        <SectionTitle
          id="charts-heading"
          title="Visualizations"
          description="Graphical breakdown of parental influence across life factors."
        />

        <ChartCard
          title="Factor Comparison"
          description="Mother vs. father influence for each life factor."
        >
          <GroupedBarChart data={barData} />
        </ChartCard>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard
            title="Parent Share"
            description="Overall percentage distribution between parents."
          >
            <ParentSharePieChart data={pieData} />
          </ChartCard>

          <ChartCard
            title="Legacy Overview"
            description="Key metrics at a glance."
          >
            <div className="flex flex-col justify-center space-y-4 py-8">
              <div className="text-center">
                <p className="text-sm font-medium text-text-secondary">
                  Mother&apos;s Share
                </p>
                <p className="mt-1 text-4xl font-bold tabular-nums text-primary-600">
                  {results.totals.mother.toFixed(1)}%
                </p>
              </div>
              <div className="mx-auto h-px w-16 bg-border" aria-hidden="true" />
              <div className="text-center">
                <p className="text-sm font-medium text-text-secondary">
                  Father&apos;s Share
                </p>
                <p className="mt-1 text-4xl font-bold tabular-nums text-secondary-600">
                  {results.totals.father.toFixed(1)}%
                </p>
              </div>
              <div className="mx-auto h-px w-16 bg-border" aria-hidden="true" />
              <div className="text-center">
                <p className="text-sm font-medium text-text-secondary">
                  Dominant Parent
                </p>
                <p className="mt-1 text-lg font-semibold capitalize text-text">
                  {results.dominantParent}
                </p>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </section>
  );
}

export default ChartsSection;
