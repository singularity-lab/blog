---
layout:     post
title:      vue&vue-router
date:       2019-04-28
author:     Cathandra
categories:
    - 开发部
tags:
    - 前端
    - Vue.js
---
因为vue本身的语法比较简单，所以这次先简单罗列一个vue的知识点，然后就直接复习vue-router。

## vue基础

### MVVM模式

>使用Vue的过程就是定义MVVM各个组成部分的过程的过程。
>其中ViewModel是Vue.js的核心，它是一个Vue实例。当创建了ViewModel后：
>从View侧看，ViewModel中的DOM Listeners工具会帮我们监测页面上DOM元素的变化，如果有变化，则更改Model中的数据；
>从Model侧看，当我们更新Model中的数据时，Data Bindings工具会帮我们更新页面中的DOM元素。

举个例子：

```html
<div id="app">
    <p>{{ msg }}</p>
    <input v-model="message" />
</div>
<!--引入vue-->
<script>
    var exampleData = {
        message: 'Hello Vue'
    }

    // 创建一个 Vue 实例或 "ViewModel"
    // 连接 View 与 Model
    new Vue({
        el: '#app',
        data: exampleData
    })
</script>
```

如果在`input`框中输入新值，显示的文本的值也会变化；如果改变`message`，`input`框也会发生变化。

### 内置指令

- v-if指令
- v-show指令
- v-else指令
- v-for指令
- v-bind指令
- v-on指令

注意区分`v-if`和`v-show`在渲染时的不同。
注意`v-bind`和`v-on`可以缩写为`:`和`@`。

### vue组件化

组件化相当于一个功能模块，是独立存在的，可复用的。它不单单有页面，还有业务逻辑和样式。

好处：可实现功能模块的复用，提高项目执行效率，适用开发复杂的页面应用，方便代码阅读和维护；  
缺点：状态管理问题（vuex），多组件、多页面、复杂业务混合使用（vue-router）,组件间传参、事件管理（props、emit/on、bus）。

## vue-router

### 环境搭建

准备工作：查看npm与弄得版本;

```node
npm -v
node -v
```

首先全局安装vue-cli：

```node
npm install -g @vue/cli
```

其次，进入项目目录初始化项目：

```node
vue create project_name
```

初始化成功后，根据提示进入项目文件夹，启动运行项目：

```node
cd project_name
npm run dev
```

### 路由步骤

#### 页面路由

在实际项目中，通常的做法是将路由配置单独提出来，所以先在src文件夹下面新建一个文router.config.js进行路由配置：

{
    path: /路径,
    name: 路由的名称,
    component: 对应引入的具体组件,

}

```js
import Home from './views/Home.vue'
import Info from './views/info.vue'
export default{
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
  ]
}
```

然后在入口文件main.js中引入。

```js
import routerconfig from './router.config.js'

Vue.use(VueRouter);
const router = new VueRouter(routerConfig);
```


#### 页面渲染——router-link 以及router-view

在App.vue页面中，使用<router-link>和<router-view>标签连接到组件，配置路由切换和显示当前的路由组件视图。

## 参考资料

- [Vue官方文档](https://router.vuejs.org/zh/)  
- [慕课网 - Vue2.x核心技术](https://www.imooc.com/learn/1091)