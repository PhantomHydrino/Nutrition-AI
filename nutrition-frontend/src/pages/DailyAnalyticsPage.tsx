import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import AnalyticsChart from '../components/AnalyticsChart';
import { getDaily } from '../api/analytics';

const DailyAnalyticsPage: React.FC = () => {
  const [data, setData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    (async () => {
      const daily = await getDaily();

      setData([
        { label: 'Today', value: daily.calories },
        { label: 'Target', value: 2000 },
      ]);
    })();
  }, []);

  return (
    <div className="page">
      <Card title="Daily Calories">
        <AnalyticsChart data={data} />
      </Card>
    </div>
  );
};

export default DailyAnalyticsPage;