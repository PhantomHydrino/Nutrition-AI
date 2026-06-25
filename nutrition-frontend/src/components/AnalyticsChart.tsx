import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useIsMobile } from '../hooks/useScreenWidth';

type Props = {
  data: { label: string; value: number }[];
};

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#A28CFF',
  '#FF6699'
];

const AnalyticsChart: React.FC<Props> = ({ data }) => {
  
  const isMobile = useIsMobile();
  
  const chartData = data.map((item, index) => ({
    name: item.label,
    value: item.value,
    fill: COLORS[index % COLORS.length]
  }));



  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={isMobile? 90:120 }
            label={({ name, percent }) =>
              `${name} (${((percent || 0) * 100).toFixed(0)}%)`
            }
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;