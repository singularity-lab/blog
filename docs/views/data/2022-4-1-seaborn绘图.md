---
layout: post
title: seaborn绘图
date: 2022-4-1
author: 饶翰宇
categories:
    - 数据分析部
tags:
    - Python	
    - seaborn
---

```python
import seaborn as sns
```


```python
from sklearn.datasets import load_iris,load_boston
import pandas as pd
```


```python
category_dataset = load_iris()
category_data = pd.DataFrame(category_dataset.data,columns=category_dataset.feature_names)
category_data['species'] = category_dataset.target
category_data
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sepal length (cm)</th>
      <th>sepal width (cm)</th>
      <th>petal length (cm)</th>
      <th>petal width (cm)</th>
      <th>species</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5.1</td>
      <td>3.5</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4.9</td>
      <td>3.0</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4.7</td>
      <td>3.2</td>
      <td>1.3</td>
      <td>0.2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.6</td>
      <td>3.1</td>
      <td>1.5</td>
      <td>0.2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5.0</td>
      <td>3.6</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>145</th>
      <td>6.7</td>
      <td>3.0</td>
      <td>5.2</td>
      <td>2.3</td>
      <td>2</td>
    </tr>
    <tr>
      <th>146</th>
      <td>6.3</td>
      <td>2.5</td>
      <td>5.0</td>
      <td>1.9</td>
      <td>2</td>
    </tr>
    <tr>
      <th>147</th>
      <td>6.5</td>
      <td>3.0</td>
      <td>5.2</td>
      <td>2.0</td>
      <td>2</td>
    </tr>
    <tr>
      <th>148</th>
      <td>6.2</td>
      <td>3.4</td>
      <td>5.4</td>
      <td>2.3</td>
      <td>2</td>
    </tr>
    <tr>
      <th>149</th>
      <td>5.9</td>
      <td>3.0</td>
      <td>5.1</td>
      <td>1.8</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<p>150 rows × 5 columns</p>


```python
regression_dataset = load_boston()
regression_data = pd.DataFrame(regression_dataset.data,columns=regression_dataset.feature_names)
regression_data['target'] = regression_dataset.target
regression_data
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>CRIM</th>
      <th>ZN</th>
      <th>INDUS</th>
      <th>CHAS</th>
      <th>NOX</th>
      <th>RM</th>
      <th>AGE</th>
      <th>DIS</th>
      <th>RAD</th>
      <th>TAX</th>
      <th>PTRATIO</th>
      <th>B</th>
      <th>LSTAT</th>
      <th>target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.00632</td>
      <td>18.0</td>
      <td>2.31</td>
      <td>0.0</td>
      <td>0.538</td>
      <td>6.575</td>
      <td>65.2</td>
      <td>4.0900</td>
      <td>1.0</td>
      <td>296.0</td>
      <td>15.3</td>
      <td>396.90</td>
      <td>4.98</td>
      <td>24.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.02731</td>
      <td>0.0</td>
      <td>7.07</td>
      <td>0.0</td>
      <td>0.469</td>
      <td>6.421</td>
      <td>78.9</td>
      <td>4.9671</td>
      <td>2.0</td>
      <td>242.0</td>
      <td>17.8</td>
      <td>396.90</td>
      <td>9.14</td>
      <td>21.6</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.02729</td>
      <td>0.0</td>
      <td>7.07</td>
      <td>0.0</td>
      <td>0.469</td>
      <td>7.185</td>
      <td>61.1</td>
      <td>4.9671</td>
      <td>2.0</td>
      <td>242.0</td>
      <td>17.8</td>
      <td>392.83</td>
      <td>4.03</td>
      <td>34.7</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.03237</td>
      <td>0.0</td>
      <td>2.18</td>
      <td>0.0</td>
      <td>0.458</td>
      <td>6.998</td>
      <td>45.8</td>
      <td>6.0622</td>
      <td>3.0</td>
      <td>222.0</td>
      <td>18.7</td>
      <td>394.63</td>
      <td>2.94</td>
      <td>33.4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.06905</td>
      <td>0.0</td>
      <td>2.18</td>
      <td>0.0</td>
      <td>0.458</td>
      <td>7.147</td>
      <td>54.2</td>
      <td>6.0622</td>
      <td>3.0</td>
      <td>222.0</td>
      <td>18.7</td>
      <td>396.90</td>
      <td>5.33</td>
      <td>36.2</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>501</th>
      <td>0.06263</td>
      <td>0.0</td>
      <td>11.93</td>
      <td>0.0</td>
      <td>0.573</td>
      <td>6.593</td>
      <td>69.1</td>
      <td>2.4786</td>
      <td>1.0</td>
      <td>273.0</td>
      <td>21.0</td>
      <td>391.99</td>
      <td>9.67</td>
      <td>22.4</td>
    </tr>
    <tr>
      <th>502</th>
      <td>0.04527</td>
      <td>0.0</td>
      <td>11.93</td>
      <td>0.0</td>
      <td>0.573</td>
      <td>6.120</td>
      <td>76.7</td>
      <td>2.2875</td>
      <td>1.0</td>
      <td>273.0</td>
      <td>21.0</td>
      <td>396.90</td>
      <td>9.08</td>
      <td>20.6</td>
    </tr>
    <tr>
      <th>503</th>
      <td>0.06076</td>
      <td>0.0</td>
      <td>11.93</td>
      <td>0.0</td>
      <td>0.573</td>
      <td>6.976</td>
      <td>91.0</td>
      <td>2.1675</td>
      <td>1.0</td>
      <td>273.0</td>
      <td>21.0</td>
      <td>396.90</td>
      <td>5.64</td>
      <td>23.9</td>
    </tr>
    <tr>
      <th>504</th>
      <td>0.10959</td>
      <td>0.0</td>
      <td>11.93</td>
      <td>0.0</td>
      <td>0.573</td>
      <td>6.794</td>
      <td>89.3</td>
      <td>2.3889</td>
      <td>1.0</td>
      <td>273.0</td>
      <td>21.0</td>
      <td>393.45</td>
      <td>6.48</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>505</th>
      <td>0.04741</td>
      <td>0.0</td>
      <td>11.93</td>
      <td>0.0</td>
      <td>0.573</td>
      <td>6.030</td>
      <td>80.8</td>
      <td>2.5050</td>
      <td>1.0</td>
      <td>273.0</td>
      <td>21.0</td>
      <td>396.90</td>
      <td>7.88</td>
      <td>11.9</td>
    </tr>
  </tbody>
