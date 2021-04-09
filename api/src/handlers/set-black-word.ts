import { HTTP_METHODS, useModel } from "@mohism/core";

export const method = HTTP_METHODS.POST;

export default async (word: string, score: number = 0) => {
  await useModel('black').updateOne({
    word,
  }, {
    word,
    score,
  }, {
    upsert: true,
  });
}