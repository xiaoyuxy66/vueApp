import axios from 'axios';
import { TIMEOUT, jsonpOptions } from './config';
import jsonp from 'assets/js/jsonp';

// 获取热门数据
export const getSearchHotList = () => {
  return axios.get('http://www.imooc.com/api/search/hot', {
    timeout: TIMEOUT
  }).then(res => {
    res = res.data.hotKeyWord;

    // succeed
    if (res && res.owner) {
      return res.owner;
    }
    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    console.log(err);
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};

// 获取搜索结果
export const getSearchResult = (keyword) => {
  const url = 'https://suggest.taobao.com/sug';
  const params = {
    q: keyword,
    code: 'utf-8',
    area: 'c2c',
    nick: '',
    sid: null
  };

  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.result) {
      console.log(res.result);
      return res.result;
    }
    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    console.log(err);
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};
