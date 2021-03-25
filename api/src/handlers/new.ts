import { HTTP_METHODS, useModel } from '@mohism/core';
import { IRecord, TRecordStatus } from '../common/type';

export const method = HTTP_METHODS.POST;

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