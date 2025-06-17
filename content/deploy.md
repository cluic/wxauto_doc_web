---
title: 云服务器部署
toc: false
weight: 3
---

## 选择服务器/虚拟机

{{< cards cols="3" >}}
  {{< card link="https://cloud.tencent.com/act/cps/redirect?redirect=5695&cps_key=348fc319f5c034afed4b7c6894f3883a&from=console" title="腾讯云" >}}
  {{< card link="https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=t9ic9gas" title="阿里云" >}}
  {{< card link="https://www.rainyun.com/NjU4NDU3_" title="雨云服务器" >}}
{{< /cards >}}

> [!TIP]
> 这几个链接是我的推广链接，如果你不介意的话可以通过我的链接购买，我会有一点点佣金，你不会多付钱，但是可以支持我继续开发与维护。
> **货比三家哪个便宜买哪个**

- 内存CPU：没特殊限制，能选winserver的就行
- 系统：WindowsServer2016、2019、2022版本

> [!TIP]
> 云服务器最好买你所在城市或临近城市的，因为手机ip与服务器ip所在地不是一个城市有几率触发微信异地登录风控。

## 远程控制

该项目为自动化模拟项目，需要窗口保持活跃（未锁屏）状态方可正常运行。

有很多远程方案，没有必须是什么，但要保证退出远程控制时不要锁屏，这里提供两个方式：

### 远程桌面WindowsRDP（MSTSC）

将以下windows批处理命令保存为.bat文件，在结束远程时以管理员权限运行，确保不会锁屏：

```bat
for /f "skip=1 tokens=3" %%s in ('query user %USERNAME%') do (
  %windir%\System32\tscon.exe %%s /dest:console
)
```

> [!NOTE]
> 该方案为热心群友提供

### VNC

1. 登录服务器，安装RealVNC server，设置登录密码和服务端口，默认为5900端口，但是最好改一下

2. 登录云服务器服务商控制台，在防火墙打开上一步设置的vnc端口的访问权限

3. 自己电脑安装RealVNC viewer，输入云服务器ip:端口进行连接，断开连接不会锁屏

4. 服务器安装微信，部署代码即可运行

### 其他商业远程软件

如向日葵、TeamViewer、ToDesk等，断开连接不会锁屏即可