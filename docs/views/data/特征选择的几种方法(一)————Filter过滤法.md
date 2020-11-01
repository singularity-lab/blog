---
layout: post
title: 2020-10-20特征选择的几种方法(一)————Filter过滤法
date: 2020-10-20
author: 宋佳
categories:
    - 数据分析部
tags:
    - python
    - 数据挖掘
---

# 特征选择
特征是否有用从两方面来考虑
+ 特征是否发散
+ 特征与目标的相关性

三种特征选择方法：
+ Filter：过滤法，按照发散性或者相关性对各个特征进行评分，设定阈值或者待选择阈值的个数，选择特征。
+ Wrapper：包装法。选择不同的特征，去训练模型，根据模型的表现结果选择最好的那批特征。
+ Embedded：嵌入法。类似包装法，也需要训练模型，但是是直接评估特征的好坏，不用通过最后的目标函数。

特征选择的目的：
+ 让模型不那么复杂，减少过拟合
+ 增强自己对特征和特征值的理解

# Filter
## 去掉方差小的特征
对于离散的特征，如果所有样本的取值都差不多，说明这个特征没什么意义。如果完全一样，说明没有任何意义了。对于连续型变量的特征，一般不会出现90%的样本都取到一模一样的数字。所以这个方法一般是针对离散型变量的特征用的（可先把连续型特征离散化）。
这个方法是指定一个方差的阈值，去掉那些方差没有达到阈值的特征。
```python
from sklearn.feature_selection import VarianceThreshold
X = [[0, 0, 1], [0, 1, 0], [1, 0, 0], [0, 1, 1], [0, 1, 0], [0, 1, 1]]
sel = VarianceThreshold(threshold=(.8 * (1 - .8)))
sel.fit_transform(X)
```
threshold参数指定的是方差的阈值，这里的形式为伯努利随机变量的方差p（1-p）

## 单变量特征选择

用一些统计方法对单个特征进行评分，选出最好的几个。对于不同的问题，有不同的评分方法。
回归问题：
+ f_regression
+ mutual_info_regression
+ 皮尔森相关系数
+ 最大信息系数

分类问题：
+ f_classif
+ 卡方检验
+ mutual_info_classf
+ 互信息

这些方法的优点：简单好理解。缺点：对于模型泛化能力的提高可能没什么用。

一些选择方法：
+ SelectKBest：取前k名
+ SelectPercentile：取前k%
+ 对每个特征使用通用的单变量统计检验： 假正率(false positive rate) SelectFpr, 伪发现率(false discovery rate) SelectFdr, 或族系误差率 SelectFwe.
+ GenericUnivariateSelect：可以设置不同的策略来进行单变量特征选择。同时不同的选择策略也能够使用超参数寻优，从而让我们找到最佳的单变量特征选择策略。

### 卡方检验（Chi2）

#### 基本思想
针对分类变量，统计样本的实际观测值和理论推断值之间的偏离程度。实际观测值与理论值完全符合时，卡方值为0。实际观测值与理论值相差越大，卡方值越大。
一般原假设是自变量和因变量不相关，因此得到的卡方值越大，说明对原假设的偏离越大（这个自变量和因变量很相关），我们就选择卡方值大的特征。
#### 对鸢尾花数据集进行卡方检验
选取最好的两个特征
```python
from sklearn.datasets import load_iris
from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import chi2
iris = load_iris()#加载iris数据集
X, y = iris.data, iris.target
X.shape#原来有150条数据，4个特征
```
(150, 4)
```python
X_new = SelectKBest(chi2, k=2).fit_transform(X, y)
X_new.shape#用卡方检验选择了最好的两个特征后的新数据集
```
(150, 2)

