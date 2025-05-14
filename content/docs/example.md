---
weight: 5
bookFlatSection: true
title: "五、使用示例"
---

### 1. 基本使用

```python
from wxautox import WeChat

# 初始化微信实例
wx = WeChat()

# 发送消息
wx.SendMsg("你好", who="张三")

# 获取当前聊天窗口消息
msgs = wx.GetAllMessage()
for msg in msgs:
    print(f"消息内容: {msg.content}, 消息类型: {msg.type}")
```

### 2. 监听消息

```python
from wxautox import WeChat
from wxautox.msgs import FriendMessage
import time

wx = WeChat()

# 消息处理函数
def on_message(msg, chatname):
    text = f'[{msg.type} {msg.attr}]{chatname} - {msg.content}'
    print(text)
    with open('msgs.txt', 'a', encoding='utf-8') as f:
        f.write(text + '\n')

    if msg.type in ('image', 'video'):
        print(msg.download())

    if isinstance(msg, FriendMessage):
        time.sleep(len(msg.content))
        msg.quote('收到')

    ...# 其他处理逻辑，配合Message类的各种方法，可以实现各种功能

# 添加监听，监听到的消息用on_message函数进行处理
wx.AddListenChat(nickname="张三", callback=on_message)

# ... 程序运行一段时间后 ...

# 移除监听
wx.RemoveListenChat(nickname="张三")
```

### 3. 处理好友申请

```python
from wxautox import WeChat

wx = WeChat()

# 获取新的好友申请
newfriends = wx.GetNewFriends(acceptable=True)

# 处理好友申请
tags = ['同学', '技术群']
for friend in newfriends:
    remark = f'备注_{friend.name}'
    friend.Accept(remark=remark, tags=tags)  # 接受好友请求，并设置备注和标签
```

### 4. 使用打字机模式发送消息

```python
from wxautox import WeChat

wx = WeChat()

# 普通文本发送
wx.SendTypingText("你好，这是一条测试消息", who="张三")

# 使用@功能和换行
wx.SendTypingText("各位好：\n{@张三} 请负责前端部分\n{@李四} 请负责后端部分", who="项目群")
```

### 5. 获取多个微信客户端

```python
from wxautox import get_wx_clients

# 获取所有微信客户端
clients = get_wx_clients()
for client in clients:
    print(f"微信客户端: {client}")
```