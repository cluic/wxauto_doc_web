---
weight: 1
bookFlatSection: true
title: "一、环境配置和安装"
---

## 一、环境配置

|  环境  |              版本               |
| :----: | :-----------------------------: |
| Python |            3.9-3.12             |
|   OS   | Windows10+, Windows Server2016+ |
|  微信  |       3.9.8+（不支持4.0）       |



## 二、安装

### 1. 开源版

```bash
pip install wxauto
```

### 2. ✨[Plus版](/plus)
```bash
pip install wxautox
```

激活：

```shell
wxautox -a [激活码]
```

![wxauto_auth](/images/wxauto_auth.png)

## 三、测试运行

```python
from wxauto import WeChat   # 开源版
# from wxautox import WeChat   # ✨Plus版

# 初始化微信实例
wx = WeChat()

# 发送消息
wx.SendMsg("你好", who="文件传输助手")

# 获取当前聊天窗口消息
msgs = wx.GetAllMessage()

for msg in msgs:
    print('==' * 30)
    print(f"{msg.sender}: {msg.content}")
```

> [!TIP] Success
> ✅ 如果测试运行成功，恭喜您，环境配置完成！