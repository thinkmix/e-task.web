# verisign.com_bs

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost
yarn serve

# build for production with minification
yarn build

```

#架构目录
```
├── public（静态资源）
├── src
│   ├── assets（公共资源）
│   │   ├── fonts
│   │   ├── images
│   │   └── css
│   ├── components（公共组件）
│   ├── config（配置）
│   ├── router（路由）
│   ├── store（vuex）
│   ├── utils（公共工具）
│   └── views
│       ├── index.vue（主视图）
│       └── login.vue（登录页面）
└── vue.config.js（webpack相关配置）
```