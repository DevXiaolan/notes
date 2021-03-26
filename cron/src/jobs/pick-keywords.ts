import { ICronexpr, useModel, useRedis } from '@mohism/core';
import { Logger, Dict } from '@mohism/utils';
import { IRecord, TRecordStatus } from '../common/type';
import { Redis } from 'ioredis';
const logger = Logger();

/**
 * 重生生成 keywords 列表，并重建索引
 */
export default {
  name: 'rebuild keywords list',
  expr: '*/10 * * * * *',
  immediate: true,
  func: async () => {
    const all = await useModel<IRecord>('record').find({ status: TRecordStatus.OK }, { keywords: 1, title: 1 });
    const result = all.reduce((state, cur) => {
      const { _id, title = '', keywords = [] } = cur;
      keywords.forEach(({ word, score }) => {
        state[word] = state[word] || [];
        state[word].push({
          _id,
          title,
          score,
        });
        state[word].sort((a, b) => b.score - a.score);
      });
      return state;
    }, {} as Dict<Array<{ _id: string, title: string, score: number }>>);
    const redis = useRedis('default');
    await redis.set(
      'all_keywords',
      JSON.stringify(
        Object.entries(result)
          .map(([key, values]) => ({
            word: key,
            count: values.length,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 20)
      )
    );
    Object.entries(result)
      .forEach(async ([key, values]) => {
        await redis.set(`se:${key}`, JSON.stringify(values), 'EX', 30);
      });
    logger.info('索引的重建完毕')
  }
} as ICronexpr;