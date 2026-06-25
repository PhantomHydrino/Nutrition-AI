import api from './index';



export const register = async (email: string, password: string) => {
  return await api.post('/auth/register', { email, password });
};

export const login = async (email: string, password: string) => {
  
  const res = await api.post('/auth/login', { email, password });

  return res.data.token;
};
