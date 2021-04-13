import { HTTP_METHODS, useModel } from "@mohism/core";

export const method = HTTP_METHODS.POST;

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
}