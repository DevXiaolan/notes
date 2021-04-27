import { HTTP_METHODS, IMiddleware, useModel } from '@mohism/core';

import { TRecordStatus } from '../common/type';
import auth from '../middlewares/auth';

export const method = HTTP_METHODS.POST;
export const middlewares: IMiddleware[] = [auth];
// 收录
export default async (url: string) => {
  // todo 去重检查
  await useModel('record').updateOne(
    { url },
    { url, status: TRecordStatus.CREARE },
    { upsert: true },
  );
  return;
};