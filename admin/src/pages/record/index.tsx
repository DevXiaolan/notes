import React, { useEffect, useState } from "react";
import { Table,Tag } from 'antd';

import styles from './styles.less';
import { IKeyword, IRecord } from "../../../../cron/src/common/type";
import { getRecords } from '../../services/api';


export default () => {
  const [data, setData] = useState<IRecord[]>([]);

  useEffect(() => {
    getRecords().then(v => {
      setData(v);
    })
  }, []);

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (title: string, record: IRecord) => (
        <a href={record.url}>{title}</a>
      )
    },
    {
      title: '关键词',
      dataIndex: 'keywords',
      render: (keywords: IKeyword[]) => {
        return keywords.map(({word})=>(
          <Tag>{word}</Tag>
        ))
      }
    },
    {
      title:'收录时间',
      dataIndex:'updatedAt',
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