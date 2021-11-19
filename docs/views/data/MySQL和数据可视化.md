---
layout: post
title: MySQL和数据可视化
date: 2021-11-19
author: 饶翰宇
categories:
    - 数据分析部
tags:
    - MySQL
    - Python	
    - 数据可视化
---

## week2

------

### MySQL

1. sql基本语法

- 显示当前数据库

```mysql
show databases;
```

- 创建数据库

```mysql
create database blocks;
```

- 使用数据库

```mysql
use blocks;
```

- 创建表

```mysql
create table person(id int(10),
                    name varchar(15),
                    age int(3));
```

+  查看表结构

```mysql
desc person;
```

- 显示当前已创建的表

```mysql
show tables;
```

- 在表中插入值

```mysql
insert into person(id,name,age) values(1,'华强',33);
insert into person(id,name,age) values(2,'胖虎',15);
insert into person(id,name,age) values(3,'大司马',37);
insert into person(id,name,age) values(4,NULL,1);
```

2. 基础查询

- 查询全部

```mysql
select * from person;
```

![person表](C:\Users\blocks\PycharmProjects\奇点工作室\屏幕截图 2021-11-19 163119.png)  

- 查询指定列

```mysql
select id,name from person;
```

- 查询常量

```mysql
select 100;
select '大熊';
```

- 查询表达式

```mysql
select 100*100;
```

- 查询函数

```mysql
select version();
```

3. 其他操作

- 起别名

```mysql
select name as '姓名' from person;
```

- concat连接

```mysql
select concat(id,name) as info from person;
```

- ifnull

```mysql
select id,ifnull(name,0) from person;
```

4. 条件查询

- where

```mysql
select * from person where name = '华强';
```

5. 模糊查询

- like

```mysql
select * from person where name like '_强';
select * from person where name like '大%';
```

- in

```mysql
select * from person where name in ('华强');
```

- between and

```mysql
select * from person where id between 1 and 2;
```

- is null(is not null)

```mysql
select * from person where id is null;
```



### 数据可视化

通过python我们可以实现大量数据的可视化，这里我们运用pandas对鸢尾花数据集进行演示；

数据处理部分：

```python
from sklearn.datasets import load_iris
import pandas as pd
```

```python
dataset = load_iris()
data = pd.DataFrame(data=dataset.data,columns=dataset.feature_names)
data['species'] = dataset.target_names[dataset.target]
```

![鸢尾花](C:\Users\blocks\PycharmProjects\奇点工作室\屏幕截图 2021-11-19 170510.png '鸢尾花数据集')

画图处理部分：

```python
import matplotlib as plt
plt.rcParams['font.sans-serif'] = ['SimHei']
```

对类别数量进行计算：

```python
info = data.groupby('species').groups
count = {name:len(num) for name,num in info.items()}
```

结果：

```python
{'setosa': 50, 'versicolor': 50, 'virginica': 50}
```

开始画图：

```python
plt.figure(figsize=(8,8))
plt.pie(count.values(),labels=count.keys(),explode=[0.05]*3,colors=['purple','pink','yellow'])
plt.legend(loc='upper right')
plt.title('鸢尾花数据集',fontsize=30,color='black',bbox={'facecolor':'white','pad':5},loc='center')
```

![鸢尾花类别](C:\Users\blocks\PycharmProjects\奇点工作室\屏幕截图 2021-11-19 173955.png '鸢尾花类别')

对每个特征值进行处理并画图：

```python
plt.figure(figsize=(8,8))
plt.style.use('ggplot')
for i in range(1,5):
    plt.subplot(2,2,i)
    plt.hist(data.iloc[:,i-1],10,edgecolor='k')
    plt.title(data.columns[i-1])
```

![特征值](C:\Users\blocks\PycharmProjects\奇点工作室\屏幕截图 2021-11-19 180222.png '特征值')
