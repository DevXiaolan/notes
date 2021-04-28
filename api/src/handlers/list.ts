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
    keywords: 1,
    updatedAt: 1,
  }, {
    sort: { createdAt: -1 },
  });
  return rows;
};