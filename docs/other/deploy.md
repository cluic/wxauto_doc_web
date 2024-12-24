---
sidebar_position: 1
title: 云服务器部署
---

# 云服务器部署

## 1. 购买云服务器

选个便宜的新用户大概60一年的就可以部署了

<a href="https://cloud.tencent.com/act/cps/redirect?redirect=5695&cps_key=348fc319f5c034afed4b7c6894f3883a&from=console" target="_blank"><img src="/img/tencentcloud.png" alt="腾讯云" width="200"/></a><a href="https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=t9ic9gas" target="_blank"><img src="/img/aliyun.png" alt="阿里云" width="200"/></a>

:::tip
这两个链接是我的推广链接，如果你不介意的话可以通过我的链接购买，我会有一点点佣金，你不会多付钱，但是可以支持我继续开发与维护。
:::

内存：2G+

系统：WindowsServer2016、2019、2022版本

:::info 提示
没试过1G的内存，我最小测试过2G的所以推荐至少2G
:::

## 2. 远程控制

_由于windows系统自带的远程控制RDP(MSTSC)在结束远程时会自动锁屏，导致该项目无法正常运行，所以要更换其他远程控制软件。_

有很多远程方案，这里推荐使用VNC：

1. 登录服务器，安装RealVNC server，设置登录密码和服务端口，默认为5900端口，但是最好改一下

2. 登录云服务器服务商控制台，在防火墙打开上一步设置的vnc端口的访问权限
3. 自己电脑安装RealVNC viewer，输入云服务器ip:端口进行连接，断开连接不会锁屏
4. 服务器安装微信，部署代码即可运行

:::info 提示
1. 远程方案有很多，没有必须是VNC，只要不锁屏用什么都可以，向日葵也可以。
2. 云服务器最好买你所在城市或临近城市的，因为手机ip与服务器ip所在地不是一个城市有几率触发微信异地登录风控。
:::

<!-- ## 附 - RealVNC配置指南

<details>
<summary>点击查看VNC配置指南</summary>

敬请期待，懒得写 =。=

</details> -->