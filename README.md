# Luban

Luban 是一个基于 webpack 的打包工具,优势是独立于具体项目便于统一维护升级，开发调试


### 安装Luban

  ```
  1. 克隆 Luban 仓库到本地目录

  git clone https://github.com/duheng/Luban.git

  2. 进入 Luban 目录

  cd Luban

  3. 创建快捷链接

  npm link

  4. 安装完成，现在可以在全局使用luban
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


```
