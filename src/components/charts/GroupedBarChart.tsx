import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { THEME } from "@/constants/theme";
import type { BarChartDataPoint } from "@/utils/chartData";
import ChartTooltip from "@/components/charts/ChartTooltip";

interface GroupedBarChartProps {
  data: BarChartDataPoint[];
  className?: string;
}

const FORMATTER = (value: number): string => value.toFixed(3);

function GroupedBarChart({ data, className }: GroupedBarChartProps) {
  return (
    <div
      className={className}
      role="img"
      aria-label="Grouped bar chart showing mother and father influence across life factors"
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 60 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={THEME.colors.chart.grid}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: THEME.colors.text }}
            angle={-35}
            textAnchor="end"
            interval={0}
            height={80}
          />
          <YAxis
            tick={{ fontSize: 12, fill: THEME.colors.text }}
            tickFormatter={FORMATTER}
          />
          <Tooltip content={<ChartTooltip formatter={FORMATTER} />} />
          <Legend />
          <Bar
            dataKey="mother"
            name="Mother"
            fill={THEME.colors.chart.mother}
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
          <Bar
            dataKey="father"
            name="Father"
            fill={THEME.colors.chart.father}
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GroupedBarChart;
