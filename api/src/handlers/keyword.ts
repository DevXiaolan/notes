import { useRedis } from '@mohism/core';

export default async () => {
  const redis = useRedis('default');
  const resp = await redis.get('all_keywords');
  
  return JSON.parse(resp || '[]');
};