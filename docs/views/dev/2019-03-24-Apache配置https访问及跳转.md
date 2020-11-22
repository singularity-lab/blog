---
layout: post
title: Apache 配置 https 访问及跳转
date: 2019-03-24
author: Cathandra
categories:
  - 开发部
tags:
  - Apache
  - https
  - 后端
  - 服务器
---

这星期为 Apache 服务器安装了 https，过程和以前用 Tomcat 的有很大差别。记笔记总结一下。

<!-- more -->

## 环境

- 操作系统：CentOS 7.4
- Apache：2.4

## 获取证书

1. 开启 `https` 服务；
2. 为域名申请 SSL 证书。成功后，下载证书文件和私钥文件。  
   其中，Apache 文件夹内应有 3 个文件：

> 1_root_bundle.crt  
> 2_www.domain.com.crt  
> 3_www.domain.com.key

## 证书安装

1. 将上述三个文件放在服务器的 Apache/conf 路径下，（可以专门创建一个文件夹，但确保在下面的配置步骤中可以找到证书文件的路径）。
2. 编辑 `Apache/conf` 下的 `httpd.conf` 文件，取消以下代码的前的注释符号：

```

 LoadModule ssl_module modules/mod_ssl.so
 LoadModule socache_dbm_module modules/mod_socache_dbm.so
 LoadModule socache_shmcb_module modules/mod_socache_shmcb.so
 Include conf/extra/httpd-ssl.conf

```

3. 编辑 `Apache/conf/extra/` 下的文件 `httpd-ssl.conf`  
   确保以下选项前的注释已被取消：

```

SSLCipherSuite HIGH:MEDIUM:!SSLv3:!####
SSLProxyCipherSuite HIGH:MEDIUM:!SSLv3:!####
SSLHonorCipherOrder on
SSLProtocol all -SSLv3
SSLProxyProtocol all -SSLv3
SSLPassPhraseDialog  builtin
SSLSessionCache        "shmcb:/usr/local/apache24//logs/ssl_scache(512000)"
SSLSessionCacheTimeout  300

```

4. 修改 `<VirtualHost _default_:443>` 标签内的内容

- 将 `DocumentRoot` 改为你的项目地址

```
    DocumentRoot "/your/location/"
```

- 将 `SSLEngine` 设置为 `on`

```
    SSLEngine on
```

- 将你的域名信息与证书地址设置在相应选项下

```

    ServerName www.domain.com

    SSLCertificateChainFile /usr/local/apache/conf/1_root_bundle.crt
    SSLCertificateFile /usr/local/apache/conf/2_www.domain.com_cert.crt
    SSLCertificateKeyFile /usr/local/apache/conf/3_www.domain.com.key

```

5. 此时可以分别访问`80`端口与`443`端口，如果`80`成功而`443`失败，则大多是 `httpd-ssl.conf` 的配置有误，可以输入如下命令调 `error_log` ，根据报错情况返回检查。

```
tail -f apache/logs/error_log
```

## 配置重定向

1. 编辑 `Apache/conf` 下的 `httpd.conf` 文件，取消以下代码的前的注释符号：

```
 LoadModule rewrite_module modules/mod_rewrite.so
```

2. 编辑 `Apache/conf` 下的 `httpd.conf` 文件，在 `<VirtualHost *:80>`标签下添加以下代码：

```

RewriteEngine on
RewriteCond %{SERVER_PORT} !^443$
RewriteRule ^(.*)?$ https://%{SERVER_NAME}%{REQUEST_URI} [L,R]

```

这样，`80` 端口的所有项目就都会转发到 `https` 。  
如有不想跳转到 `https` 的情况，需要写 `.htaccess` 文件。

## 参考资料

1. [域名管理](https://cloud.tencent.com/document/product/267/20381)
2. [HTTPS 配置](https://cloud.tencent.com/document/product/267/32826)
3. [证书安装](https://cloud.tencent.com/document/product/400/4143)
