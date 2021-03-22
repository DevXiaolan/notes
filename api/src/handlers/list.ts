import { useModel } from '@mohism/core';
import { useRedis } from '@mohism/core/dist/engine/service/hooks';

const PAGE_SIZE = 10;

// 获取了列表
export default async (page = 1) => {
  const rows = await useModel('record').find({}, {}, {
    skip: PAGE_SIZE * (page - 1),
    limit: PAGE_SIZE,
    sort: { createdAt: -1 },
  });
  return rows;
};