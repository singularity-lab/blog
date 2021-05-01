---
layout: post
title: GSA_NumericalExperiment
date: 2021-04-02
author: 宋佳
categories:
    - 数据分析部
tags: 
    - 优化方法
    - 智能算法
---


# 算法流程
1. 生成初始种群（N个）；
2. 在当前温度下，N个点功产生N×L个新解；
3. Metropolis接收准则舍弃一些点；
4. 计算每个点的适应值，选择N个点作为生存集；
5. 如果第四步中适应值最大的点被舍弃了，那么就随机舍弃一个点，又把它加回来；
6. 降温，重复2-4步。

# 代码结构介绍
## GSA
效果最好的方法，封装为父类。
代码实现细节：
1. 生成初始种群时，以一个给定的初始点为中心，在定义域内进行随机扰动生成。
2. 接受新个体时遵循Metropolis接受准则。接受概率p与当前的温度大小有关。即可实现前期广泛搜索，后期在局部搜索的效果。
3. 生成新个体的方法基于fast模拟退火类中的方法。
4. 生成新种群结合第二步与第三步。
5. 选择生存集的方法有很多，这里采用锦标赛选择法。
6. 降温方式类似fast模拟退火类，但由于遗传模拟退火算法所需的迭代次数较少，因此在公式中乘10（或其他常数）来增加代码运行效率。
7. 终止条件：两次的结果足够接近。
## fastGSA

1. 生成新个体
u ~ Uniform(0, 1, size = d)
y = sgn(u - 0.5) * T * ((1 + 1/T)**abs(2*u - 1) - 1.0)
xc = y * (upper - lower)
x_new = x_old + xc
 
2. 降温方式
c = n * exp(-n * quench)
T_new = T0 * exp(-c * k**quench)

## cauchyGSA

1. 生成新个体
u ~ Uniform(-pi/2, pi/2, size=d)
xc = learn_rate * T * tan(u)
x_new = x_old + xc
 
2. 降温方式
T_new = T0 / (1 + k)

## BoltzmannGSA

1. 生成新个体
std = minimum(sqrt(T) * ones(d), (upper - lower) / (3*learn_rate))
y ~ Normal(0, std, size = d)
x_new = x_old + learn_rate * y
 
2. 降温方式
T_new = T0 / log(1 + k)

# 几个函数上的表现

注：
1. 不同的效果差异在于改变了锦标赛选手数。
2. 由于要打印语句和画图，运行时间会更大。真实的运行时间看后续参数分析。
## 一维

### 函数1

$$f(x)=0.1x^2-\cos(2\pi x)+1$$
$$最小值：f(0)=0$$

1. 效果1

参数设置：
```python
x_min = np.array(-5)
x_max = np.array(5)
demo = GSA(func=fun2, T_max=1, T_min=1e-20, pop=50, new_pop=30, cur_g=1, p=0.9, tour_n=2, shape=1)
```

