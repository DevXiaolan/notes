import { HTTP_METHODS, useModel } from '@mohism/core';
import { IRecord } from '../common/type';

export const method = HTTP_METHODS.POST;

// 收录
export default async (url: string) => {
  // todo 去重检查
  await useModel('record').create<IRecord>({
    url,
  })
  return;
}