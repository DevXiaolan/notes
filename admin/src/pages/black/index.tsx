import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Input, Button, notification } from 'antd';

import styles from './styles.less';
import { IBlack } from '../../../../cron/src/common/type';
import { getBlack, setBlack } from '../../services/api';
import global from '../../store/global'

const emptyBlack: IBlack = {
  word: "",
  score: 0,
};

export default () => {
  const { token } = global.useState('token');
  const [visible, toggleVisible] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<IBlack[]>([]);

  const fetchData = async (): Promise<IBlack[]> => {
    return getBlack();
  }

  useEffect(() => {
    fetchData().then(v => {
      setData(v);
    });
  }, []);

  const columns = [
    {
      title: '关键词',
      dataIndex: 'word',
      key: 'word',
    },
    {
      title: '修正系数',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '操作',
      key: 'word',
      dataIndex: 'word',
      render: (word: string, item: IBlack) => {
        return (
          <a
            onClick={() => {
              form.setFieldsValue(item);
              toggleVisible(true);
            }}
          >
            修正
          </a>
        );
      }
    }
  ];

  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={() => {
          form.setFieldsValue(emptyBlack);
          toggleVisible(true);
        }}
      >
        创建条目
      </Button>
      <Table
        columns={columns}
        dataSource={data}
      />
      <Modal
        title="系数修正"
        visible={visible}
        onOk={() => {
          const { word, score = 1 } = form.getFieldsValue();
          setBlack(word, score, token)
            .then(() => {
              notification.success({
                message: '成功哈'
              });
            })
            .catch(e => {
              notification.error({
                message: e.message,
              });
            })
            .finally(()=>{
              toggleVisible(false);
              fetchData().then(v => {
                setData(v);
              });
            });
        }}
        onCancel={() => {
          toggleVisible(false);
          form.setFieldsValue(emptyBlack);
        }}
      >
        <Form
          form={form}
          {...formLayout}
        >
          <Form.Item
            name="word"
            label="关键词"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="score"
            label="系数"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}