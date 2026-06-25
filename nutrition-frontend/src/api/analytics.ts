
import api from './index';

export const getDaily = async () => {
  const res = await api.get('/analytics/daily');
  return res.data;
};

export const getWeekly = async () => {
  const res = await api.get('/analytics/weekly');
  return res.data;
};