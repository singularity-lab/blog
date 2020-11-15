---
layout: post
title: Vue集成echarts
date: 2020-01-28
author: Cathandra
categories:
  - 开发部
tags:
  - Vue.js
  - 前端
---

归纳 2 种用法：

1. 直接使用原生 echarts；

2. 使用 vue-echarts 组件；

<!-- More -->

## 直接使用原生 echarts

### 安装 echarts

使用`npm`安装：

```shell
npm install echarts --save
```

或使用`yarn`：

```shell
yarn add echarts
```

### 引用 echarts

```JavaScript
var echarts = require('echarts');
```

或按需引入（本例为折线图）：

```JavaScript
var echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
```

### 创建实例

#### 在 mounted()钩子方法中使用

```JavaScript
mounted() {
// 在template中创建以echartContainer为id的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('echartContainer'));
// 或者创建ref属性为chartsContainer的dom，初始化实例
// var chartsContainer = this.$refs.chartsContainer;
// var myChart = echarts.init(chartsContainer);

// 绘制图表
myChart.setOption({
    title: { text: '标题' },
    tooltip: {},
    xAxis: {
        data: ["1990","1991","1992","1993","1994"]
    },
    yAxis: {},
    series: [{
        name: '存款',
        type: 'bar',
        data: [1, 2, 3, 4, 5]
    }]
});
}
```

####

## 使用 vue-echarts 组件

### 安装 vue-echarts

使用`npm`安装：

```shell
npm install echarts vue-echarts
```

### 引用 vue-echarts

```JavaScript
var echarts = require('echarts');
```

或按需引入（本例为折线图）：

```JavaScript
var echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
```

### 创建实例

引用[官方文档](https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md#%E8%B0%83%E7%94%A8%E7%BB%84%E4%BB%B6)的例子：

> 注册全局组件

```JavaScript
Vue.component('v-chart', VueECharts);
```

> 调用组件

```html
<template>
  <v-chart :options="polar" />
</template>

<style>
  /**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import ECharts from "vue-echarts";
  import "echarts/lib/chart/line";
  import "echarts/lib/component/polar";

  export default {
    components: {
      "v-chart": ECharts
    },
    data() {
      let data = [];

      for (let i = 0; i <= 360; i++) {
        let t = (i / 180) * Math.PI;
        let r = Math.sin(2 * t) * Math.cos(2 * t);
        data.push([r, i]);
      }

      return {
        polar: {
          title: {
            text: "极坐标双数值轴"
          },
          legend: {
            data: ["line"]
          },
          polar: {
            center: ["50%", "54%"]
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross"
            }
          },
          angleAxis: {
            type: "value",
            startAngle: 0
          },
          radiusAxis: {
            min: 0
          },
          series: [
            {
              coordinateSystem: "polar",
              name: "line",
              type: "line",
              showSymbol: false,
              data: data
            }
          ],
          animationDuration: 2000
        }
      };
    }
  };
</script>
>
```
