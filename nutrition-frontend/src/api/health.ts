import api from './index';


/**
 * Create / Update health profile
 * POST /health/profile
 */
export const updateHealthProfile = async (profile: {
  age: number;
  gender: string;
  height: number;
  weight: number;
  activity_level: string;
}) => {
  const res = await api.post("/health/profile", profile);
  return res.data;
};

/**
 * Get health profile
 * GET /health/profile
 */
export const getHealthProfile = async () => {
  const res = await api.get("/health/profile");
  return res.data;
};

/**
 * Dashboard endpoint
 * GET /health/summary
 */
export const getHealthSummary = async () => {
  const res = await api.get("/health/summary");
  return res.data;
};