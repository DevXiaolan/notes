import { extract, load } from 'nodejieba';
import { Dict } from '@mohism/utils';
import { useModel } from '@mohism/core';
import { IBlack } from '../common/type';

export interface IKeyword {
  word: string;
  score: number;
}

export default async (title: string, content: string, meta: { keyword?: string | null } = {}): Promise<Array<IKeyword>> => {

  const BLACKS = (await useModel('black').find({}))?.reduce((state, cur) => {
    const { word, score } = cur as unknown as IBlack;
    state[word] = score;
    return state;
  }, {} as Dict<number>)

  const M: Dict<number> = {};

  // 第一步，计算内容基本分
  extract(
    content.replace(/\n/g, '')
      .replace(/(<style>.*?<\/style>)/ig, '')
      .replace(/(<pre>.*?<\/pre>)/ig, '')
      .replace(/(<code>.*?<\/code>)/ig, '')
      .replace(/<[^>]*>/g, ' '), 20).forEach(record => {
        const w = record.word.toLowerCase();
        if (!Number.isNaN(+w)) {
          // 如果关键词是一个数字，我认为这是没什么意义的
          return;
        }
        M[w] = M[w] || 0;
        M[w] += record.weight * (BLACKS[w] ?? 1);
      });

  // 第二部， 计算页面 title 加成
  extract(title, 3).forEach(record => {
    const w = record.word.toLowerCase();
    if (!M[w]) {
      // title的关键词是对内容的加成，如果内容里本来不存在这个词，就是识别错误，忽略标题里的这个词
      return;
    }
    M[w] += record.weight * 10;
  });

  // 第三步，计算 meta.keywords 加成
  if (meta.keyword) {
    extract(meta.keyword, 3).forEach(record => {
      const w = record.word.toLowerCase();
      if (!M[w]) {
        return;
      }
      M[w] = M[w] * 2;
    })
  }
  return Object
    .entries(M)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({
      word: k,
      score: v,
    }))
    .slice(0, 5);
}