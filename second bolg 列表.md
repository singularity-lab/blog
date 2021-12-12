---
layout: post
title: Python学习-列表学习笔记
date: 2021-11-19
author: 张书翌
categories:
    - 数据分析部
tags:
    - 列表学习笔记
---


# **3 · 列表**
> * ***列表的 创建***  
> 使用方括号把需要囊括的元素加入，例如：  
> &ensp;&ensp;&ensp;&ensp;
> *motorcycles = ['trek', 'cannondale', 'redline', 'specialized']*

> * ***列表元素的 访问***  
> 元素序号从零开始，将需要访问的元素序号放入方括号中，例如：  
> &ensp;&ensp;&ensp;&ensp;
> *print(motorcycles[i])*  
> 表示，将会打印 *motorcycles* 中的第 i+1 个元素  
> 且 *motorcycles[i]* 具有变量的所有性质

> * ***列表元素的 修改***  
> 由于 *motorcycles[i]* 具有变量的性质，所以可以做出如下操作以修改其值：  
> &ensp;&ensp;&ensp;&ensp;
> *motorcycles[i]=ducati*  
> 这样之后，再次打印其值，会发现已被更改

> * ***列表元素的 添加***  
> 在列表的末尾添加元素，如下：  
> &ensp;&ensp;&ensp;&ensp;
> *print(motorcycles)*   
> &ensp;&ensp;&ensp;&ensp;
> *motorcycles.append('ducati')*  
> &ensp;&ensp;&ensp;&ensp;
> *print(motorcycles)*  
> &ensp;&ensp;&ensp;&ensp;
> 得：*['honda', 'yamaha', 'suzuki', 'ducati']*  
> &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
> *['honda', 'yamaha', 'suzuki']*

> * ***列表元素的 插入***  
> *motorcycles = ['honda', 'yamaha', 'suzuki']*  
> *motorcycles.insert(0, 'ducati')*  
> *print(motorcycles)*  
> 得：*['ducati', 'honda', 'yamaha', 'suzuki']*

> * ***列表元素的 删除***  
>> * ***根据位置删除元素***  
>> *del motocycles[i]*   
>> 或者使用*motocycles.pop(i)* 来删除 *i* 号元素
>> * ***根据值删除元素***  
>> *motocycles.remove('ducati')*  
>> 表示删除列表中，值为 *'ducati'* 的元素
 
> * ***列表 排序***  
> 函数介绍：  
> **1. sort()**  
> 该函数会对列表变量本身造成改变，是一个行为函数  
> 其默认顺序为：由小到大
> 如果想改变其顺序，则可以：  
> &ensp;&ensp;&ensp;&ensp;*motocycles.sort(reverse=True)*  
> 来调整*motocycles*变为逆序排列  

> **2. sorted()**  
> 它是一个有返回值的函数，返回一个排序后的数组，而不对原数组做出改变  
> &ensp;&ensp;&ensp;&ensp;
> *sorted_motocycles=motocycles.sorted()*  
> 而这个*sorted_motocycles*正是排序后的*motocycles*，  
> 而赋值的过程中motocycles并无改变  

> **3. reverse()**  
> 该函数会对列表变量本身造成改变，是一个行为函数  
> &ensp;&ensp;&ensp;&ensp;
> *motocycles.reverse()*  
> 这段语句被执行后，*motocycles*将会被倒置  
> 这会改变列表本身

> * ***列表 长度***  
> **len()**  
> 返回传入参数的长度，例如：  
> &ensp;&ensp;&ensp;&ensp;*len(motocycles)*  
> 会返回*motocycles*列表的长度

> * ***列表 遍历***  
> **1. 直接遍历所有值**  
> 如下：  
> &ensp;&ensp;&ensp;&ensp;*for item in motocycles:*  
> &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;*print(item)*  

> **2. 按照序号遍历列表**  
> &ensp;&ensp;&ensp;&ensp;*n=len(motocycles)*  
> &ensp;&ensp;&ensp;&ensp;*for i in range(0,n):*  
> &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;*print( motocycles[i] )*  

> * ***列表 解析***  
> 欲生成1至100的平方组成的列表，如下：  
> &ensp;&ensp;&ensp;&ensp;*square=[ i**2 for i in range(1,101) ]*  
> 这样就会生成所需的列表了
 
> * ***列表 切片***  

> 主要方法是，在访问数组元素的时候，加入 ***冒号***
> 形如：  
>
>> *motocycles[ i : j ]*   
>> 表示，由 i 号元素到 j-1 号元素所组成的列表
> 
>> *motocycles[ : j ]*  
>> 表示，由 0 到 j-1 号元素所组成的列表
> 
>> *motocycles[ i : ]*  
>> 表示，由 i 到 末尾元素所组成的列表

> * ***列表 拷贝***  
> **1. 浅拷贝**  
> &ensp;&ensp;&ensp;&ensp;*copy=motocycles[ : ]*  
> 这种拷贝方式，不会使两者产生关联，只是使两者具有相同的元素  
> **2. 深拷贝**  
> &ensp;&ensp;&ensp;&ensp;*copy=motocycles*  
> 这种拷贝方式的实质是，将*copy*定义为*motocycles*的别名，  
> 那么，此时如果我们改变*copy*，将会发现*motocycles*也会被改变，  
> 这是因为，*copy*与*motocycles*已经指向了同一块内存空间