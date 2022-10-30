---
layout: post
title: matplotlib画图上
date: 2021-11-26
author: yuping0924
categories:
    - 数据分析部
tags:
    - matplotlib
---

#### 引入函数库  

import  matplotlib.pyplot as plt
mport  numpy as np  

#### 打印函数  

plt.plot(x,y)  
plt.show()  [这个函数是将图像展示出来，在结尾处必须要有]
注：plt.plot(x,y,color='red',linewitdth=1.0,linestyle="--")
color用来规定线段的颜色，linewidth用来表示线段的宽窄，linestyle用来表示线段的类型  

#### plt.figure()的用处  

plt.figure(num=1,figsize=(8,5), dpi=None, facecolor=None, edgecolor=None, frameon=True)  

num表示图像的编号，figsize改变图像的长和宽，dpi表示分辨率，默认为80，facecolor表示背景色，edgecolor表示边框颜色，frameon表示是否显示边框  

##### 1.同时生成多个独立窗口  

在每个函数前加上：plt.figure()
例如：  
plt.figure()
plt.plot(x,y1)
plt.figure()
plt.plot(x,y2)
plt.show()
##### 2.将两个函数图像放在一个窗口  

在一个figure下生成两次图像
例如：
plt.figure()
plt.plot(x,y1)
plt.plot(x,y2)
#### 坐标轴设置  

##### 1.设置取值范围   

plt.xlim((a,b)) 表示X轴
plt.ylim((a,b)) 表示Y轴
##### 2.设置名称  

plt.xlabel('X轴')
plt.ylabel('Y轴')
##### 3.替换下标值  

1.举例说明：
a=np.linspace(-1,2,5)
print(a)
plt.xticks(a)
plt.yticks([-2,-1.8,-1,1.22,3],
['really bad','bad','normal','good','really good'])
此时，Y轴中的-2被替换成really bad, -1.8被替换成bad,以此类推  


2.plt.xticks用法说明(plt.yticks同理)：
plt.xticks(locs,[labels],**kwargs)
locs:表示一个范围，可设置为range(1,13,1)类似
[labels]:可任意赋值，且是一一对应
**kwargs:是用于控制label的参数
如果想隐藏刻度可将Y轴输为空值或不设置，即：plt.xticks(x,())或plt.xticks(x)  

##### 4.改变坐标轴位置  

a = plt.gca()  此处gca是'get current axis'即取出坐标轴，必有
1.改变单个坐标轴颜色
a.spines['right'].set_color('none')
其中spines['right']表示选择右边的轴线，none表示无色  


2.设置某条边为X或Y轴
a.xaxis.set_ticks_position('bottom')
a.yaxis.set_ticks_position('left')
表示将底部的轴设置为X轴，左边的设置为Y轴  


3.改变位置
a.spines['bottom'].set_position(('data',0))
a.spines['left'].set_position(('data',0))
表示将下面的轴放到y=0的位置，将左边的轴放到x=0的位置
注：这里的data表示Y轴的数值，也可用axes移动位置，此时0处表示的是百分比，若为0.1，就表示10%  

#### 添加注释  

##### 1.强调某一个点  

举例说明：
x0=1
y0=2*x0+1
plt.scatter(x0,y0,s=50,color='blue')
plt.plot([x0,x0],[y0,0],'k--',linewidth=2.5)
其中scatter表示打印点状，s表示点的大小，color是颜色
plot表示打印线段，[x0,x0],[y0,0]表示X=1的图像，'k--'是简写，k表示颜色是黑色，'--'表示线段的样式是虚线  

##### 2.添加文本说明  

用plt.text():
plt.text(x,y,s,fontdict=None,withdash=False,**kwargs)
x,y:放置text的位置
s:text的内容
fontdict:定义s的格式
其他参数：
fontsize:设置字体大小，默认12
fontweight:设置字体粗细，可用数字表示，也可用标准的名称
fontstyle:设置字体类型，可选参数['normal'|'italic'|'oblique']
backgroundcolor:设置字体背景色  

举例：
plt.text(-3.7,3,r'$This\ is\ the\ text\ \mu\ \sigma_1\ \alpha_2$',fontdict={'size':16,'color':'red'})
plt.show()
此处涉及文本中空格和特殊字符表示，需要在空格和特殊字符前加上转义字符 \ 转换，若要在字符后加上下标就在字符和下标中间加上下划线 _ 即可  

#### 代码展示  
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3,3,50)
y = 2*x+1

plt.figure(num=1,figsize=(8,5))
plt.plot(x,y)

a = plt.gca()
a.spines['right'].set_color('none')
a.spines['top'].set_color('none')
a.xaxis.set_ticks_position('bottom')
a.yaxis.set_ticks_position('left')
a.spines['bottom'].set_position(('data',0))
a.spines['left'].set_position(('data',0))


x0=1
y0=2*x0+1
plt.scatter(x0,y0,s=50,color='blue')
plt.plot([x0,x0],[y0,0],'k--',linewidth=2.5)


plt.text(-3.7,4,r'$This\ is\ \mu\ \sigma_i\ \alpha_t$',
         fontsize=16,fontweight=10,fontstyle='italic')

plt.text(-3.7,3,r'$This\ is\ \mu\ \sigma_i\ \alpha_t$',
         fontsize=16,backgroundcolor='yellow')
plt.text(-3.7,2,r'$This\ is\ \mu\ \sigma_i\ \alpha_t$',
         fontdict={'size':16,'color':'red'})


plt.show()
```
![Figure_3.png](https://i.loli.net/2021/11/28/89BIubinorveALO.png)