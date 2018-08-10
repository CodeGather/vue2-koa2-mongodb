# vue2-koa2-mongodb
vue2-koa2-mongodb搭建的博客

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
