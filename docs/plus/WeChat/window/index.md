---
sidebar_position: 1
title: 微信对象
---

# 1. 微信对象

**微信对象**指的是由以下代码获取到的对象，后续文档内不再重复定义

```python
from wxautox import WeChat

wx = WeChat()   # 获取微信对象
```

**微信对象**新增几个参数：

|    参数    | 类型 | 默认值 |                        说明                        |
| :--------: | :--: | :----: | :------------------------------------------------: |
|  nickname  | str  |  None  | 指定微信窗口，用于区分不同微信客户端，如张三、李四 |
| mouse_move | bool | False  |        是否移动鼠标来进行操作，默认为不移动        |
|  `myinfo`  | bool | False  |  是否在初始化时获取本人微信号等信息，默认为不获取  |

## 1.1 发送消息 - 打字机模式`SendTypingText`

该方法可模拟打字机模式逐字输入，行为更贴近人类。该方法还支持消息内@群好友，不必像原来一样@内容只能固定在文字内容前面，效果如下：

```python
text = '''你好：
hello{@张三}你好{@李四}下午好

通知：xxxxxxx

再见'''
wx.SendTypingText(text)
```

![img](./img_sendtypingtext.png)

## 1.2 获取群聊列表`GetAllRecentGroups`

该方法可以获取通讯录中最近的群聊名称，以方便对群的操作，返回值格式为list，列表元素为元组，格式为('群聊名', '人数') 

| 参数  | 类型  | 默认值 |                             说明                             |
| :---: | :---: | :----: | :----------------------------------------------------------: |
| speed |  int  |   1    | 动速度，数值越大滚动越快，但是太快可能导致遗漏，建议速度1-3之间 |
| wait  | float |  0.05  | 滚动等待时间，建议和speed一起调整，直至适合你电脑配置和微信群数量达到平衡，不遗漏数据 |

```python
groups = wx.GetAllRecentGroups()
# [
#     ('工作群', '500')
#     ('街坊群', '456')
#     ('八卦群', '123')
#     ...
# ]
```

## 1.3 发送自定义表情包`SendEmotion`

|     参数      | 类型 | 默认值 |          说明           |
| :-----------: | :--: | :----: | :---------------------: |
| emotion_index | int  |   /    | 要发送的索引值，从0开始 |

> 如果index大于等于账号内自定义表情数量，则会发送失败，返回False，成功返回True

```python
index = 0 
wx.SendEmotion(emotion_index=index) 
```

## 1.4 消息免打扰 `MuteNotifications`
| 参数 | 类型 | 默认值 |                             说明                             |
| :--: | :--: | :----: | :----------------------------------------------------------: |
| mute | bool |  True  | 对当前聊天对象开启或关闭消息免打扰，True开启免打扰，False关闭免打扰 |

```python
group = '工作群'
mute = True   # True为开启免打扰，False为关闭免打扰

# 先打开指定聊天窗口，再执行免打扰操作
wx.ChatWith(group)
wx.MuteNotifications(mute=mute) 
```

## 1.5 邀请入群`AddGroupMembers`

|  参数   | 类型 |                             说明                             |
| :-----: | :--: | :----------------------------------------------------------: |
|  group  | str  |                       群名或者群备注名                       |
| members | list | 成员列表，可以是昵称、备注名、微信号；最好是微信号或者唯一的备注名 |

```python
from wxautox import WeChat
import time

wx = WeChat()

targets = [
    '好友1',
    '好友2',
    '好友3'
]
group = 'wxauto交流群'
wx.AddGroupMembers(group, targets)
```

## 1.6 优化`ChatWith`方法

优化了`ChatWith`及各种发送消息的方法，增加exact参数，用于判断在搜索who的时候是否需要精准匹配，默认为False，改为True则需要一字不差才进行发送

|   参数   |   类型   |   默认值   |  说明    |
| :--: | :--: | :--: | :--: |
| who | str | / | 要打开的聊天框好友名;  * 最好完整匹配，不完全匹配只会选取搜索框第一个 |
| timeout | int | 2 | 超时时间，默认2秒 |
| exact | bool | False | 是否精确匹配，默认False |

## 1.7 修改群聊名、备注、群公告、我在本群的昵称`ManageGroup`（20241211新增）

|  参数  | 类型 | 默认值 |                     说明                     |
| :----: | :--: | :----: | :------------------------------------------: |
|  name  | str  |  None  |                  修改群名称                  |
| remark | str  |  None  |                  修改备注名                  |
| myname | str  |  None  |                修改我的群昵称                |
| notice | str  |  None  |                  修改群公告                  |
|  quit  | bool | False  | **是否退出群，当该项为True时，其他参数无效** |

```python
remark = '工作群（不要发错）'
wx.ManageGroup(remark=remark)
# 返回值：dict
# {
#     'remark': True   # 如果未成功则为False
# }
```

## 1.8 修改好友备注、增加标签`ManageFriend`（20241211新增）

|  参数  | 类型 | 默认值 |       说明       |
| :----: | :--: | :----: | :--------------: |
| remark | str  |  None  |    修改备注名    |
|  tags  | list |  None  | 要增加的标签列表 |

```python
remark = '张三'
tags = ['同事']
wx.ManageFriend(remark=remark, tags=tags)
# 返回值：bool，是否成功修改备注名或标签
```

## 1.9 自动保存消息内的卡片链接`parseurl`参数（20241211新增）

以下方法增加`parseurl`参数，用于自动解析消息内卡片消息的URL链接

- `GetAllMessage`
- `GetListenMessage`
- `GetAllNewMessage`
- `GetNextNewMessage`
- `AddListenChat`

```python
msgs = wx.GetAllMessage(parseurl=True)
msgs
# 卡片链接解析后的格式为："[wxauto卡片链接解析]https://xxxxxxx"
# [
#     ...
# 	['Time', '13:34'],
# 	['Self', '[wxauto卡片链接解析]https://mp.weixin.qq.com/s/x8ilebSF5_KYd0PloyZm-Q']
# ]
```

## 1.10 获取当前聊天窗口详情`CurrentChat`方法增加`details`参数（20241211新增）

```python
wx.CurrentChat(details=True)
# {
#     'chat_type': 'group', 
#     'chat_name': 'wxauto四群', 
#     'group_member_count': 490
# }
```

## 1.11 更新添加好友`AddNewFriend`方法返回内容（20241219新增）

```python
from wxautox import WeChat

wx = WeChat()

keywords = '13800000000'      # 微信号、手机号、QQ号
addmsg = '你好，我是xxxx'      # 添加好友的消息
remark = '备注名字'            # 备注名，没有则不用设置
tags = ['朋友', '同事']        # 标签列表

# 发起好友申请
wx.AddNewFriend(keywords, addmsg=addmsg, remark=remark, tags=tags)
# 返回值：tuple
# (状态码, 说明)
# (1, '发送请求成功')
```

返回值（tuple）：

|  状态码  |  说明  |
| :------: | :----: |
|    0     | 未知原因添加失败 |
|    1     | 发送请求成功 |
|    2     | 已经是好友 |
|    3     | 已被对方拉黑 |
|    4     | 找不到相关账号或内容 |

:::info
123
:::

