import { useRedis } from '@mohism/core';

// 获取关键词列表
export default async () => {
  const redis = useRedis('default');
  const resp = await redis.get('all_keywords');
  
  return JSON.parse(resp || '[]');
};