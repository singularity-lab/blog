---
layout: post
title: matplotlib 画图下
date: 2021-12-3
author: yupinng0924
categories:
    - 数据分析部
tags:
    - matplotlib 画图
---
#### tick能见度
此处的tick是指坐标刻度的数字及其背后的背景，改变能见度需要用到bbox（）函数，特别注明，在较新的python版本中，需要在plot的时候加上zorder的设置

举例说明：
```
import matplotlib.pyplot as plt
import numpy as py

x=py.linspace(-3,3,50)
y=0.2*x

plt.figure()
plt.plot(x,y,zorder=1,linewidth=10)
plt.ylim(-2,2)

ax=plt.gca()
ax.spines['right'].set_color('none')
ax.spines['top'].set_color('none')
ax.xaxis.set_ticks_position('bottom')
ax.yaxis.set_ticks_position('left')
ax.spines['bottom'].set_position(('data',0))
ax.spines['left'].set_position(('data',0))

for label in ax.get_xticklabels() + ax.get_yticklabels() :
   label.set_fontsize(12)
   label.set_bbox(dict(facecolor='white',edgecolor='none',alpha=0.7))

plt.show()
```
![能见度.png](https://i.loli.net/2021/12/03/V1PptnbUmilIZHq.png)
dict()用于创建一个字典，facecolor设置背景颜色，edgecolor设置边框颜色，alpha设置透明度，从0（完全透明）到1（完全不透明）

zorder解释：是用于确定补丁，线条，文本（此为默认顺序，对应为1，2，3）的绘制顺序的，任何一个单独的plot()调用都可以为特定的该项设置zorder，zorder的值越小改项就在越上面
#### 散点图
打印直接用：scatter()函数 ，可设置（s点的大小，alpha透明度，c颜色）等 
举例说明：
```
import matplotlib.pyplot as plt
import numpy as np

n=1024
x = np.random.normal(0,1,n)
y = np.random.normal(0,1,n)

##x=np.linspace(-3,3)
##y=2*x+1
plt.scatter(x,y,s=75,alpha=0.5)
plt.xlim((-2,2))
plt.ylim((-2,2))
plt.xticks(())
plt.yticks(())

plt.show()
```
![散点图_1.png](https://i.loli.net/2021/12/03/BZ6bocud8N2931g.png)
![散点图_2.png](https://i.loli.net/2021/12/03/F6ToGHejpYMWqhK.png)
#### 柱状图
打印用：bar()函数，可设置(facecolor矩形的颜色，edgecolor边框色)，朝向（在y前面加上负号）等 
举例说明：
```
import matplotlib.pyplot as plt
import numpy as np

n=12
X=np.arange(n)
y1=(1-X/float(n))*np.random.uniform(0.5,1.0,n)
y2=(1-X/float(n))*np.random.uniform(0.5,1.0,n)

plt.bar(X,y1,facecolor='green',edgecolor='white')
plt.bar(X,-y2)

for x,y in zip(X,y1):
   plt.text(x,y+0.05,'%.2f'%y,ha='center',va='bottom')

for x,y in zip(X,y2):
   plt.text(x,-y-0.05,'%.2f'%y,ha='center',va='top')


plt.xlim(-3,n)
plt.ylim(-1.25,1.25)
plt.xticks(())
plt.yticks(())

plt.show()
```
说明：zip()可以同时赋多个值，其参数可以是多个列表，元组，字典，集合，字符串，以及range（）区间构成的列表。ha 是横向对齐（horizon alignment），va是纵向对齐
![柱状图.png](https://i.loli.net/2021/12/03/75LfPIYysJ8XHtC.png)
#### 等高线图
首先要绘制底图：用contourf()函数，其参数为（长， 宽， 高，分成部份数（最低为2），透明度alpha，颜色camp ）

上色需要用到camp，其设置方式有三种：
  
  + camp=plt.get_camp('rad')
  + camp='red'
  + camp=plt.cm.binary 
  
然后生成等高线：用contour()函数,其参数为（长，宽，高，分成部分数，颜色，线宽） 
举例说明：
```
import matplotlib.pyplot as plt
import numpy as np

def f(x,y):
   return (1-x/2+x**5+y**3)*np.exp(-x**2-y**2)

n=256
x=np.linspace(-3,3,n)
y=np.linspace(-3,3,n)
X,Y=np.meshgrid(x,y)

plt.contourf(X,Y,f(X,Y),8,alpha=0.75,cmap=plt.cm.hot)

C=plt.contour(X,Y,f(X,Y),8,colors='black',linewidths=0.5)

plt.clabel(C,inline=1,fontsize=10)

plt.xticks(())
plt.yticks(())
plt.show()
```
注：inline=1(Ture)表示将数值嵌套在线里面
![等高线图.png](https://i.loli.net/2021/12/03/aJn6kpl4mdLKX71.png)
#### 生成图片
用inshow()函数，其参数为（数据，颜色camp,起始位置origin='upper'/'lower'）
用colorbar()生成颜色标注，参数可为（长度比例shrink，位置location）
举例说明：
```
import matplotlib.pyplot as plt
import numpy as np

a=np.array([0.31,0.38,0.42,
            0.49,0.51,0.43,
            0.62,0.55,0.72]).reshape(3,3)

plt.imshow(a,interpolation='none',cmap='bone',origin='lower')
plt.colorbar(shrink=0.7)


plt.xticks(())
plt.yticks(())
plt.show()
```
![生成图片.png](https://i.loli.net/2021/12/03/ahOLrHbzxdFSgDJ.png)
#### 3D数据
首先要新增函数库：from mpl_toolkits.mplot3d import Axes3D
举例说明：

```
import matplotlib.pyplot as plt
import numpy as np
from mpl_toolkits.mplot3d import Axes3D

##创建一个窗口
fig=plt.figure()
##生成一个3D坐标
ax=Axes3D(fig)
X=np.arange(-4,4,0.25)
Y=np.arange(-4,4,0.25)
##把x,y放到网格图上
X,Y =np.meshgrid(X,Y)
R=np.sqrt(X**2+Y**2)
Z=np.sin(R)

ax.plot_surface(X,Y,Z,rstride=1,cstride=1,cmap=plt.get_cmap('rainbow'))
ax.contourf(X,Y,Z,zdir='z',offset=-2,cmap='rainbow')
ax.set_zlim(-2,2)
plt.show()
```
注：rstride表示横线间隔，cstride表示竖线间隔，zdir='z'，表示从z轴俯视，offset表示从哪个坐标点开始
![3D数据.png](https://i.loli.net/2021/12/03/SwdHAzRGqnmku9U.png)
#### 在一个窗口中放多个坐标图
+ 方法一：用subplot()函数，此函数只能均分,其参数为（行数，列数，位置）
```
import matplotlib.pyplot as plt

plt.figure()
plt.subplot(2,2,1)
plt.plot([0,1],[0,1])

plt.subplot(2,2,2)
plt.plot([0,1],[0,2])

plt.subplot(2,2,3)
plt.plot([0,2],[0,4])

plt.subplot(2,2,4)
plt.plot([0,5],[0,2])


plt.figure()
plt.subplot(2,1,1)
plt.plot([0,1],[0,1])

plt.subplot(2,3,4)
plt.plot([0,1],[0,2])

plt.subplot(2,3,5)
plt.plot([0,2],[0,4])

plt.subplot(2,3,6)
plt.plot([0,5],[0,2])

plt.show()
```
![Figure_1.png](https://i.loli.net/2021/12/03/9jvAETq1FRXCytg.png)
+ 方法二：
用subplot2grid()函数，它能够在画布特定位置创建axes对象（绘图区），使用不同数量的行列数，进行非等分的分割，再按照绘图区的大小来展示结果。其参数为（划分形式（3，3），起始位置（0，0），rowspan占的行数,colspan占的列数） 
+ 方法三：
先引入函数库：import matplotlib.gridspec as gridspec 
再用gridspec.GridSpec()函数生成初始形状，参数为（行数，列数） 
最后对每个axes用subplot()函数确定位置
+ 方法四：
用plt.subplots()函数，返回一个包含fig和axes对象的元组，因此使用fig,ax=plt,subplots()将元组分为fig和ax两个变量，
例如：f,((ax11,ax12),(ax21,ax22))=plt.subplots(行数，列数，sharex=Ture共享x轴,sharey=Ture共享y轴)
举例说明：
```
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

plt .figure()
ax1 = plt.subplot2grid((3,3),(0,0),colspan=3,rowspan=1)
ax1.plot([1,2],[1,2])
ax1.set_title('ax1')
ax2 = plt.subplot2grid((3,3),(1,0),colspan=2,rowspan=2)
ax2.plot([2,3],[3,5])
ax2.set_title('ax2')
ax3 = plt.subplot2grid((3,3),(1,2),colspan=1,rowspan=2)
ax3.plot([-2,1],[-1,3])
ax3.set_title('ax3')

plt.figure()
gs = gridspec.GridSpec(3,3)
ax1 = plt.subplot(gs[0,:])
ax1.set_title('ax1_1')
ax2 = plt.subplot(gs[1,:2])
ax2.set_title('ax2_2')
ax3 = plt.subplot(gs[1:,2])
ax3.set_title('ax3_3')
ax4 = plt.subplot(gs[2,0])
ax4.set_title('ax4_4')
ax5 = plt.subplot(gs[2,1])
ax5.set_title('ax5_5')


plt.figure()
f,((ax11,ax12),(aax21,ax22)) = plt.subplots(2,2,sharex=True,sharey=True)
ax11.scatter([1,2],[1,2])
ax12.scatter([-1,-2],[1,2])

plt.show()
```
![Figure_2.png](https://i.loli.net/2021/12/03/WdzXplc19o8YiEy.png)
![Figure_3.png](https://i.loli.net/2021/12/03/EMa53v9Zm1kYCry.png)
![Figure_4.png](https://i.loli.net/2021/12/03/ycpPGjWSCnidQAf.png)
#### 再一个图中再嵌套图形
重点是确定图片的位置： 
left,bottom,width,height=0.1,0.1,0.8,0.8(通过改变百分比来改变位置) 
ax1（坐标名）=fig.add_axes([left,bottom,width,height]) 
或者：plt.axes([left,bottom,width,height])
举例说明：
```
import matplotlib.pyplot as plt

fig = plt.figure()
x = [1,2,3,4,5,6,7]
y = [1,3,4,2,5,8,6]

left,bottom,width,height = 0.1,0.1,0.8,0.8
ax1 = fig.add_axes([left,bottom,width,height])
ax1.plot(x,y,'red')
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.set_title('title')


left,bottom,width,height = 0.2,0.6,0.25,0.25
ax2 = fig.add_axes([left,bottom,width,height])
ax2.plot(y[::-1],x,'blue')
ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.set_title('inside_1')

x1= [1,2,3,4,5,6,7]
y1= [2,5,3,4,7,1,4]
plt.axes([0.6,0.2,0.25,0.25])
plt.plot(y1,x1,'green')
plt.xlabel('x')
plt.ylabel('y')
plt.title('inside_2')

plt.show()
```
![图中图.png](https://i.loli.net/2021/12/03/nCb8vjiNt6pc7Dk.png)
#### 设置主次坐标轴
重点用twinx()函数，例如：ax2=ax1.twinx()将ax1的y轴镜面反映到ax2的y轴
举例说明：
```
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0,10,0.1)
y1 = 0.05*x**2
y2 = -1*x

fig,ax1 = plt.subplots()
ax2 = ax1.twinx()
ax1.plot(x,y1,'g-')
ax2.plot(x,y2,'b--')

ax1.set_xlabel('X')
ax1.set_ylabel('Y1',color='green')
ax2.set_ylabel('Y2',color='blue')

plt.show()
```
![主次坐标轴.png](https://i.loli.net/2021/12/03/mX4asEJjRNycOYL.png)

