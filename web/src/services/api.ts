import request from '@/utils/request';

export const getKeywords = async () => {
  const { data } = await request(`/api/keyword`, { method: 'GET' });
  return data;
};
