---
sidebar_position: 2
---

# 二、快速入门

3min快速实现微信自动化

## 1. 获取微信对象

```python title="Python"
# 导入
from wxauto import WeChat

# 获取微信窗口对象
wx = WeChat()
# 输出 > 初始化成功，获取到已登录窗口：xxxx
```

:::info 注意
请先登录PC微信客户端，再运行上述代码
:::
:::info 注意
上面定义了wx变量，后续文档不再重复定义和解释wx变量
:::


## 2. 一个简单的收到机器人

首先设置一个监听列表，列表元素为指定好友（或群聊）的昵称
```python title="Python"
listen_list = [
    '张三',
    '李四',
    '工作群A',
    '工作群B'
]
```

然后调用`AddListenChat`方法添加监听对象，其中可选参数`savepic`为是否保存新消息图片
```python title="Python"
for i in listen_list:
    wx.AddListenChat(who=i, savepic=True)
```

最后调用`GetListenMessage`方法，实现消息监听，收到消息类型为`friend`的消息之后，调用`SendMsg`方法回复消息
```python title="Python"
# 持续监听消息，并且收到消息后回复“收到”
wait = 1  # 设置1秒查看一次是否有新消息
while True:
    msgs = wx.GetListenMessage()
    for chat in msgs:
        who = chat.who              # 获取聊天窗口名（人或群名）
        one_msgs = msgs.get(chat)   # 获取消息内容
        # 回复收到
        for msg in one_msgs:
            msgtype = msg.type       # 获取消息类型
            content = msg.content    # 获取消息内容，字符串类型的消息内容
            print(f'【{who}】：{content}')
        # ===================================================
        # 处理消息逻辑（如果有）
        # 
        # 处理消息内容的逻辑每个人都不同，按自己想法写就好了，这里不写了
        # 
        # ===================================================
        
        
            if msgtype == 'friend':
                chat.SendMsg('收到')  # 回复收到
    time.sleep(wait)

```

:::success
恭喜你，你已经实现了一个简单的微信机器人，可以自动回复消息了！
:::

<details>
<summary>点击查看完整代码</summary>
```python title="Python \<demo.py\>"
# 导入
from wxauto import WeChat

# 获取微信窗口对象
wx = WeChat()
# 输出 > 初始化成功，获取到已登录窗口：xxxx

# 设置监听列表
listen_list = [
    '张三',
    '李四',
    '工作群A',
    '工作群B'
]
# 循环添加监听对象
for i in listen_list:
    wx.AddListenChat(who=i, savepic=True)

# 持续监听消息，并且收到消息后回复“收到”
wait = 1  # 设置1秒查看一次是否有新消息
while True:
    msgs = wx.GetListenMessage()
    for chat in msgs:
        who = chat.who              # 获取聊天窗口名（人或群名）
        one_msgs = msgs.get(chat)   # 获取消息内容
        # 回复收到
        for msg in one_msgs:
            msgtype = msg.type       # 获取消息类型
            content = msg.content    # 获取消息内容，字符串类型的消息内容
            print(f'【{who}】：{content}')
        # ===================================================
        # 处理消息逻辑（如果有）
        # 
        # 处理消息内容的逻辑每个人都不同，按自己想法写就好了，这里不写了
        # 
        # ===================================================
        
        
            if msgtype == 'friend':
                chat.SendMsg('收到')  # 回复收到
    time.sleep(wait)
```

</details>