import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { useTheme } from "@/hooks/useTheme";
import { getThemeColors } from "@/constants/theme";
import type { PieChartDataPoint } from "@/utils/chartData";
import ChartTooltip from "@/components/charts/ChartTooltip";

interface ParentSharePieChartProps {
  data: PieChartDataPoint[];
  className?: string;
}

const TOTAL_DECIMALS = 1;

function ParentSharePieChart({ data, className }: ParentSharePieChartProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const percentFormatter = (value: number): string =>
    `${((value / total) * 100).toFixed(TOTAL_DECIMALS)}%`;

  const valueFormatter = (value: number): string => value.toFixed(3);

  return (
    <div className={className}>
      <div className="h-72 md:h-80 lg:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
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
                  fill: colors.chart.legendText,
                }}
              />
            </Pie>
            <Tooltip content={<ChartTooltip formatter={valueFormatter} />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Overall parent percentage share</caption>
        <thead>
          <tr>
            <th>Parent</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{((item.value / total) * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParentSharePieChart;
