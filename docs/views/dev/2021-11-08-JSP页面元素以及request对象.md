---
layout: post
title: JSP页面元素以及request对象
date: 2021-11-08
author: 13safa
categories:
  - 开发部
tags:
  - JSP
  - https
  - 后端
  - 服务器

---

# JSP的页面元素

### a.脚本Scriplet

##### i.

<%!	全局变量	%>

##### ii.

<%	局部变量	%>

##### iii.

<%=	输出表达式	%>

### b.指令

##### page指令

<%@page ………………%>

###### page指定的属性:

**language**:jsp页面使用的脚本语言

**import**:导入类

**pageEncoding**:jsp文件自身编码 jsp->java

**contentType**:浏览器解析jsp的编码

<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8" import="java.util.Date"%>

### c.注释

**html注释**	<!-- --> 可以通过被客户查看浏览器源码所观察到

**Java注释**	 // <*..*.......>

**jsp注释**	    <%-- --%>

#  JSP自带对象(自带的，不需要new也能使用的对象）

**out:**输出对象，向客户端输出内容

**request：**请求对象，存储“客户端向服务器发出的信息”

***String getParameter(String name)***

*根据请求的字段名key,返回对应的字段值value*

***String[] getParameterValues(String name)***

*根据请求的字段名key,返回对应的多个字段值values（checkbox(多选按钮 )）*

***void setCharacterEncoding("编码格式UTF-8")***

*设置请求编码　(tomcat8之后是utf-8)*

***getRequestDispatcher("b.jsp").forword(request,response)***

*请求转发的方式跳转页面 a->b*

***ServletContext getServerContext()***

*获取项目的 ServletContext对象*

**session:**会话对象

**application:**全局对象

**response:**响应对象

**config:**配置对象(服务器配置信息)

**out:**输出对象

**page:**当前JSP页面对象(相当于JAVA的this)

**exception:**异常对象

## 参考资料

https://www.bilibili.com/video/BV18s411u7EH?p=6

