# luban 是什么？

luban 是面向前端的工程构建工具。 根据项目需求生成demo和依赖,  解决前端工程中性能优化、自动化打包、开发规范、代码部署等问题。


### 安装luban

  ```
  1. 克隆 Luban 仓库到本地目录

  git clone https://github.com/duheng/luban.git

  2. 进入 luban 目录

  cd luban

  3. 安装依赖

  yarn (or) npm install

  4. 创建快捷链接

  npm link

  5. 安装完成，现在可以在全局使用luban
  ```
### 创建项目
```
1. 在你的工作目录执行

luban init helloWorld

2. 进入 helloWorld 目录执行

npm start

```

### 问题记录

```

1. react router4以上路由如果不加exact会出现路由变化但是页面并没有变化
2. npm 包加载顺序导致loader加载失败。
3. react-proxy-loader不支持react16，（react16中在基础包移除了React.createClass这种创建组件的方法，如果要用就要单独加载create-react-class，但是修改react-proxy-loader的源码不划算）， 所以用lazy-load-component替换
4.react router4中改变了router的push方法位置，换到history下，相当于以前用this.context.router.push('/some')跳转页面，现在用this.context.router.history.push('/some')


```
