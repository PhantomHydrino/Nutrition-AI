
import api from './index';

export const analyzeFood = async (food: string) => {
  const res = await api.post('/food/analyze', { food });
  return res.data;
};

export const getHistory = async () => {
  const res = await api.get('/food/history');
  return res.data;
};