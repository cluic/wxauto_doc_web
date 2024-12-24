---
sidebar_position: 2
title: 2. 获取消息
---

# 获取消息

## 1. 获取当前聊天窗口消息

`GetAllMessage`方法用于获取**微信主窗口**当前聊天窗口的所有消息，返回消息对象列表

参数说明：
| 参数名  | 类型 | 默认值 |         说明         |
| :-----: | :--: | :----: | :------------------: |
| savepic | bool | False  | 是否自动保存聊天图片 |
| savefile | bool | False  | 是否自动保存聊天文件 |
| savevoice | bool | False  | 是否自动保存聊天语音转文字内容 |

### 1.1 仅获取文字消息

无需参数，直接调用`GetAllMessage`方法即可获取当前聊天窗口的所有消息
    
```python title="Python"
from wxauto import WeChat

wx = WeChat()

# 获取当前聊天窗口消息
msgs = wx.GetAllMessage()

# 输出消息内容
for msg in msgs:
    if msg.type == 'sys':
        print(f'【系统消息】{msg.content}')
    
    elif msg.type == 'friend':
        sender = msg.sender # 这里可以将msg.sender改为msg.sender_remark，获取备注名
        print(f'{sender.rjust(20)}：{msg.content}')

    elif msg.type == 'self':
        print(f'{msg.sender.ljust(20)}：{msg.content}')
    
    elif msg.type == 'time':
        print(f'\n【时间消息】{msg.time}')

    elif msg.type == 'recall':
        print(f'【撤回消息】{msg.content}')
```

:::info 提示
有关消息对象的更多信息，请参阅[**消息对象**](/docs/documents/object/msg)页面文档
:::

### 1.2 获取文字信息以及保存图片、文件、语音转文字内容

可使用以下三个参数自定义指定是否保存图片、文件、语音转文字内容

- `savepic`：是否保存聊天图片，默认为`False`
- `savefile`：是否保存聊天文件，默认为`False`
- `savevoice`：是否保存聊天语音转文字内容，默认为`False`

```python title="Python"
from wxauto import WeChat

wx = WeChat()

# 获取当前聊天窗口消息
msgs = wx.GetAllMessage(
    savepic   = True,   # 保存图片
    savefile  = True,   # 保存文件
    savevoice = True    # 保存语音转文字内容
)

# 输出消息内容
for msg in msgs:
    if msg.type == 'sys':
        print(f'【系统消息】{msg.content}')
    
    elif msg.type == 'friend':
        sender = msg.sender # 这里可以将msg.sender改为msg.sender_remark，获取备注名
        print(f'{sender.rjust(20)}：{msg.content}')

    elif msg.type == 'self':
        print(f'{msg.sender.ljust(20)}：{msg.content}')
    
    elif msg.type == 'time':
        print(f'\n【时间消息】{msg.time}')

    elif msg.type == 'recall':
        print(f'【撤回消息】{msg.content}')
```

:::warning 注意
自动保存文件功能在遇到大文件时可能会有bug
:::

### 1.3 加载更多历史消息

`LoadMoreMessage`方法用于加载更多历史消息，配合`GetAllMessage`方法使用，实现获取更多历史消息

```python title="Python"
from wxauto import WeChat

wx = WeChat()

# 加载更多历史消息
wx.LoadMoreMessage()

# 获取当前聊天窗口消息
msgs = wx.GetAllMessage()
... # 自行构建消息处理逻辑
```

:::info 提示
`LoadMoreMessage`方法加载更多历史消息时，需要保证当前聊天窗口有历史消息，否则没有效果，即触发一次“查看更多消息”
:::

## 2. 获取新消息

### 2.1 获取主窗口新消息

`GetAllNewMessage`和`GetNextNewMessage`方法用于获取**微信主窗口**的新消息，返回消息对象列表

- `GetAllNewMessage`方法获取所有新消息

    ```python title="Python"
    from wxauto import WeChat

    wx = WeChat()

    # 获取所有新消息
    msgs = wx.GetAllNewMessage()
    ```

- `GetNextNewMessage`方法获取下一条新消息

    ```python title="Python"
    from wxauto import WeChat

    wx = WeChat()

    # 获取下一条新消息
    msgs = wx.GetNextNewMessage()
    ```
这两种方法获取到的msgs数据类型均为dict，结构如下：

```python title="消息格式"
{
    '张三': [msg1, msg2, ...],
    '李四': [msg1, msg2, ...],
    ...
}
```

### 2.2 监听消息

`GetListenMessage`方法用于获取监听消息，调用该方法之前，需要先调用`AddListenChat`方法添加监听对象，然后调用`GetListenMessage`方法实现消息监听

```python title="Python"
from wxauto import WeChat

wx = WeChat()

# 首先设置一个监听列表，列表元素为指定好友（或群聊）的昵称
listen_list = [
    '张三',
    '李四',
    '工作群A',
    '工作群B'
]

# 然后调用`AddListenChat`方法添加监听对象，其中可选参数`savepic`为是否保存新消息图片
for i in listen_list:
    wx.AddListenChat(who=i)

msgs = wx.GetListenMessage()
for chat in msgs:
    one_msgs = msgs.get(chat)   # 获取消息内容
    
    # 回复收到
    for msg in one_msgs:
        if msg.type == 'sys':
            print(f'【系统消息】{msg.content}')
        
        elif msg.type == 'friend':`
            sender = msg.sender # 这里可以将msg.sender改为msg.sender_remark，获取备注名
            print(f'{sender.rjust(20)}：{msg.content}')
            
            # ！！！ 回复收到，此处为`chat`而不是`wx` ！！！
            chat.SendMsg('收到')  
            # 此处将msg.content传递给大模型，再由大模型返回的消息回复即可实现ai聊天

        elif msg.type == 'self':
            print(f'{msg.sender.ljust(20)}：{msg.content}')
        
        elif msg.type == 'time':
            print(f'\n【时间消息】{msg.time}')

        elif msg.type == 'recall':
            print(f'【撤回消息】{msg.content}')
```
:::info 提示
1. `GetListenMessage`方法获取到的msgs是一个字典，键为监听对象，值为消息对象列表；值的列表与`GetAllMessage`方法获取到的消息对象列表一样
2. 该示例中的`chat`对象为聊天窗口对象，详情请参阅[**聊天窗口对象**](/docs/documents/object/chat)页面文档
:::