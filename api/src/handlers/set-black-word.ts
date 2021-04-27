import { HTTP_METHODS, IMiddleware, useModel } from '@mohism/core';

import { TRecordStatus } from '../common/type';
import auth from '../middlewares/auth';

export const method = HTTP_METHODS.POST;

export const middlewares: IMiddleware[] = [auth];

// 设置一个禁用词
export default async (word: string, score: number = 0) => {
  await useModel('black').updateOne({
    word: decodeURIComponent(word),
  }, {
    word: decodeURIComponent(word),
    score: +score,
  }, {
    upsert: true,
  });
  // 禁用词变化后 被分析出有这个关键词的记录，都要重新分析
  await useModel('record').updateMany({
    'keywords.word': decodeURIComponent(word),
  }, {
    '$set': {
      status: TRecordStatus.CREARE,
    },
  })
}