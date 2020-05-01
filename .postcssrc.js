// https://github.com/michael-ciniawsky/postcss-load-config

//postcss-CSS后处理器  它本身没有什么，主要是它的插件特别多，用它的插件折腾css

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {} //浏览器前缀
  }
}
