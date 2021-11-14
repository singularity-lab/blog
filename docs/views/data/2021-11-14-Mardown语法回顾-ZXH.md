---
layout:post
title:Markdown语法回顾
data：2021-11-14
author:ZXH
categories:
    -数据分析部
tags:
    -Markdown语法
---

# 什么是Markdown
Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单地标记语法，它可以使普通文本内容具有一定的格式。

# Markdown的应用
1.用来写博客、邮件
2.Markdown很容易转化为HTML或者是PDF
3.git的README.md就是Markdown语法格式的

# 语法介绍

## 一、标题
### 1.使用“#”表示标题，其中#号必须在行首

例如：  
一号标题：#  
二号标题：##  
三号标题：###  
四号标题：####  
五号标题：#####  
六号标题：######  
  

### 2.使用“===”或者“---”表示
例如：  
一级标题：===  
二级标题：---  
  

## 二、分割线
使用三个或以上的“-”或者“*”表示，且这一行只有符号，注意不要被识别成二级标题即可，可以在中间或者前面加上空格符号，防止被识别成二级标题

## 三、斜体和粗体
使用“*”和“**”分别表示斜体和粗体，例如：  
*斜体*   
**粗体**  
***又斜又粗***

## 四、删除
使用两个“~”表示删除线，例如：

~~我是要删掉的文字~~

## 五、无序列表  

使用“-”、“+”和“*”表示无序列表，前后留一行空白，可嵌套，例如：

+ 一层
    - 二层
    - 二层
        * 三层
            + 四层
+ 一层

## 六、有序列表
使用“1. ”（点号后面有个空格）表示有序列表，可嵌套，例如：

1. 一层
    1. 二层
    2.二层
2. 一层

## 七、文字引用
使用“>”表示，可以有多个“>”，表示层级更深，例如：  

>第一层
>>第二层
>这样是跳不出去的
>>>还可以更深

>这样就跳出去了

## 八、行内代码块
例如：'行内代码块'

## 九、代码块
使用四个空格缩进表示代码块，例如：  
    
    public class HelloWorld
    {
        public static void main(String[] args)
        {
            System.out.println("Hello,World!");
        }
    }


## 十、表格
|商品|数量|单价|
|---|---:|:---:|
|苹果|10|\$1|
|电脑|1|\$1000|
其中，第二行的‘---：’表示了对齐方式

## 十一、流程图
主要的语法为'name=>type:describe'，其中type主要有以下几种：  
1.开始和结束：'start''end'  
2.输入和输出：'inputoutput'  
3.操作：'operation'  
4.条件：'condition'  
5.子程序：'subroutine'  

    '''flow

    st=>start:Start:>http://www.zybuluo.com
    io=>inputoutput: verfication
    op=>operation: Your Operation
    cond=>condition: Yes or No?
    sub=>subroutine: Your Subroutine
    e=>end

    st->io->op->cond
    cond(yes)->e
    cond(no)->sub->io
    '''
--------------------------------------------
