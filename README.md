# vue2-koa2-mongodb
>vue2-koa2-mongodb搭建的博客

``` bash
#搭建流程

#安装koa-generator
npm install -g koa-generator

#在当前文件夹下生成项目
koa2 .

#安装依赖
npm install

#安装进程守护
npm install -g pm2

#使用pm2开启服务
pm2 start ./bin/www

#报错信息解决办法
ChromeDriver installation failed Error with http(s) request: Error: read ETIMEDOUT

#再次执行
npm install
```

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

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
