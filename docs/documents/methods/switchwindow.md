---
sidebar_position: 4
title: 4. 切换聊天窗口
---

# 切换聊天窗口

## 1. 切换到指定好友聊天框

`ChatWith`方法用于切换到指定好友聊天框

参数说明：
| 参数名 | 类型 | 默认值 |            说明            |
| :----: | :--: | :----: | :------------------------: |
|  who   | str  |   /    | 要打开的聊天框好友名或群名 |

```python title="Python"
from wxauto import WeChat

wx = WeChat()

# 切换到指定好友聊天框
who = '张三'
wx.ChatWith(who=who)
```

## 2. 切换微信主页面

此部分原理为点击微信左侧黑色侧边栏的相应图标按钮，切换至相应的页面。

### 2.1 切换到聊天页面

```python
from wxauto import WeChat

wx = WeChat()

# 切换到聊天页面
wx.SwitchToChat()
```

### 2.2 切换到通讯录页面

```python
from wxauto import WeChat

wx = WeChat()

# 切换到通讯录页面
wx.SwitchToContact()
```