![函数1效果1.gif](https://i.loli.net/2021/01/08/czKThnBxaRvEwe8.gif)

当前温度1.6988636741377347e-21
Duration time: 17.976
iterations:14
x_best:[2.86366444e-10]
y_best:[0.]

2. 效果2

参数设置：
```python
x_min = np.array(-5)
x_max = np.array(5)
demo = GSA(func=fun2, T_max=1, T_min=1e-20, pop=50, new_pop=30, cur_g=1, p=0.9, tour_n=50, shape=1)
```

![函数1效果2.gif](https://i.loli.net/2021/01/08/qPGCFlnm6YjDcT2.gif)

当前温度1.654089845413957e-13
Duration time: 12.921
iterations:9
x_best:[3.25499895e-11]
y_best:[0.]

### 函数2

$$f(x)=|0.2x|+10\sin (5x)+7\cos (4x)$$
$$最小值：f(0.8940484541)=-15.878711204605864
$$

1. 效果1
参数设置

```python
x_min = np.array(-4)
x_max = np.array(4)
demo = GSA(func=fun1,T_max=1,T_min=1e-15,pop=50,new_pop=30,cur_g=1,p=0.9,tour_n=2,shape=1)
```

![函数2效果1.gif](https://i.loli.net/2021/01/08/4JdEPkjIBgVmWxf.gif)

当前温度1.654089845413957e-13
Duration time: 12.548
iterations:9
x_best:[0.89404845]
y_best:[-15.8787112]


2. 效果2
参数设置：

```python
x_min = np.array(-4)
x_max = np.array(4)
demo = GSA(func=fun1,T_max=1,T_min=1e-15,pop=50,new_pop=30,cur_g=1,p=0.9,tour_n=2,shape=1)
```

![函数2效果2.gif](https://i.loli.net/2021/01/08/Cn8tITmvHZFsOgp.gif)

当前温度1.0270685590918262e-08
Duration time: 13.542
iterations:6
x_best:[0.89404848]
y_best:[-15.8787112]

## 二维 

### Griewangk

$$f(x,y)=\frac {1}{4000}(x^2+y^2)-\cos (x)\cos (\frac{y}{\sqrt{2}})+1$$
$$最小值：f(0,0)=0$$

1. 效果1

参数设置：
```python
 x_min = np.array([-600, -600])
    x_max = np.array([600, 600])
    demo = GSA(func=Griewangk, T_max=1, T_min=1e-50, pop=30, new_pop=30, cur_g=1, p=0.9, tour_n=5, shape=2)
```

![griwank效果1.gif](https://i.loli.net/2021/01/08/sOYdpGZy3zJC7N6.gif)

当前温度2.7360132167015686e-26
Duration time: 20.141
iterations:17
x_best:[ 3.14004724 -4.43838965]
y_best:0.007396041389188146

这个函数太难搜索了，因此在效果2中把初始种群数和锦标赛选手数都提高。

2. 效果2

参数设置：

```python
x_min = np.array([-600, -600])
x_max = np.array([600, 600])
demo = GSA(func=Griewangk, T_max=1, T_min=1e-50, pop=50, new_pop=30, cur_g=1, p=0.9, tour_n=50, shape=2)
```

![griwank效果2.gif](https://i.loli.net/2021/01/08/oh1C2ujJv6cEX4r.gif)

当前温度1.7448494658901014e-29
Duration time: 25.463
iterations:19
x_best:[-1.58772346e-09 -1.31180736e-08]
y_best:0.0


### Rastrigrin

$$f(x,y)=20+x^2+y^2-10\cos (2\pi x)-10\cos (2\pi y)$$
$$最小值：f(0,0)=0$$

1. 效果1

参数设置：
```python
 x_min = np.array([-10,-10])
x_max = np.array([10,10])
demo = GSA(func=Rastrigrin, T_max=1, T_min=1e-20, pop=30, new_pop=30, cur_g=1, p=0.9, tour_n=5, shape=2)
```

![ra效果1.gif](https://i.loli.net/2021/01/08/fRPhKZtsvYUidS7.gif)

当前温度1.6988636741377347e-21
Duration time: 23.441
iterations:14
x_best:[4.28292854e-09 5.22633776e-11]
y_best:3.552713678800501e-15

2. 效果2

参数设置：

```python
x_min = np.array([-10,-10])
x_max = np.array([10,10])
demo = GSA(func=Rastrigrin, T_max=1, T_min=1e-20, pop=30, new_pop=30, cur_g=1, p=0.9, tour_n=30, shape=2)

```

![ra效果2.gif](https://i.loli.net/2021/01/09/79dFx5rXqwe8Zbk.gif)

当前温度2.6639051429252757e-18
Duration time: 29.357
iterations:12
x_best:[-1.82826828e-09  5.69924451e-10]
y_best:0.0



# 参数分析

以Rastrigrin函数来分析这些参数的作用。
基本参数设置：

```python
x_min = np.array([-10,-10])
x_max = np.array([10,10])
demo = GSA(func=Rastrigrin, T_max=1, T_min=1e-20, pop=30, new_pop=30, cur_g=1, p=0.9, tour_n=10, shape=2)
```
每个结果都是运行20次后取平均值。

## 降温方式

相比最开始选用的```T = T * 0.7```降温方式，GSA与三个子类的降温方式都非常快速。在温度较小时程序运行的速度也比较快。

0.7降温的温度如下变化：
![0.7.png](https://i.loli.net/2021/01/09/4CJPMRtk5jBfQbH.png)

而GSA与三个子类的温度变化趋势都如下：
y的范围为0-1时：
![GSA的降温过程总.png](https://i.loli.net/2021/01/09/JweuGZPhFHg79zD.png)
y的范围为0-0.1时：
![GSA的降温过程.png](https://i.loli.net/2021/01/09/yk9zvGAXQbLSnEf.png)
y的范围为0-0.01时：
![GSA的降温过程0.01.png](https://i.loli.net/2021/01/09/uZdiEG97HgvXBqA.png)


## 每个个体新生成的个体数

1. 新个体数与迭代次数的关系


![新个体数与迭代次数2.png](https://i.loli.net/2021/01/09/UuqhiRZVfQW7gAt.png)

2. 新个体数与运行时间的关系

![新个体数与运行时间2.png](https://i.loli.net/2021/01/09/cnx6WITPBENwLOm.png)

每个个体新生成的个体数越多，所需的迭代次数就越少，但同时运行时间也会增加。图像没有出现明显的拐点，因此选取参数时根据自己所需的效果选取就可以。

## 锦标赛选手数

1. 锦标赛选手数与迭代次数的关系

![锦标赛选手数和迭代次数2.png](https://i.loli.net/2021/01/09/jHclSfs5QigZ89R.png)

2. 锦标赛选手数与运行时间的关系

![锦标赛选手数和运行时间2.png](https://i.loli.net/2021/01/09/12MT4yj5JaWRQvZ.png)

每轮锦标赛选手数越多，所需的迭代次数就越少，同时运行时间也是增加的趋势。根据锦标赛选手数与迭代次数的关系可以看出，在基本参数的条件下，选手数为20时效果较好。在20之后继续增加锦标赛选手数，提升效果不大，且要增加运行时间。

## 代码

重复的代码就不放了，修改一点参数就可以。
```python
if __name__ == "__main__":
    x_min = np.array([-10,-10])
    x_max = np.array([10,10])
    new_pop = [5,10,15,20,25,30,35,40,45,50]
    timee = []
    for new in new_pop:
        time_tmp = []
        for i in range(20):
            start = time.time()  # 开始计时
            demo = GSA(func=Rastrigrin, T_max=1, T_min=1e-20, pop=30, new_pop=new, cur_g=1, p=0.9, tour_n=10, shape=2)
            demo.xrange(x_min, x_max)
            demo.main()
            end = time.time()  # 结束计时
            time_tmp.append(end-start)
            print("Duration time: %0.3f" % (end - start))  # 
        timee.append(np.mean(time_tmp))
    plt.plot(new_pop, timee)
    plt.ylabel('运行时间')
    plt.xlabel('每个个体新生成的个体数')
    plt.show()
```