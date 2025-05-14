---
weight: 1
bookFlatSection: true
title: "WeChat类"
---

{{< callout emoji="🌐" >}}
  **提示：**<br>`WeChat` 类继承了 [`Chat`类](/docs/class/Chat) 的所有方法，有关聊天框内的操作，请参考 [`Chat`类](/docs/class/Chat) 的文档。
{{< /callout >}}

## WeChat 类方法

### 概念

为确保您可以理解该文档的一些内容，这里先简单介绍一下 wxauto(x) 的设计思路，如下图所示，wxauto(x) 将微信窗口拆解为三部分：

- <font color='#00a2e8'>**导航栏（NavigationBox）：下图蓝色框内部分**</font>
- <font color='#26b24f'>**会话列表（SessionBox）：下图绿色框内部分**</font>
  - 会话列表项（[`SessionElement`](/docs/class/other/#sessionelement)）：会话列表中每一个会话的元素，如好友、群聊、公众号等
- <font color='red'>**聊天框（[Chat](/docs/class/Chat)）：下图红色框内部分**</font>

![/images/wechat_window.png](/images/wechat_window.png)

### 初始化参数

| 参数     | 类型 | 默认值 | 描述                             |
| -------- | ---- | ------ | -------------------------------- |
| nickname | str  | None   | 微信昵称，用于定位特定的微信窗口 |
| debug    | bool | False  | 是否开启调试模式                 |

```python
from wxautox import WeChat

wx = WeChat()
```

### 获取当前会话列表 GetSession

```python
sessions = wx.GetSession()
for session in sessions:
    print(session.info)
```

**返回值**：

- 类型：`List[SessionElement]`
- 描述：当前会话列表

### ✨发送链接卡片 SendUrlCard

```python
wx.SendUrlCard(url="https://example.com", friends="张三", timeout=10)
```

**参数**：

| 参数    | 类型                  | 默认值 | 描述                                   |
| ------- | --------------------- | ------ | -------------------------------------- |
| url     | str                   | 必填   | 链接地址                               |
| friends | Union[str, List[str]] | None   | 发送对象，可以是单个用户名或用户名列表 |
| timeout | int                   | 10     | 等待时间（秒）                         |

**返回值**：

- 类型：[WxResponse](#WxResponse)
- 描述：发送结果

### 打开聊天窗口 ChatWith

```python
wx.ChatWith(who="张三", exact=False)
```

**参数**：

| 参数  | 类型 | 默认值 | 描述                   |
| ----- | ---- | ------ | ---------------------- |
| who   | str  | 必填   | 要聊天的对象           |
| exact | bool | False  | 搜索好友时是否精确匹配 |

**返回值**：无

### 获取子窗口实例 GetSubWindow

```python
chat = wx.GetSubWindow(nickname="张三")
```

**参数**：

| 参数     | 类型 | 默认值 | 描述                 |
| -------- | ---- | ------ | -------------------- |
| nickname | str  | 必填   | 要获取的子窗口的昵称 |

**返回值**：

- 类型：`Chat`
- 描述：子窗口实例

### 获取所有子窗口实例 GetAllSubWindow

```python
chats = wx.GetAllSubWindow()
```

**返回值**：

- 类型：`List[Chat]`
- 描述：所有子窗口实例的列表

### 添加监听聊天窗口 AddListenChat

{{< cards >}}
  {{< card link="/docs/example/#2-监听消息" title="👉监听消息" tag= "使用示例" >}}
{{< /cards >}}

```python
def on_message(msg, chatname):
    print(f"收到来自 {chatname} 的消息: {msg.content}")

wx.AddListenChat(nickname="张三", callback=on_message)
```

**参数**：

| 参数     | 类型                                              | 默认值 | 描述                                                       |
| -------- | ------------------------------------------------- | ------ | ---------------------------------------------------------- |
| nickname | str                                               | 必填   | 要监听的聊天对象                                           |
| callback | Callable[[[Message](/docs/class/message/), str], None] | 必填   | 回调函数，参数为([Message](/docs/class/message/)对象, [Chat](/docs/class/chat/)对象) |

**返回值**：

- 成功时：
  - 类型：[Chat](/docs/class/chat/)
  - 描述：该监的听子窗口实例

- 失败时：
  - 类型：[WxResponse](#WxResponse)
  - 描述：执行结果，成功时包含监听名称

### 移除监听聊天 RemoveListenChat

```python
wx.RemoveListenChat(nickname="张三")
```

**参数**：

| 参数     | 类型 | 默认值 | 描述                 |
| -------- | ---- | ------ | -------------------- |
| nickname | str  | 必填   | 要移除的监听聊天对象 |

**返回值**：

- 类型：[WxResponse](#WxResponse)
- 描述：执行结果

### 开始监听 StartListening

```python
wx.StartListening()
```

**参数**：无

**返回值**：无

### 停止监听 StopListening

```python
wx.StopListening()
```

**参数**：

| 参数     | 类型 | 默认值 | 描述                 |
| -------- | ---- | ------ | -------------------- |
| remove | bool  | True   | 是否移出所有子窗口 |

**返回值**：无

### 保持运行 KeepRunning

用于防止监听时程序退出

```python
wx.KeepRunning()
```

### ✨进入朋友圈 Moments

```python
moments = wx.Moments(timeout=3)
```

**参数**：

| 参数    | 类型 | 默认值 | 描述           |
| ------- | ---- | ------ | -------------- |
| timeout | int  | 3      | 等待时间（秒） |

**返回值**：

- 类型：`MomentsWnd`
- 描述：朋友圈窗口实例

### 获取下一个新消息 GetNextNewMessage

```python
messages = wx.GetNextNewMessage(filter_mute=False)
```

**参数**：

| 参数        | 类型 | 默认值 | 描述                 |
| ----------- | ---- | ------ | -------------------- |
| filter_mute | bool | False  | 是否过滤掉免打扰消息 |

**返回值**：

- 类型：Dict[str, List[[Message](/docs/class/message/)]
- 描述：消息列表，键为聊天名称，值为消息列表

### ✨获取新的好友申请列表 GetNewFriends

{{< cards >}}
  {{< card link="/docs/example/#3-处理好友申请" title="👉处理好友申请" tag= "使用示例" >}}
{{< /cards >}}

```python
newfriends = wx.GetNewFriends(acceptable=True)
```

**参数**：

| 参数       | 类型 | 默认值 | 描述                       |
| ---------- | ---- | ------ | -------------------------- |
| acceptable | bool | True   | 是否过滤掉已接受的好友申请 |

**返回值**：

- 类型：List[[`NewFriendElement`](/docs/class/other/#newfriendelement)]
- 描述：新的好友申请列表

**示例**：

```python
newfriends = wx.GetNewFriends(acceptable=True)
tags = ['标签1', '标签2']
for friend in newfriends:
    remark = f'备注{friend.name}'
    friend.Accept(remark=remark, tags=tags)  # 接受好友请求，并设置备注和标签
```

### ✨添加新的好友 AddNewFriend

```python
wx.AddNewFriend(keywords="张三", addmsg="我是小明", remark="老张", tags=["同学"], permission="朋友圈", timeout=5)
```

**参数**：

| 参数       | 类型                        | 默认值   | 描述                                     |
| ---------- | --------------------------- | -------- | ---------------------------------------- |
| keywords   | str                         | 必填     | 搜索关键词，可以是昵称、微信号、手机号等 |
| addmsg     | str                         | None     | 添加好友时的附加消息                     |
| remark     | str                         | None     | 添加好友后的备注                         |
| tags       | List[str]                   | None     | 添加好友后的标签                         |
| permission | Literal['朋友圈', '仅聊天'] | '朋友圈' | 添加好友后的权限                         |
| timeout    | int                         | 5        | 搜索好友的超时时间（秒）                 |

**返回值**：

- 类型：[WxResponse](#WxResponse)
- 描述：添加好友的结果

### 切换到聊天页面 SwitchToChat

```python
wx.SwitchToChat()
```

**返回值**：无

### 切换到联系人页面 SwitchToContact

```python
wx.SwitchToContact()
```

**返回值**：无


### 是否在线 IsOnline

```python
wx.IsOnline()
```

**返回值**：

- 类型：bool

### 获取我的信息 GetMyInfo

获取自己的微信号等信息

```python
wx.GetMyInfo()
```

**返回值**：

- 类型：Dict[str, str]