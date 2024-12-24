---
sidebar_position: 1
title: 1. 发送消息
---

# 发送消息

## 1. 发送文字消息SendMsg

参数说明：
| 参数 | 类型 | 默认值 | 说明 |
| :----: | :----: | :----: | :----: |
|  msg   | str  |   /    |            要发送的文字内容            |
|  who   | str  |  None  | 要发送给谁，默认则发送给当前打开的页面 |
| clear  | bool |  True  |      是否清除原本聊天编辑框的内容      |
| at  | list,str |  None  | 要@的人，可以是一个人或多个人，格式为str或list，例如："张三"或["张三", "李四"] |


### 1.1 简单发送文字消息
```python title="Python"
from wxauto import WeChat

wx = WeChat()

# 发送消息给文件传输助手
msg = 'hello, wxauto!'
who = '文件传输助手'
wx.SendMsg(msg=msg, who=who)
```

### 1.2 附带@群好友的消息
```python title="Python"
from wxauto import WeChat

wx = WeChat()

msg = 'xxxxxxx，收到请回复！'
who = '工作群A'
at = ['张三', '李四']   # 要@的人
wx.SendMsg(msg=msg, who=who, at=at)
```

## 2. 发送图片/视频/文件消息 SendFiles

参数说明：
|  参数名  |    类型     | 默认值 |                  说明                   |
| :------: | :---------: | :----: | :-------------------------------------: |
| filepath | str \| list |   /    | 指定文件路径，单个文件str，多个文件list |
|   who    |     str     |  None  | 要发送给谁，默认则发送给当前打开的页面  |

### 2.1 发送图片/视频/文件消息
```python title="Python"
from wxauto import WeChat

wx = WeChat()

# 发送图片
files = [
    r'C:\Users\user\Desktop\1.jpg',   # 图片
    r'C:\Users\user\Desktop\2.txt',   # 文件
    r'C:\Users\user\Desktop\3.mp4'    # 视频
]

who = '文件传输助手'
wx.SendFiles(filepath=files, who=who)
```