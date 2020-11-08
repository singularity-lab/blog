---
layout: post
title: Attention模型
date: 2020-11-06
author: 宋佳
categories:
    - 数据分析部
tags: 
    - 深度学习
    - 论文
---
# 产生原因
为了解决编码器-解码器框架的弊端，提出了Attention模型。它与编码器解码器不同的是，它在输出时，会产生一个“注意力范围”表示接下来输出的时候需要重点关注哪些部分，然后根据关注的重点产生下一个输出。
![](https://img-blog.csdn.net/20160120181841922)
编码器输出一个向量的序列，解码时从向量序列中挑选子集进行处理。所以就不会出现信息不完全、被覆盖、被稀释的现象。每一步输出都可以充分利用输入序列的信息。

# 概述
注意力模型在模拟人脑。我们在看一幅画时，看似在看整幅画，但其实眼睛重点观察的是其中一部分。也就是说人的注意力在这幅画上并不是平均分配，而是有侧重的。这也是一种资源分配。我们把注意力放在重要的部分，对不重要的部分视而不见。

![](https://img-blog.csdn.net/20171210213743273)

# 例子
如上面的框架图所示。输入句子X=（X1，X2，......Xm），中间语义（Context）为C=F（X1，X2，...Xm），要得到Y=（Y1，Y2，......Yn）的输出。经过attention模型输出的是

$$y_1=f1(C_1)$$
$$y_2=f1(C_2,y_1)$$
$$y_3=f1(C_3,y_1,y_2)$$
每次生成的Y用的C都是不同的。
例如输入：Tom chase Jerry时，编码器解码器框架用同样的语义编码C逐步生成“汤姆”，“追逐”，“杰瑞”。而Attention模型的语义编码每步都不同，如下

$$C_{汤姆}=g(0.6*f2(“Tom”),0.2*f2(Chase),0.2*f2(“Jerry”))$$
$$C_{追逐}=g(0.2*f2(“Tom”),0.7*f2(Chase),0.1*f2(“Jerry”))$$
$$C_{杰瑞}=g(0.3*f2(“Tom”),0.2*f2(Chase),0.5*f2(“Jerry”))$$

其中
+ f2是编码器中的变换函数
+ g是根据单词的中间语义合并成整个句子中间语义的函数

它们的关系是：

$$c_i=\sum_{j=1}^{T_x}\alpha_{ij}h_j$$


Tx是句子长度，α是权值，hj=f2（“单词”）
整个过程如下

![](https://images2018.cnblogs.com/blog/1335117/201807/1335117-20180725173159867-1650626703.png)

# 本质思想

计算Query与Key的相关性，得到Key对应的Value的权重。对Value进行加权求和，得到了Attention数值。这个过程可以表示为
$$Attention(Query,Source)=\sum_{i=1}^{L_x}Similarity(Query,Key_i)*Value_i$$

+ Lx：输入句子的长度

有如下就几个阶段

![](https://img-blog.csdn.net/20171210214910845)

+ Query:需要输出的Target中的某个元素
+ <Key,Value>:输入的Source由一系列<Key,Value>数据对构成
+ F(Q,K)：是计算Key和Query相关性的函数
+ s：计算Query与Key相关性后得到的原始数值
+ a：s归一化后的数值
+ *：权重×value的结果
+ Attention Value：加权求和后得到的Attention数值



# 参考
[Encoder-Decoder模型和Attention模型](https://blog.csdn.net/u011734144/article/details/80230633)

[深度学习之Attention Model（注意力模型）](https://www.cnblogs.com/jiangxinyang/p/9367497.html)