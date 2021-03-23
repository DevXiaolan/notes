import { history as router } from 'umi';

import {
  extend,
  RequestOptionsInit as UmiRequestOptionsInit,
  ResponseError,
} from 'umi-request';

export interface Response<T> {
  msg: string;
  code: number;
  data: T;
}

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  prefix: '',
});

/**
 * 业务错误处理
 * TODO
 */

request.interceptors.response.use(async (response) => {
  console.log(response);

  return response;
});

// request拦截器, 移除掉请求参数中值为 null 或者 undefined 的字段.
request.interceptors.request.use((url, options) => {
  let { params, data, headers } = options;

  if (typeof Headers === 'function' && headers instanceof Headers) {
    headers.append('power-by', 'DevXiaolan');
  } else if (typeof headers === 'object') {
    (headers as { [key: string]: any })['power-by'] = 'DevXiaolan';
  } else if (typeof headers === 'undefined') {
    headers = {
      'power-by': 'DevXiaolan',
    };
  }

  return {
    url,
    options: { ...options, data, params, headers },
  };
});

export default request;
