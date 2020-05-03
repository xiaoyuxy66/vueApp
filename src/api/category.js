import axios from 'axios';
import { SUCC_CODE, TIMEOUT } from './config';

// axios 提供的，防止多次点击
const CancelToken = axios.CancelToken;
let cancel;

export const getCategoryContent = (id) => {
  // 取消当前请求
  cancel && cancel('取消了前一次的请求！');
  cancel = null;

  return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
    timeout: TIMEOUT,
    // 取消当前请求
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  }).then(res => {
    if (res.data.code === SUCC_CODE) {
      return res.data.content;
    }
    throw new Error('没有获取成功');
  }).catch(err => {
    // 取消前一次的请求
    if (axios.isCancel(err)) {
      console.log(err);
    } else {
      // handle error
      console.log(err);
    }
  });
};
