import { getKeyword } from '@/services/api';
import React, { useEffect, useState } from 'react';
import { message, Tag } from 'antd';

import styles from './style.less';

const getColor = (count: number) => {
  if (count > 10) {
    return 'red';
  }
  if (count > 8) {
    return 'orange';
  }
  if (count > 5) {
    return 'green';
  }
  return 'cyan';
};

export default () => {
  const [keyword, setKeyword] = useState([]);

  useEffect(() => {
    getKeyword()
      .then((data) => {
        setKeyword(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);

  return (
    <>
      {keyword.map(({ word, count }) => {
        return (
          <Tag className={styles.tag} color={getColor(count)}>
            {word} ({count})
          </Tag>
        );
      })}
    </>
  );
};
