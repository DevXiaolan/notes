import { Dict } from '@mohism/utils';
import { extract } from 'nodejieba';

export type TWordScore = [string, number];

export default (input: string): Array<TWordScore> => {
  const M: Dict<number> = {};
  extract(input, 20).forEach(record => {
    const w = record.word.toLowerCase();
    M[w] = M[w] || 0;
    M[w] += record.weight;
  });
  return Object.entries(M).sort((a, b) => b[1] - a[1]).slice(0, 10);
};