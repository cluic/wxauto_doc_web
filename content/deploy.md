---
title: 云服务器部署
toc: false
weight: 3
---

为了方便各位新用户，<u>**免去python的安装和wxauto环境配置过程**</u>，朴利科技为我们提供了专属wxauto系统镜像，无需自行准备电脑和配置环境即可直接启动项目。

- **超高性价比**：
  - 最低4核4G 配置可流畅挂机wxauto+微信，可应对高频场景
  - 按月付费更灵活
  - 单月价格更优惠
- **专业稳定**：专为7×24小时挂机优化
- **开箱即用**：Windows Server 2022 系统预装wxauto所需全套环境、内置防异地检查方法

{{< cards >}}
  {{< card link="https://www.pulidc.com/buy/wxauto" image="/images/puli1.png" title="👉点击购买：4核4G 12/月" tag="点击跳转" tagType="info" >}}
  {{< card link="https://www.pulidc.com/buy/wxauto" image="/images/puli2.png" title="👉点击购买：4核8G 15/月" tag="点击跳转" tagType="info" >}}
{{< /cards >}}

### 预装环境清单
| 组件类别     | 包含内容                                                     |
| ------------ | ------------------------------------------------------------ |
| **核心应用** | Windows微信官方版（3.9.12.51 wxauto可用）                    |
| **开发环境** | Python环境  +  wxauto库  + VSCode开发环境                    |
| **系统优化** | RDP退出不锁屏脚本、系统内存管理软件(memreduct)自动优化已设置 |
| **远程管理** | VNC、Windows RDP、预装第三方远控软件（ToDesk或向日葵）       |
| **部署教程** | 开箱即用，本地调试好的程序可直接在服务器运行或者打包exe发送到服务器可直接运行 |


{{% details title="<font color=\"#f1b826\">其他云服务器</font>" closed="true" %}}

{{< cards cols="2" >}}
  {{< card link="https://cloud.tencent.com/act/cps/redirect?redirect=5695&cps_key=348fc319f5c034afed4b7c6894f3883a&from=console" title="腾讯云" >}}
  {{< card link="https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=t9ic9gas" title="阿里云" >}}
{{< /cards >}}

> [!TIP]
> 这几个链接是我的推广链接，如果你不介意的话可以通过我的链接购买，我会有一点点佣金，你不会多付钱，但是可以支持我继续开发与维护。
> **货比三家哪个便宜买哪个**

- 内存CPU：没特殊限制，能选winserver的就行
- 系统：WindowsServer2016、2019、2022版本

> [!TIP]
> 云服务器最好买你所在城市或临近城市的，因为手机ip与服务器ip所在地不是一个城市有几率触发微信异地登录风控。

{{% /details %}}

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