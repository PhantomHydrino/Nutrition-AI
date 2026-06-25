
import React, { useEffect, useState } from 'react';
import HistoryList from '../components/HistoryList';
import { getHistory } from '../api/food';
import Card from '../components/Card';

const HistoryPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getHistory();
      setLogs(data);
    })();
  }, []);

  return (
    <div className="page">
      <Card title="Your Food History">
        <HistoryList logs={logs} />
      </Card>
    </div>
  );
};

export default HistoryPage;