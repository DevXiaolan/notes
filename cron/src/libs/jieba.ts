import { extract } from 'nodejieba';
import { Dict } from '@mohism/utils';

export default (title: string, content: string): Array<string> => {
  const M: Dict<number> = {};
  extract(content, 20).forEach(record => {
    const w = record.word.toLowerCase();
    M[w] = M[w] || 0;
    M[w] += record.weight;
  });
  extract(title, 3).forEach(record => {
    const w = record.word.toLowerCase();
    M[w] = M[w] || 0;
    M[w] += record.weight * 10;
  })
  return Object
    .entries(M)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 3);
}