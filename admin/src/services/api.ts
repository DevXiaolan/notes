import request from '@/utils/request';

export const getRecords = async () => {
  const { code, data, message } = await request('/api/list');
  if (code === 0) {
    return data;
  }
  throw new Error(message);
}

export const getKeyword = async () => {
  const { code, data, message } = await request('/api/keyword');
  if (code === 0) {
    return data;
  }
  throw new Error(message);
};

export const getBlack = async () => {
  const { code, data, message } = await request('/api/black-word');
  if (code === 0) {
    return data;
  }
  throw new Error(message);
}

export const setBlack = async (word: string, score = 0, token = '') => {
  const { code, data, message } = await request('/api/set-black-word',
    {
      method: 'POST',
      headers: {
        token,
      },
      data: {
        word,
        score,
      }
    });
  if (code === 0) {
    return data;
  }
  throw new Error(message);
}