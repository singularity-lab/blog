---
layout: post
title: JavaScript 回调
date: 2019-04-28
author: Hivol
categories:
    - 开发部
tags:
    - 前端
    - JavaScript
---

**回调函数**：通过引用提供给另一个函数调用的函数。

> A callback is a function that is passed as an argument to another function and is executed after its parent function has completed.

回调的表现形式为函数 A 作为函数 B 的参数，被函数 B 调用。此时的函数 A 就是回调函数。

## 了解回调需要知道的 JavaScript 知识

1. JavaScript 基础知识
2. JavaScript 闭包

> 这两点都可以在另一篇 [博客](https://singularity-lab-blog.now.sh/views/dev/2019-04-21-JavaScript闭包.html#了解闭包需要知道的-javascript-知识) 中看到。

## 回调的典型形式

```javascript
function doSomething(msg, callback) {
    alert(msg);
    if (typeof callback == "function") callback();
}
doSomething("回调函数", function() {
    alert("匿名函数实现回调!");
});
```

此例中，在调用 `doSomething` 时，把一个匿名函数传了进去，而 `doSomething` 在执行完自己的任务 `alert(msg)` 之后，接着执行了该匿名函数。

执行的结果：先提示了"回调函数"，再提示了"匿名函数实现回调！"。

## 回调的作用

### 异步回调

JavaScript 的执行环境往往是在浏览器中，其任务也经常与调用网络资源有关（如：Ajax），所以我们经常需要判断某一网络资源是否执行完成，这样便可进行下一步操作。当我们有了回调函数之后，我们便可以把网络任务之后需要执行的任务写成一个回调函数，如：

```javascript
$.get("ajax/test.html", function(data) {
    $("#box").html(data);
});
```

这样便可在获取到网络资源之后，执行该 DOM 操作。

> JavaScript 异步不止可以使用回调函数，也有其他方法，将在后续博客中更新。

### 同步调用

```javascript
// 排序
function sort(parms, callback) {
    var list = JSON.stringify(parms);
    if (typeof callback == "function") {
        callback(list);
    }
}

// 冒泡排序
function bubbleSort(arr) {
    //处理数组
}

sort("[2, 1, 3]", bubbleSort);
```

这样便可以在调用 `sort` 函数时把自定义的排序方法传进去，这样 `sort` 函数便可以实现不同的排序方法了。

### 点击事件

```javascript
$("#myBtn").click(function() {
    alert("click myBtn!");
});
```

通过回调函数告诉 `click` 函数点击之后执行的事件。

## 参考资源

1. [Javascript 异步编程的 4 种方法](http://www.ruanyifeng.com/blog/2012/12/asynchronous＿javascript.html)
2. [回调函数（callback）是什么？](https://www.zhihu.com/question/19801131)
