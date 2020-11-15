---
layout: post
title: JavaScript 异步
date: 2019-05-05
author: Hivol
categories:
  - 开发部
tags:
  - 前端
  - JavaScript
---

## 什么是异步？

**同步**：代码由上往下依次执行。一个任务执行完了，得到结果，才会执行下一个任务。

```javascript
taskA();
taskB();
taskC();
// 执行顺序 A => B => C
```

在同步模式，浏览器会顺序执行 `taskA`，再执行 `taskB`，最后执行 `taskC`。如果 `taskB` 是一个耗时很长的网络任务，那么 `taskC` 也只能等其完成之后才能执行。可能会使网页陷入阻塞状态。

**异步**：把网络请求/IO 任务等耗时操作交给其他线程执行，后续任务不用等待这些耗时操作执行完毕。

```javascript
taskA();
ajax("url", function taskB() {
  // 在未来某个时刻执行
});
taskC();
// 执行顺序 A => C => B
```

在异步模式中，浏览器执行完 `taskA` 之后，把网络请求交给了其他线程执行，紧接着继续执行 `taskC`。

## 了解异步需要知道的 JavaScript 知识

JavaScript 语言的执行环境是单线程（Single Thread）的，但是浏览器的内核是多线程的。一个浏览器通过有以下几个线程：

- 渲染引擎线程
- JS 引擎线程
- 定时触发器线程
- 事件触发线程
- 异步 HTTP 请求线程

JavaScript 程序就是在 JS 引擎线程中执行的，当遇到异步网络请求时，便转交给异步 HTTP 请求线程执行。

## JavaScript 异步的几种方法

### 1. 回调函数 callback

```javascript
taskA();

ajax('url1', function(){
    taskB();

    ajax('url2', function(){
        taskC();
    }
    taskD();

});
taskE();
// 执行顺序 A => E => B => D => C
```

`ajax()` 请求网络资源，被转交给其他线程处理。有关回调函数的介绍在另一博客中有写。

### 2. promise

由于回调函数存在着阅读性差，容易陷入"回调地狱"等缺点（如下图），故在 ES6 中，加入了 promise，提供了更好的异步写法。

![回调地狱](../imgs/1905/01/Hivol/callback-hell.png)

下面我们来看看典型的 promise 对象的应用：

```javascript
var fetch = function(url){
    // 返回一个新的 Promise 实例
    return new Promise(function (resolve,reject) {
        ajax(url,resolve,reject);
    });
}

taskA();
fetch('url1').then(function(){
    taskB();
    // 返回一个新的 Promise 实例
    return fetch('url2');
}).catch(function(){
    // 异常的时候也可以返回一个新的 Promise 实例
    return fetch('url2');
    // 使用链式写法调用这个新的 Promise 实例的 then 方法
}).then(function() {
    taskC();
    // 继续返回一个新的 Promise 实例...
}).then(function() {
    taskD();
    // 继续返回一个新的 Promise 实例...
// A B C D ...
```

采用 `.catch()` 和 `.then()` 的形式实现异步操作，在获取到相关网络资源后，再调用函数。

### 3. Async/await

在 ES7 中加入的 Async/await 可以使 promise 更加易用。

```javascript
async function f() {
  var value = await timer(100);
  return value;
}

f().then(alert); // done
```

在函数之前加入 `async` 关键字，即可声明一个异步函数，使函数返回一个 promise。而使用 `await`，便可使其下的语句等到该行语句执行完成之后才执行。

以下是使用 `async` 调用网络资源的典型应用：

```javascript
var fetch = function(url) {
  return new Promise(function(resolve, reject) {
    ajax(url, resolve, reject);
  });
};

async function main() {
  try {
    var value = await fetch("url");
    conosle.log(value);
  } catch (err) {
    console.error(err);
  }
}

main();
```

这个功能让我们可以使用普通函数的写法实现异步的功能，使得代码的可读性进一步增强。

## 参考资料

1. [现代 JavaScript 教程](https://zh.javascript.info/)
2. [Javascript 异步编程的 4 种方法 —— 阮一峰](<[http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html](http://www.ruanyifeng.com/blog/2012/12/asynchronous＿javascript.html)>)
