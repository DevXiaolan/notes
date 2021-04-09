import request from '@/utils/request';

// example
export const getKeyword = async () => {
  const { code, data, message } = await request('/api/keyword');
  if (code === 0) {
    return data;
  }
  throw new Error(message);
};
