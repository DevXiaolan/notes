import React from 'react';
import global from '../../store/global'
import { Input } from 'antd';

export default () => {
  const { token } = global.useState('token');

  return <>
    <p>
      当前 Token: {token}
    </p>
    <Input type="text" onBlur={e => {
      global.setState({ token: e.target.value });
    }} />
  </>;
};