import { useModel } from '@mohism/core';
import { useRedis } from '@mohism/core/dist/engine/service/hooks';

const PAGE_SIZE = 10;

// 获取了列表
export default async (keyword = '', page = 1) => {
  if (keyword) {
    const redis = useRedis('default');
    const se = await redis.get(`se:${decodeURIComponent(keyword)}`);
    return se ? JSON.parse(se) : [];
  }
  const rows = await useModel('record').find({}, {
    title: 1,
  }, {
    skip: PAGE_SIZE * (page - 1),
    limit: PAGE_SIZE,
    sort: { createdAt: -1 },
  });
  return rows;
};