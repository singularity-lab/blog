---
layout: post
title: "JavaScript 类（Class）"
date: 2019-05-26
author: "Hivol"
categories:
    - 开发部
tags:
    - 前端
    - JavaScript
    - ES6
---

:::tip
本文的标题是 JavaScript 类，准确地说，应该是 ES6 中的类。在 ES6 之前，是没有 `class` 这种面向对象的写法的。
:::

<!-- more -->

## ES6 之前的面向对象写法

若想在 ES6 之前实现面向对象的写法，只能在 `function` 中使用构造函数的方法来设置"属性"（property），如：

```javascript
function iPhone() {
    this.price = "high";
}

var iphone1 = new iPhone();

alert(iphone1.price); // high
```

如果想要实现"方法"（method），则需要使用 `prototype`，如：

```javascript
iPhone.prototype.drop = function() {
    alert("Broken");
};
```

若想要实现"继承"（inheritance）,也需要用到 `prototype`，如：

```javascript
function iPhoneXR() {
    this.cpu = "A12";
}

iPhoneXR.prototype = new iPhone();

var iPhoneXR1 = new iPhoneXR();
alert(iPhoneXR1.cpu); // A12
alert(iPhoneXR1.price); // high
iPhoneXR1.drop(); // Broken
```

这里使用 `prototype` 使得 `iPhoneXR` 继承自 `iPhone`。

但是这种写法的易读性和易编写性都很差，所以在 ES6 发布时，JavaScript 为我们带来了"真正"的 `class` 写法。

关于这种"基于原型的继承"，可以继续延伸阅读 [https://zh.javascript.info/class-patterns](https://zh.javascript.info/class-patterns)

## ES6 中的面向对象写法

在 ES6 中，"Class" 其实是一个语法糖（Syntactic sugar），它的本质依然是基于原型（prototype）的，但是，它可以为我们带来一种干净、整洁的语法来定义基于 prototype 的类。

我们先来使用 `class` 语法重写上面的 `iPhone` 类吧：

```javascript
class iPhone {
    constructor() {
        this.price = "high";
    }

    drop() {
        alert("Broken");
    }
}

let iphone1 = new iPhone();
iphone1.drop(); // Broken
```

这种写法就十分接近于我们熟悉的面向对象式编程了。

再来看看 ES6 中类是如何继承的吧：

```javascript
class iPhoneXR extends iPhone {
    constructor(owner) {
        super("high");
        this.cpu = "A12";
        this.owner = owner;
    }
}

let iPhoneXR1 = new iPhoneXR("Jobs");
alert(iPhoneXR1.owner); // Jobs
alert(iPhoneXR1.cpu); // A12
alert(iPhoneXR1.price); // high
iPhoneXR1.drop(); // Broken
```

此处的 `super('high')` 是在重写 `constructor()` 方法时所必需的写法，括号中的值为父类中属性的值。不写会报错。

与其他面向对象的语法一样，ES6 中的类也可以重写父类方法。如：

```javascript
class iPhoneXR extends iPhone {
    constructor(owner) {
        super("high");
        this.cpu = "A12";
        this.owner = owner;
    }

    drop() {
        super.drop();
        alert("Repaired!");
    }
}

let iPhoneXR1 = new iPhoneXR("Jobs");
alert(iPhoneXR1.owner); // Jobs
alert(iPhoneXR1.cpu); // A12
alert(iPhoneXR1.price); // high
iPhoneXR1.drop(); // Broken, Repaired!
```

此处代码的作用是重写父类的 `drop()` 方法，并在重写后的 `drop()` 中调用了父类的 `drop()` 方法。其结果便是先提示了"Broken"，再提示了"Repaired！"

以上便是使用 JavaScript 进行面向对象程序的编写示例，有兴趣了解更多的话可以阅读以下的参考链接。

## 参考资料

1. [对象、类和继承](https://zh.javascript.info/object-oriented-programming)
