import React, { useEffect, useState } from "react";
import { Table } from 'antd';

import styles from './styles.less';
import { IBlack } from '../../../../cron/src/common/type';
import { getBlack } from '../../services/api';

export default () => {
  const [data, setData] = useState<IBlack[]>([]);

  const fetchData = async (): Promise<IBlack[]> => {
    return getBlack();
  }

  useEffect(() => {
    fetchData().then(v => {
      setData(v);
    })
  }, []);

  const columns = [
    {
      title: '关键词',
      dataIndex: 'word',
    },
    {
      title: '修正系数',
      dataIndex: 'score',
    },
    {
      title:'操作',
      dataIndex: 'word',
      render:(word: string)=>{
        return (
          <a>修正</a>
        );
      }
    }
  ];
  return (
    <div className={styles.container}>
      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}