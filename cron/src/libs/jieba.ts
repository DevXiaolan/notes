import { extract, load } from 'nodejieba';
import { Dict } from '@mohism/utils';

const BLACKS = require(`${__dirname}/../../black_words.json`);
export interface IKeyword {
  word: string;
  score: number;
}

export default (title: string, content: string): Array<IKeyword> => {
  const M: Dict<number> = {};
  extract(
    content.replace(/\n/g, '')
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

  extract(title, 3).forEach(record => {
    const w = record.word.toLowerCase();
    if (!M[w]) {
      // title的关键词是对内容的加成，如果内容里本来不存在这个词，就是识别错误，忽略标题里的这个词
      return;
    }
    M[w] += record.weight * 10;
  });
  return Object
    .entries(M)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({
      word: k,
      score: v,
    }))
    .slice(0, 5);
}