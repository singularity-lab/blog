---
layout: post
title: Android开发期末课程项目——Daydreamer
date: 2020-11-04
author: 罗心悦
categories:
    - 设计部
tags:
    - Android开发
---

## 项目地址

https://github.com/Pikaqiulxy/DayDaydreamer

> 有一点丑，有一点慢，求轻喷

## 作品描述

### 作品概述

**项目名称**  Daydreamer（白日梦想家）

**目标用户**  热爱艺术的非专业白日梦想家

**项目内容**  个性化的个人艺术作品集

**项目描述**

对于热爱艺术的业余人士来说，耗费时间和精力去整理作品集绝非易事——我们甚至不知道从哪里下手。但时间久了，不知何时乍现的灵感会作品“失散”，我们会很难在一个集中的平台找到自己所有做过的东西。再者，随着移动设备的普及，pc端上传整理作品对非专业设计者来说，稍显麻烦也没有太大必要。Daydreamer项目旨在为喜欢艺术的业余“白日梦想家”们提供一个手机端作品集记录平台。用户将可以便捷地通过图文形式分类上传自己的作品及其站外链接（比如发布过的网站或者视频作品链接），记录下自己的艺术学习经验和过程，记录自己的成长。

### 功能描述

**用户流程**

```markdown
graph TD
	Start---Login
	Start---Register
	Login---Homepage
	Register---Mainpage
	Homepage---Painting
  Homepage---Design
  Homepage---Cutting
  Homepage---Handwork
  Homepage---Homepage
```

1. 加载：用户点击下载好的软件图标，系统自动加载。
2. 注册：用户设置头像、昵称、密码和个人简介，注册并自动登录（信息输入不符合要求会有相应提示），登录后进入个人中心。
3. 登录：用户输入账号密码，验证成功后进入首页。
4. 首页：首页进行用户名（昵称）、头像、作品banner展示和列表展示（首次登入时作品列表第一项自动填充为头像。首页有点击头像进入个人中心，点击列表进入详情页及点击button进入添加作品页面的功能。
5. 个人中心：注册及之后每一个右上角有头像的页面都可以点击进入个人中心。加载完成后，显示昵称、账号、简介。（注意，一定要记住自己的账号，以便登录时使用）
6. 添加作品：具有返回首页、进入个人中心、上传作品文本和图片内容功能。
7. 详情页：具有返回首页、进入个人中心、删除作品、显示作品图文详情的功能。

## 技术要点

### 环境

**编程环境** Android studio4.1

**数据库** MySQL（Server version: 5.7.31-0ubuntu0.18.04.1 (Ubuntu)）

**测试环境** Android7.1（虚拟机和vivo真机测试）

### 编码

#### 数据库

> 这个地方我们是连接云服务器的数据库。计划用jdbc连接。
>
> 我用了本地navicat来连接它，所以远程这块也实现了。

**准备及注意事项**

服务器配置：开放端口，允许本地终端连接。

数据库配置：在ubuntu服务器上下载好数据库之后，开启数据库，新建用户和库，连接用户和库。

数据库中文乱码解决：

数据库连接：数据库端口开放，远程连接开启，在gradle中添加与sql版本一致的依赖，然后java编码连接。（本地navicat和java编码连接所需要的信息差不多，注意设置一下默认加载时间，否则加载刷新时间会长达240秒）

建表：按照建表语句在终端中进入mysql建表。

主键：用户的唯一性由自动匹配的uid识别；图片的唯一性由相应用户uid及图片写入时间共同识别

##### Ubuntu18.04成功安装Mysql5.7以及配置utf8编码方式

