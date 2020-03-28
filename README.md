<h1 align="center">菜鸟驿站后台管理系统</h1>
环境和依赖
----
- node
- yarn
- webpack
- eslinta
- @vue/cli ~3
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现
- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - Alipay AntV 数据可视化图表
- [data-view](https://github.com/jiaming743/DataV) - 数据可视化组件，提供SVG的边框及装饰、图表、水位图、飞线图等组件
- [vue2-editor](https://github.com/davidroyer/vue2-editor) - 提供对vue的富文本编辑功能支持
- [Mockjs](https://github.com/nuysoft/Mock) - 生成随机数据，拦截并在本地环境模拟 Ajax 请求
- [@vue/test-utils](https://github.com/vuejs/vue-test-utils) 单元测试工具

项目下载和运行
----

- 拉取项目代码
```bash
SSH   git clone git@code.aliyun.com:rongxinhui/newbie_system.git
HTTP  git clone https://code.aliyun.com/rongxinhui/newbie_system.git
cd newbie_system
```

- 安装依赖
  
```
npm install
```
npm在大陆速度不稳定，推荐使用cnpm或yarn安装项目依赖项
```
cnpm install 或 yarn
```

- 本地运行
```
npm run serve 或 yarn serve
```
- 编译项目
```
npm run build 或 yarn build
```

```
项目在本地环境测试环境中使用Mockjs模拟服务端请求数据，编译时会关闭mock，如果想在编译时保留mock数据，可以使用
yarn build:preview 进行编译处理
```

单元测试覆盖率
----

File      |  % Stmts | % Branch |  % Funcs |  % Lines |
----------|----------|----------|----------|----------|
All files |       75 |    87.72 |       75 |    74.65 |
 table.js |      100 |      100 |      100 |      100 |
 util.js  |    72.31 |    86.79 |    70.59 |    71.88 |