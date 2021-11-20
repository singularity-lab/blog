---
layout: post
title: python turtle 时钟画法
date: 2021-11-20
author: yuping0924
categories:
    - 数据分析部
tags:
    - 时钟程序
    - python turtle
---    
    
    #引入turtle  datetime 和time 三个函数库
    import turtle as t
    import datetime as dt
    import time
    #设置窗口大小
    t.setup(600,600)
    #隐藏画图的轨迹，这里的0就代表False
    t.tracer(0)    
    t.speed(0)
    t.hideturtle()
    #定义函数画时钟
    def draw_clock(h,m,s):
        t.clear()#因为要多次重复画图每次将屏幕清空后才不会闪现
        t.penup()
        t.pensize(3)
        t.goto(0,-210)#移动画笔，使圆出现在正中间
        t.setheading(0)#上一步后画笔指向正东，要将其指向正上方
        t.pendown()
        t.circle(210)

        #画刻度
        t.left(90)
        t.penup()
        t.goto(0,0)#将画笔放回正中间
        #利用循环画刻度
        for __ in range(12):
            t.penup()
            t.forward(190)
            t.pendown()
            t.forward(20)
            t.penup()
            t.goto(0,0)
            t.right(30)
        #画时针
        t.pensize(5)
        t.right(h/12*360)
        t.pendown()
        t.forward(70)

        #画分针和秒针
        t.penup()
        t.goto(0,0)
        t.setheading(90)
        t.pendown()
        t.right(m/60*360)
        t.forward(110)

        t.penup()
        t.goto(0,0)
        t.setheading(90)
        t.pendown()
        t.right(s/60*360)
        t.forward(170)
        
        #重置画笔位置
        t.penup()
        t.goto(-75,-70)
        s="{}年{}月{}日".format(now.year,now.month,now.day)
        t.write(s,"center",font=["Arial","20"])
    #用循环无限更新指针位置
    while True:
        t.update()#更新前面隐藏的轨迹，使画面出现
        time.sleep(1)#延迟一秒画图，减少占用的内存
        #实时更新
        now=dt.datetime.now()
        draw_clock(now.hour,now.minute,now.second)
