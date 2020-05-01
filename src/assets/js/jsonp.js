import jsonp from 'jsonp';

const parseParam = (value) => {
  let arr = [];
  for (let key in value) {
    arr.push([key, value[key]]);
  }
  // [[page, 1], [pszie, 20]]
  // [page=1, psize=20]
  // page=1&psize=20
  return arr.map(value => { return value.join('='); }).join('&');
};

/**
 * data {page:1,psize:20}
 */
export default (url, data, options) => {
  url += (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data);
  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
