import axios from 'axios';
import { SUCC_CODE, TIMEOUT, HOME_RECOMMEND_PAGE_SIZE, jsonpOptions } from './config';
import jsonp from 'assets/js/jsonp';

// 打乱数组顺序
const shuffle = (arr) => {
  const arrLength = arr.length;
  let i = arrLength;
  let rndNum;

  while (i--) {
    if (i !== (rndNum = Math.floor(Math.random() * arrLength))) {
      [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]];
    }
  }

  return arr;
};

export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider', {
    timeout: TIMEOUT
  }).then(res => {
    console.log(1);
    if (res.data.code === SUCC_CODE) {
      // return res.data.slider; 正常返回这个就可以，现在模拟update接口，就是每次获取的slider不一样
      let sliders = res.data.slider;
      // 随机获取一张图片的数组
      const slider = [sliders[Math.floor(Math.random() * sliders.length)]];
      sliders = shuffle(sliders.filter(() => Math.random() >= 0.5));
      if (sliders.length === 0) {
        sliders = slider;
      }
      return sliders;
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
