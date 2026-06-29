
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { getDaily, getWeekly } from '../api/analytics';
import { useNavigate } from 'react-router-dom';
import FoodForm from '../components/FoodForm';
import HistoryList from '../components/HistoryList';
import { getHistory } from '../api/food';




const DashboardPage: React.FC = () => {
  const [daily, setDaily] = useState<any>(null);
  const [weekly, setWeekly] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const navigate = useNavigate();

  const loadDashboardData = async () => {
    const d = await getDaily();
    setDaily(d);

    const w = await getWeekly();
    setWeekly(w);

    const hist = await getHistory();
    setLogs(hist);
  };

  useEffect(() => {
    loadDashboardData()
  }, []);

  return (
    <div className="dashboard-grid">
      <Card title="Today" subtitle="Calorie intake for today">
        <div>Calories: {daily?.calories ?? '-'}</div>
        <div>Insight: {daily?.insight ?? '-'}</div>
      </Card>
      <Card title="This Week" subtitle="Total calories per day">
       {weekly &&
        Object.entries(weekly).map(([day, calories]) => (
          <div key={day}>
            {new Date(day).toLocaleDateString(undefined, {
              weekday: 'long',
            })}
            : {calories as number} calories
          </div>
        ))}
      </Card>
      <Card title="Add Food" subtitle="Quick analysis">
        <FoodForm onLog={async() => {
          await loadDashboardData();
        }} />
      </Card>
      <Card title="Recent Activity" subtitle="Latest logs">
        <HistoryList logs={logs} />
      </Card>
      <Card title="Navigate">
        <Button onClick={() => navigate('/analyze')}>Analyze Food</Button>
      </Card>
    </div>
  );
};

export default DashboardPage;
