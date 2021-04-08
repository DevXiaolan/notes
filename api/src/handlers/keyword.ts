import { useRedis } from '@mohism/core';

// cache
export default async () => {
  const redis = useRedis('default');
  const resp = await redis.get('all_keywords');
  
  return JSON.parse(resp || '[]');
};