```
# 1.安装Mysql服务
sudo apt-get update
sudo apt-get install mysql-server

# 2.设置root密码(逐次执行以下命令)
su
mysql
select user, plugin from mysql.user;

# 将”123456“替换为想设置的密码 
update mysql.user set authentication_string=PASSWORD('123456'), plugin='mysql_native_password' where user='root';

flush privileges;
exit
/etc/init.d/mysql restart   # 重启Mysql 
mysql -uroot -p  # 以root用户登录Mysql

# 3.修改默认字符编码为utf8

# 打开配置文件
nano /etc/mysql/mysql.conf.d/mysqld.cnf
# 在skip-external-locking下一行添加
character-set-server=utf8
# 保存退出

nano /etc/mysql/conf.d/mysql.cnf
# 添加
default-character-set=utf8
# 保存退出

/etc/init.d/mysql restart  # 重启Mysql服务

# 4.查看编码方式
mysql -uroot -p
show variables like "%char%";
```

##### jdbc配置

记得在AndroidManifest.xml中添加

```
<uses-permission android:name="android.permission.INTERNET" />
```

在app下的build.gradle的dependencies{}中添加

```
implementation 'mysql:mysql-connector-java:5.1.34'
```

connector版本和数据库的版本要一致

##### 代码实现

> mysql的连接必须在异步任务类中，也就是说必须新建线程来连接mysql，而不能在主线程中执行代码。

下面分别是测试连接代码和测试数据库操作代码，亲测可行：

```
final Thread thread = new Thread(new Runnable() {  //连接数据库
            @Override
									 // 2.设置好IP/端口/数据库名/用户名/密码等必要的连接信息
                    String ip = "39.97.166.131";
                    int port = 3306;
                    String dbName = "daydb";
                    String url = "jdbc:mysql://" + ip + ":" + port
                            + "/" + dbName; // 构建连接mysql的字符串
                    String user = "daydreamer";
                    String password = "123456";

                    // 3.连接JDBC
                    try {
                        Connection conn = DriverManager.getConnection(url, user, password);
                        Log.i(TAG, "远程连接成功!");
                        conn.close();
                        return;
                    } catch (SQLException e) {
                        Log.e(TAG, "远程连接失败!");
                    }
                }
            }
        });
        thread.start();
```

```
final Thread thread = new Thread(new Runnable() {  //连接数据库
            @Override
            public void run() {
                    // 2.设置好IP/端口/数据库名/用户名/密码等必要的连接信息
                    String ip = "39.97.166.131";
                    int port = 3306;
                    String dbName = "daydb";
                    String url = "jdbc:mysql://" + ip + ":" + port
                            + "/" + dbName; // 构建连接mysql的字符串
                    String user = "daydreamer";
                    String password = "123456";

                    // 3.连接JDBC
                    Connection conn = null;
                    try {
                        conn = DriverManager.getConnection(url, user, password);
                        Log.i(TAG, "远程连接成功!");
                    } catch (SQLException e) {
                        Log.e(TAG, "远程连接失败!");
                    }

                    if (conn != null) {
                        //String sql = "insert into users_d(iid,name,uid,pw,note) values(NULL,'22','11','11','11');";//数据库语句
                        String sql = "select*from users_d";
                        try {
                            // 创建用来执行sql语句的对象
                            java.sql.Statement statement = conn.createStatement();
                            // 执行sql查询语句并获取查询信息
                            ResultSet rSet = statement.executeQuery(sql);
                            // 迭代打印出查询信息
                            Log.i(TAG, "用户表");
                            while (rSet.next()) {
                                Log.i(TAG, rSet.getString("iid") + "输出解雇" + rSet.getString("name")+ "\t" );
                            }
                        } catch (SQLException e) {
                            Log.e(TAG, "createStatement error");
                        }

                        try {
                            conn.close();
                        } catch (SQLException e) {
                            Log.e(TAG, "关闭连接失败");
                        }
                    }

                }
            }
        });
        thread.start();
```

#### 图片存取及显示问题

**图片获取**：在AndroidManifest.xml配置中添加代码行允许打开手机相册，获取图片的uri之后，读取图片信息，将图片以byte[][]形式读取出来，以base64格式加密成string，为图片存储做准备。

