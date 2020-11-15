---
layout: post
title: flex布局
date: 2020-11-15
author: grossing
categories:
    - 开发部
tags:
    - 前端
    - CSS
---

    Flex作为一种布局方式，拥有较为强大的功能。在这里主要介绍一下Flex容器的6个属性，也是flex布局的最基本的语法。
---
# 一、Flex布局的基本概念
采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

# 二、容器的属性
1. flex-direction属性
flex-direction属性决定主轴的方向（即项目的排列方向）。
```
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```
可能取的值：
* row（默认值）：主轴为水平方向，起点在左端。
* row-reverse：主轴为水平方向，起点在右端。
* column：主轴为垂直方向，起点在上沿。
* column-reverse：主轴为垂直方向，起点在下沿。
2. flex-wrap属性
``` 
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
可能取的值：
* nowrap（默认）：不换行。
* wrap：换行，第一行在上方。
* wrap-reverse：换行，第一行在下方。
3. flex-flow
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
```
.box {
  flex-flow: <flex-direction> <flex-wrap>;
}
```
4. justify-content属性
```.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
可能取的值：
* flex-start（默认值）：左对齐
* flex-end：右对齐
* center： 居中
* space-between：两端对齐，项目之间的间隔都相等。
* space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
5. align-items属性
```
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```
可能取的值：
* flex-start：交叉轴的起点对齐。
* flex-end：交叉轴的终点对齐。
* center：交叉轴的中点对齐。
* baseline: 项目的第一行文字的基线对齐。
* stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
6. align-content属性
```
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
可能取的值：
* flex-start：与交叉轴的起点对齐。
* flex-end：与交叉轴的终点对齐。
* center：与交叉轴的中点对齐。
* space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
* space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
* stretch（默认值）：轴线占满整个交叉轴。
