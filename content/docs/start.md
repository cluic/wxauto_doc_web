---
weight: 2
bookFlatSection: true
title: "二、快速开始"
---

## 快速开始

### 

```python
from wxautox import WeChat

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

