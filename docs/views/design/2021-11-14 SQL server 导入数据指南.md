---
layout: post
title: SQL server 导入数据指南
date: 2021-11-14
author: fwx
categories:
    - 设计部
tags:
    - SQL server
---
## 一、SQL server 导入数据指南

### **1. 导入Excel文档**

##### *文件类型必须为Microsoft Excel 97-2003 工作表

#### **（1）右击数据库——任务——导入数据**
![](../imgs/2111/02/fwx/01/1.jpg)
#### **（2）出现向导**
![](../imgs/2111/02/fwx/01/2.jpg)
#### **（3）数据源选择Excel**
![](../imgs/2111/02/fwx/01/3.jpg)
#### **（4）目标选择microsoft OLE DB Driver for SQL Server，点击属性**
![](../imgs/2111/02/fwx/01/4.jpg)
#### **（5）设置属性**
- 通过查询语句SELECT HOST_NAME( )获得服务器名称，复制粘贴到小框里
-  选择Windows authentication
-  选择导入的数据库
-  点击确定
![](../imgs/2111/02/fwx/01/5.jpg)
#### **（6）接下来就是一路next，最后点finish**