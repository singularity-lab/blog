---
layout: post
title: HTML学习
date: 2020-10-30
author: grossing
categories:
  - 开发部
tags:
  - 前端
  - HTML
---

之前学习 JSP 时虽有使用 HTML 语言，但老师也只是让我们作为一个固定框架记住，没有讲解 HTML 的使用方法，以下是我本周学习的关于 HTML 标签的相关知识及应用。

# HTML 标签

- 标题

  HTML 标题通过`<h1>` - `<h6>` 标签来定义。

  例如：

  ```
  <h1>这是一个标题</h1>
  <h2>这是一个标题</h2>
  <h3>这是一个标题</h3>
  ```

- 段落：HTML 段落通过标签 `<p>`来定义。

  例如：

  ```
  <p>这是一个段落。</p>
  <p>这是另外一个段落。</p>
  ```

- 链接：HTML 链接通过标签 `<a>` 来定义。

  例如：

  ```
  <a href="https://www.baidu.com">这是一个链接</a>
  ```

- 图像：HTML 图像通过标签 `<img>` 来定义。

  例如：

  ```
  <img loading="lazy" src="/images/logo.png" width="258" height="39" />
  ```

- 水平线：用`<hr>` 标签创建水平线，可用于分隔内容。

  例如：

  ```
  <p>这是一个段落。</p>
  <hr>
  <p>这是一个段落。</p>
  ```

- 注释：将注释插入 HTML 代码中，这样可以提高其可读性，使代码更易被人理解。

  例如：

  ```
  <!-- 这是一个注释 -->
  ```

- `<html>`标签：定义一个 html 文档。

- `<body>`标签：定义文档的主体。

  基础标签用法如下：

  ```
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <title>文档标题</title>
  </head>

  <body>
  文档内容......
  </body>

  </html>
  ```

更多标签见[HTML 参考手册](https://www.runoob.com/tags/ref-byfunc.html)
