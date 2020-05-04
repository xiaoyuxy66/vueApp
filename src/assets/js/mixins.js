import { SEARCH_HISTORY_KEYWORD_KEY } from 'pages/search/config';
import storage from 'assets/js/storage';

export const searchMixin = {
  methods: {
    // 存缓存用于历史记录
    $_search_selectItem(keyword) {
      console.log(keyword);
      // 取出SEARCH_HISTORY_KEYWORD_KEY 如果没有设为[];
      let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
      if (keywords.length !== 0) {
        // 去除keyword
        keywords = keywords.filter(val => val !== keyword);
      }
      // 将keyword添加到数组头部
      keywords.unshift(keyword);
      storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);

      location.href = `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&q=${keyword}`;
    }
  }
};
