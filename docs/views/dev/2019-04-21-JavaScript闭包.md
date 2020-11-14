---
layout: post
title: JavaScript闭包
date: 2019-04-21
author: Hivol
categories:
  - 开发部
tags:
  - 前端
  - JavaScript
---

**闭包**：函数和声明该函数的词法环境的组合，这个环境包含了这个闭包创建时所能访问的所有局部变量。

闭包的表现形式为函数作为"父函数"的返回值。

## 了解闭包需要知道的 JavaScript 知识

### 两种数据类型

1. 原生类型：Number、String、Boolean、Symbol、Null、Undefined
2. 对象类型（Object）

### 函数的"地位"

在 JavaScript 中，函数是第一等对象（First-class Object），这给了它无限的灵活性，却也让初学者更难弄懂。

作为第一等对象，函数可以赋值给变量，也可以作为另一个函数的返回值。

```javascript
var a = 1;
var b = "abcde";
var c = new function();
var d = function() {
  alert("I'm a function");
};
var e = function() {
  return function() {
    alert("function as return.");
  }
}；
var f = function() {
  return () => alert("Arrow function as return.");
}；
```

### JavaScript 的作用域

```javascript
outer = 2;
function sample() {
  var inner = 1;
  console.log(outer);
}
sample(); // 2
console.log(inner); // Undefined
```

可以发现，函数外部是不能访问函数内部的变量的。

### 闭包的典型形式

```javascript
function game() {
  var lives = 30;
  function die() {
    lives -= 1;
    return lives;
  }
  return die;
}
var outer = game();
console.log(outer());
```

闭包的典型形式就是这样，把函数内部的另一个函数作为返回值。 `die()` 作为返回值，按照常理来说，外部不应该获取到 `game()` 下的变量 `lives` ，但由于 `die()` 函数会用到 `lives` ，所以在返回时把 `lives` 也封装进去了，这样 JavaScript 的垃圾回收机制就不会立即把 `lives` 回收掉。

**闭包的作用**：隐藏内部变量，不让外部函数直接修改到内部变量。让 JavaScript 这样的函数型语言也能拥有一些面向对象语言的特性。
