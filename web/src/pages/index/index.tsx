import { getKeywords } from '@/services/api';
import React, { useEffect, useState } from 'react';
import ReactWordcloud, { Word } from 'react-wordcloud';


export default () => {
  const [words, setWords] = useState<Word[]>([])
  useEffect(() => {
    getKeywords()
      .then(v => {
        setWords(v.map(({ word, count }: { word: string; count: number }) => ({
          text: word,
          value: count,
        })));
      })
  }, [])
  return (
    <div>
      <ReactWordcloud
        words={words}
        size={[600, 400]}
      />
    </div>
  );
};
