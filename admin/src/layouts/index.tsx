import {
  BasicLayout as ProLayoutComponents,
  BasicLayoutProps as ProLayoutComponentsProps,
  MenuDataItem,
} from '@ant-design/pro-layout';
import { ReadOutlined, FieldNumberOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import { Helmet, Link } from 'umi';

import styles from './styles.less';

export interface BasicLayoutProps
  extends ProLayoutComponentsProps {
  sideBar: MenuDataItem[];
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: object;
  siteConfig: object;
}

const menus: MenuDataItem[] = [
  {
    path: '/record',
    name: '知识',
    icon: <ReadOutlined />,
  },
  {
    path: '/keyword',
    name: '关键词',
    icon: <FieldNumberOutlined />,
  },
  {
    path: '/black',
    name: '禁用词',
    icon: <FundProjectionScreenOutlined />,
  },
];

const BasicLayout: React.FC<BasicLayoutProps> = props => {

  const { children } = props;

  return menus.length ? (
    <ProLayoutComponents
      logo={false}
      menuHeaderRender={false}
      menuItemRender={(menuItemProps) => {
        return (
          <Link
            className={styles.menu}
            to={menuItemProps.path as string}
          >
            {menuItemProps.icon}<span>{menuItemProps.name}</span>
          </Link>
        );
      }}
      menuDataRender={() => {
        console.log('Final Menu', menus);
        return menus
      }}
      navTheme="light"
      layout="top"
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>知识</title>
      </Helmet>
      {children}
    </ProLayoutComponents>
  ) : <Spin />;
};


export default BasicLayout;