[一个很好的例子](https://www.cnblogs.com/dacc123/p/8746247.html)
### Pearson相关系数 (Pearson Correlation)

#### 基本思想
皮尔逊相关系数衡量两个变量的线性相关性。取值范围为[-1（完全负相关）,1（完全正相关）]，0表示完全没有线性关系。
只对线性关系敏感，如果是非线性关系(如x与x**2)，即使两个变量一一对应，也会得到趋于0的结果。[一些前置条件为：](https://guyuecanhui.github.io/2019/07/20/feature-selection-pearson/)
1. 两个变量间有线性关系；
2. 变量是连续变量；
3. 变量均符合正态分布，且二元分布也符合正态分布；
4. 两变量独立；
5. 两变量的方差不为 0；

#### Anscombe's quartet

由于这些条件的限制，我们不能随便用皮尔逊系数就对特征做出选择。最好可以可视化一下。比如以下数据的皮尔逊系数都是0.816，但它们的关系/分布却很不一样。参考：[Anscombe's quartet](https://en.wikipedia.org/wiki/Anscombe%27s_quartet)

```python
import seaborn as sns
sns.set(style="ticks")
df = sns.load_dataset("anscombe")
sns.lmplot(x="x", y="y", col="dataset", hue="dataset", data=df,
           col_wrap=2, ci=None, palette="muted", size=4,
           scatter_kws={"s": 50, "alpha": 1})
```
![下载.png](https://i.loli.net/2020/10/20/B9OErjCw5GfUm2q.png)
+ 输入：x为特征，y为目标变量.
+ 输出：r： 相关系数 [-1，1]之间，p-value: p值。
注： p值越小，表示相关系数越显著，一般p值在500个样本以上时有较高的可靠性。
```python
from scipy.stats import pearsonr
pearsonr(df.iloc[0:11,1],df.iloc[0:11,2])
```
(0.8164205163448399, 0.0021696288730787927)
```python
pearsonr(df.iloc[11:22,1],df.iloc[11:22,2])
```
(0.8162365060002427, 0.0021788162369108027)
```python
pearsonr(df.iloc[22:33,1],df.iloc[22:33,2])
```
(0.8162867394895982, 0.002176305279228025)
```python
pearsonr(df.iloc[33:44,1],df.iloc[33:44,2])
```
(0.8165214368885029, 0.002164602347197218)
### 最大信息系数
#### 基本思想
用于衡量两个变量X和Y的线性或非线性的强度。
从纵向来看，可以发现x和y的线性、非线性函数关系，甚至是非函数关系。从横向来看，具有相同强度噪声的两对x和y的最大信息系数具有近似的值。
#### 未加噪声与加了噪声的最大信息系数
```python
import numpy as np
from minepy import MINE
 
def print_stats(mine):
    print("MIC", mine.mic())
 
 
x = np.linspace(0, 1, 1000)
y = np.sin(10 * np.pi * x) + x
mine = MINE(alpha=0.6, c=15)
mine.compute_score(x, y)
 
print("Without noise:")
print_stats(mine)
print
 
np.random.seed(0)
y +=np.random.uniform(-1, 1, x.shape[0]) # add some noise
mine.compute_score(x, y)
 
print("With noise:")
print_stats(mine)
```
Without noise:
MIC 1.0000000000000002
With noise:
MIC 0.5057166934173714

把sin改成cos后

Without noise:
MIC 1.0000000000000002
With noise:
MIC 0.5690851793845927

### 距离相关系数 (Distance Correlation)
#### 基本思想
如果皮尔逊相关系数为0，变量不一定是独立的。但如果距离相关系数为0，两个变量一定独立。可以用来衡量非线性相关的程度。

#### 代码

[GitHub上的一个代码](https://gist.github.com/josef-pkt/2938402)

[距离相关系数 以及python包的安装](https://blog.csdn.net/weixin_45456209/article/details/108356586?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.channel_param)



### 基于模型的特征排序 (Model based ranking)
#### 基本思想
针对**每个单独的**特征和响应变量建立预测模型。

# 注

距离相关系数和最大信息系数都在解决皮尔逊系数做的不好的地方，但皮尔逊系数不可替代的地方在于：
1. Pearson相关系数计算速度快，这在处理大规模数据的时候很重要。
2. Pearson相关系数的取值区间是[-1，1]，而MIC和距离相关系数都是[0，1]。这个特点使得Pearson相关系数能够表征更丰富的关系，符号表示关系的正负，绝对值能够表示强度。当然，Pearson相关性有效的前提是两个变量的变化关系是单调的。

参考：[特征选择 (feature_selection)](https://www.cnblogs.com/stevenlk/p/6543628.html)


