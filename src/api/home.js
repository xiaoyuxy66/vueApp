import axios from 'axios';
import { SUCC_CODE, TIMEOUT, HOME_RECOMMEND_PAGE_SIZE, jsonpOptions } from './config';
import jsonp from 'assets/js/jsonp';

export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider', {
    timeout: TIMEOUT
  }).then(res => {
    console.log(1);
    if (res.data.code === SUCC_CODE) {
      return res.data.slider;
    }
    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    console.log(2);
    if (err) {
      console.log(err);
    }
    return [
      {
        linkUrl: 'https://www.imooc.com',
        picUrl: require('assets/img/404.png')
      }
    ];
  }).then(res => {
    console.log(res);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res); // 不明白自己测试，我已经验证过了，要不就不加定时，加了定时就得返回一个promise，否则返回去的是一个没有值的promise对象。已经定时是异步，没有resolve不会执行
      }, 1000);
    });
  });
};

export const getHomeRecommend = (page = 1, pagesize = HOME_RECOMMEND_PAGE_SIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
    page,
    pagesize,
    type: 0,
    frontCatId: ''
  };
  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.code === '200') {
      return res;
    }
    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    console.log(err);
  }).then(res => {
    return new Promise(resolve => {
      console.log(res);
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};
