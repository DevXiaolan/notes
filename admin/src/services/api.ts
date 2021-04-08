import request from '@/utils/request';

// example
export const getUser = async (uid: number) => {
  const { data } = await request(`/user/${uid}`, { method: 'GET' });
  return data;
};
