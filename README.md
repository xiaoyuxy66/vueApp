# mall

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
 
 # vue创建移动端项目一些步骤：
 1. vue-cli vue init webpack project npm install 
 2. 修改eslintrc.js 根据团队需求做代码书写规范（后期总结具体内容）
 3. build、config是webpack的配置文件，修改相关的一点 （autoOpenBrowser: true）
 4. .gitignore .eslintignore 忽略文件配置
 5. 根据自己需求修改添加目录文件 
    1. static 静态文件webpack不会对其进行任何处理
    2. src-assets 公共资源文件 里面存放项目共用的js、css、img、fonts
    3. src-components 公共组件（针对本项目）
    4. src-base       基础组建（多个项目都能用）多数与业务逻辑无关  CSS/组件名命名规范
    5. src-pages      页面组件（本项目各个页面）  提供组件位置信息的容器
    6. src-api        服务器获取资源文件（接口）
6. 配置公共资源 base.css/reset.css/iconfont...
7. px2rem-loader 安装配置 loader一般都需要配置，在untils.js
8. 用的vue-cli2.X  安装对应sass-loader npm install sass-loader@6.0.7,  sass-loader依赖于node-sass,所以要安装node-sass
9. fastclick --解决移动端300ms延迟
10. babel-polyfill --低版本兼容es6
11. vue-awesome-swiper 幻灯片组件
12. 本地图片在js中要通过require引入，或者用important引入
13. 由于跨域安装jsonp 并封装将回调改为 promise
 
# 本项目用到的知识点
1. scss _iconfonts.scss 下划线文件scss内部文件
2. scss 引用scss文件前面要加～
3. 放在data里面的数据自动添加get set方法，是响应数据变化的数据，对于不需要响应变化的，直接放在created里面就可以
