import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import AnalyticsChart from '../components/AnalyticsChart';
import { getWeekly } from '../api/analytics';

const WeeklyAnalyticsPage: React.FC = () => {
  const [data, setData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    (async () => {
      const weekly = await getWeekly();

      const chartData = Object.entries(weekly).map(([day, calories]) => ({
        label: new Date(day).toLocaleDateString(undefined, {
          weekday: 'short',
        }),
        value: calories as number,
      }));

      setData(chartData);
    })();
  }, []);

  return (
    <div className="page">
      <Card title="Weekly Calories">
        <AnalyticsChart data={data} />
      </Card>
    </div>
  );
};

export default WeeklyAnalyticsPage;