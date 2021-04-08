import React from 'react';
import styles from './styles.less';
import Header from '@/components/header';

export default () => {
  return (
    <div>
      <Header />
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
};
