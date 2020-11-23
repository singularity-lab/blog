---
layout: post
title: Axure RP 9的学习(2)
date: 2020-11-03
author: ZXH
categories:
    - 设计部
tags:
    - 设计
---


# Axure RP 9页面交互  

## 交互是什么？  

交互是指程序对用户操作指令的反馈，因此我们需要思考这个页面允许用户进行什么操作并且执行操作后将会得到什么反馈。  


## 需用到的功能   

页面跳转、滚动元件实现锚点滚动、文本框设置、选择控制语句  


## 关于页面跳转  

当发生页面跳转时，应该选择在当前窗口中打开还是选择在新窗口/新标签中打开呢？  
1. 如大兴电商网站等信息架构复杂的大型网站，使用新窗口/新标签；  
2. 如小型轻量级的电商网站等较为简单的小型网站，使用在当前页面跳转，保证了用户操作的连贯性。  


## 关于元件实现锚点滚动  

要移动到内容：组合-记录位置-移动  
标签栏：动态面板-固定到浏览器  
单击时-移动-时间自定  


## 关于选择控制语句  

当条件1成立，则执行动作1，否则继续判断是否符合条件2；当符合条件2时，执行动作2，否则继续判断是否符合条件3……  
具体操作：  
情形-条件-动作（设置文本）  


## 一些功能快捷键

1. 撤销：Ctrl/Command+Z  
2. 重做：Ctrl/Command+Y  
3. 加粗：Ctrl/Command+B  
4. 斜体：Ctrl/Command+I  
5. 标题：Ctrl/Command+Shift+H  
6. 无序列表：Ctrl/Command+Shift+U  
7. 有序列表：Ctrl/Command+Shift+O  
8. 检查列表：Ctrl/Command+Shift+C  
9. 插入代码：Ctrl/Command+Shift+K  
10. 插入链接：Ctrl/Command+Shift+L 
11. 插入图片：Ctrl/Command+Shift+G  
12. 查找：Ctrl/Command+F  
13. 替换：Ctrl/Command+G   




