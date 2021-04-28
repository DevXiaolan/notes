/**
 * 全局数据流范例
 * 在其他文件
 * import globalStore from '@/store/global';
 *
 * ...
 * const { siteName } = globalStore.useState('siteName')
 * ...
 */
import Rekv from 'rekv';

export interface IState {
  siteName: string;
  token: string;
}

const initialState: IState = {
  siteName: '这是一个网站',
  token: 'default',
};



export default new Rekv(initialState);
