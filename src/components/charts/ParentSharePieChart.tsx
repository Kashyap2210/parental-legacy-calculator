import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { THEME } from "@/constants/theme";
import type { PieChartDataPoint } from "@/utils/chartData";
import ChartTooltip from "@/components/charts/ChartTooltip";

interface ParentSharePieChartProps {
  data: PieChartDataPoint[];
  className?: string;
}

const TOTAL_DECIMALS = 1;

function ParentSharePieChart({ data, className }: ParentSharePieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const percentFormatter = (value: number): string =>
    `${((value / total) * 100).toFixed(TOTAL_DECIMALS)}%`;

  const valueFormatter = (value: number): string => value.toFixed(3);

  return (
    <div
      className={className}
      role="img"
      aria-label="Donut chart showing overall mother and father percentage share"
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            animationDuration={800}
          >
            {data.map((item) => (
              <Cell key={item.name} fill={item.color} />
            ))}
            <LabelList
              dataKey="value"
              formatter={percentFormatter}
              position="outside"
              style={{
                fontSize: 12,
                fontWeight: 600,
                fill: THEME.colors.text,
              }}
            />
          </Pie>
          <Tooltip content={<ChartTooltip formatter={valueFormatter} />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ParentSharePieChart;
