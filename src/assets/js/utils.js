// 节流函数
export const debounce = (func, delay = 200) => {
  let timer = null;
  return function (...args) {
    console.log(args);
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
// /**
//  * 函数防抖
//  */
// export function debounce(fn, delay) {
//   // 记录上一次的延时器
//   var timer = null;
//   var delay = delay || 200;
//   return function () {
//     var args = arguments;
//     var that = this;
//     // 清除上一次延时器
//     clearTimeout(timer)
//     timer = setTimeout(function () {
//       fn.apply(that, args)
//     }, delay);
//   }
// }
