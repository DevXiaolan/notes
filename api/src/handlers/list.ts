import { useModel, useRedis } from '@mohism/core';

// 获取了列表
export default async (keyword = '') => {
  if (keyword) {
    const redis = useRedis('default');
    const se = await redis.get(`se:${decodeURIComponent(keyword)}`);
    return se ? JSON.parse(se) : [];
  }
  const rows = await useModel('record').find({}, {
    title: 1,
    url: 1,
    'keywords.word': 1,
    // 'keywords._id': 0,
    updatedAt: 1,
    _id: 0,
  }, {
    sort: { createdAt: -1 },
  });
  return rows;
};