</table>
<p>506 rows × 14 columns</p>
# 数值

## distribution+plot


```python
sns.displot(data['sepal length (cm)'],rug=True,palette='pastel',kind='hist')
```

![1](https://i.ibb.co/GRNpmz1/output-13-1.png)


## 核密度估计图


```python
sns.kdeplot('sepal width (cm)','petal width (cm)',data=category_data,shade=True,palette=sns.color_palette('husl',2))
```


![png](https://i.ibb.co/Fhs8jnn/output-15-2.png)
    


## 双变量分布图


```python
sns.jointplot(data=category_data)
```


![png](https://i.ibb.co/q15Fkn7/output-17-1.png)
    


## 多变量分布图


```python
sns.pairplot(data=category_data.iloc[:,:-1])
```


![png](https://i.ibb.co/82mcqQr/output-19-1.png)
    


## 变量关系图


```python
sns.relplot(x='sepal length (cm)',y='sepal width (cm)',data=category_data,hue='species',style='species',palette='pastel')
```


![png](https://i.ibb.co/YL9gXL9/output-21-1.png)
    


## 散点图


```python
sns.scatterplot(data=category_data.iloc[:,:-1])
```


![png](https://i.ibb.co/5Mx2WMh/output-23-1.png)
    


## 线图


```python
sns.lineplot(x='sepal length (cm)',y='sepal width (cm)',data=category_data,estimator=None,hue='species',
             style='species',markers=True,units='sepal width (cm)')
```


![png](https://i.ibb.co/4YRf9tQ/output-25-1.png)
    


## 回归图


```python
sns.regplot(x='sepal length (cm)',y='sepal width (cm)',color='pink',marker='*',order=2,data=category_data)
```


![png](https://i.ibb.co/5sqc7GH/output-27-1.png)
    

```python
sns.regplot(x=category_data['sepal length (cm)'],y=category_data['sepal width (cm)'],data=category_data)
```


![png](https://i.ibb.co/zFbhZcj/output-28-1.png)
    


## 残差分布图


```python
sns.residplot(x='sepal length (cm)',y='sepal width (cm)',data=category_data,color='red')
```


![png](https://i.ibb.co/p26fy27/output-30-1.png)
    

## 热力图


```python
sns.heatmap(category_data.iloc[:,:-1].corr(),cbar=False,fmt='.2f',annot=True,linewidths=0.5,linecolor='gray',square=True,cmap='YlGnBu_r')
```


![png](https://i.ibb.co/HPtLrwp/output-34-1.png)

```python
sns.clustermap(category_data.iloc[:,:-1].corr(),annot=True)
```


![png](https://i.ibb.co/3fJsQbj/output-35-1.png)

# 分类

## 散点图


```python
sns.stripplot(x='species',y='sepal width (cm)',data=category_data)
```


![png](https://i.ibb.co/QFXwbJP/output-41-1.png)
    

```python
sns.swarmplot(x='species',y='sepal width (cm)',data=category_data)
```


![png](https://i.ibb.co/gMDQFbg/output-42-1.png)
    

## 箱线图


```python
sns.boxplot(x='species',y='sepal width (cm)',data=category_data)
```


![png](https://i.ibb.co/cT6dLMw/output-45-1.png)
    

```python
sns.boxenplot(x='species',y='sepal width (cm)',data=category_data)
```


![png](https://i.ibb.co/dcJqL3k/output-46-1.png)
    


## 小提琴图


```python
sns.violinplot(x='species',y='sepal width (cm)',data=category_data,kind='violin',split=True,bw=0.5,cut=.5,inner='stick',palette='pastel')
```


![png](https://i.ibb.co/64mHH74/output-51-1.png)
    


## 统计图


```python
sns.pointplot(x='species',y='sepal width (cm)',data=category_data,ci=50)  #均值
```


![png](https://i.ibb.co/MG9d1tz/output-54-1.png)
    

```python
sns.barplot(x='species',y='sepal width (cm)',data=category_data,ci=50)
```


![png](https://i.ibb.co/tZtYrgg/output-55-1.png)
    