**图片显示**：刚刚写入的图片，直接以bitmap格式进行图片展示。从数据库中取出的图片，blob->string->bitmap显示。从xml文件中读取的图片，string->bitmap显示。

**图片存放**：将长字符串转为longblob格式存入数据库

#### 文字存取和传输

**数据库存取**：数据库中存取的所有文字均尽量按照string类型存储，方便输入。

**Xml存取**：用户登录后整个系统需要的信息，比如uid和头像，用xml存储成string，方便随时调用，也相对减轻了数据库取值负担。

**Bundle传值**：仅仅需要传递到下一个页面的数据用此方法传输。

#### 列表展示和列表点击事件

用自定义的textview进行列表展示，辅以adapter。（textview嵌在主页下半页，且在button的下一层），显示内容包括图片和不同格式的文字。

点击列表控件，进行相关bundle传值和跳转。

#### 真机测试崩溃处理

**情况描述**：app测试在虚拟机上可以正常打开，在真机安装好后崩溃，无法运行。android studio  Run  报错如下：

```
Failed to allocate a 144472396 byte allocation with 8388608 free bytes and 112MB until OOM
```

**原因解析**：OOM：Android 内存溢出（Java的这个异常是指，内存申请失败，前面那个数字是你想申请分配的内存字节，后面的那个数是实际可用的系统内存，显然小于前者。）

**解决方法**：

在AndroidManifest.xml中添加

```
android:hardwareAccelerated="false"
 android:largeHeap="true"
```

### 设计

设计工具：coreldraw2020

独立进行概念设计、配色、用户流程、所有图标和界面的设计制作。整个系统中的一切非用户上传的png（有button也有imageview）均为自己设计绘制导出。

## 完成难点（坑）

1. **Android studio升级坑！！！！**

Android studio升级到4.1之后，由于原来的部分原生piugin不再兼容，所以无法启动。Win环境下可以删掉这个文件夹再尝试，macos得重新下载软件。

2. 注意部分布局不可以有多层布局，选择适当的布局就好。

3. **数据库乱码怎么解决？？？**

   在每个需要统一字符串格式的地方都限制一下字符串格式为utf8，然后修改数据库的my.cnf配置（我的ubuntu服务器的配置和win及其他系统不一致）

4. **存了图片uri为什么还是找不到图片？？？？**

   不可以直接获取uri显示并存储。Android4.0以上的uri是相对地址，在后续搜索中，不能搜索到图片。且存取地址的处理，不能使用户实现跨设备登录。所以将图片直接用byte读取出来，用bitmap显示，用blob存放数据库（弊端是这样加载比较慢）。

   在数据库中blob和string能存放的数据长度都不足够大，我将长字符串转为longblob格式存入数据库，即使这样，在上传图片时还是只能选择稍小一点的图片。

   最好的解决方式肯定是图片上传服务器，同时将地址写入数据库，但是，这种方法需要写服务器接收端菜比较方便可行，对于课程作业来讲，代价较大。

5. **Adapter中代码循环运行了好几次竟然列表显示只有1行？**

   用hushmap和list双重列表时，注意代码写入的位置，尤其式定义的（如果是写在数据库取值的某个循环里面，在读取显示数据时只能显示一行（它可能是覆盖式写入）。

### 附：外部jar包配置

***-------本项目没用！！！--------***

添加存放jar的文件夹需要添加如下代码进app目录下的gradle

```
sourceSets{
    main{
    //jni库的调用会到资源文件夹下libs里面找so文件
        jniLibs.srcDirs = ['libs']
    }
}
```

> 代码添加在android{}内部
>
> （虽然但是实际上最后我还是手动创建了libs文件夹）

然后再按照链接**（配置jdbc）**把jdbc配置好，***添加依赖的时候，弹出的小框记得点下拉框点开添加jar，不要光添加libs，没用。***

