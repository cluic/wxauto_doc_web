---
sidebar_position: 1
title: 消息对象
---

> 有关消息对象的更多内容，可点击查看【[消息对象](/docs/documents/object/msg/)】

**消息对象**指的是`GetAllMessage`、`GetListenMessage`等所有有关获取消息的方法返回的列表内的对象元素，后续文档内不再重复定义

```python
msgs = wx.GetAllMessage()
msg = msgs[-1]   # 以最后一条消息作为消息对象，命名为msg，后续文档内不再重复定义
```

## 2.1 `FriendMessage`新增`add_friend`方法

|   参数   |   类型   |   默认值   |  说明    |
| :--: | :--: | :--: | :--: |
| addmsg | str | None | 添加好友的消息，不填则微信默认 |
| remark | str | None | 备注名，不填则无 |
| tags | list | None | 标签列表，不填则无 |
| permission | str | '朋友圈' | 朋友圈权限, 可选值：'朋友圈', '仅聊天' |

用于支持通过群消息快捷申请好友，以下代码即可发起好友请求

```python
if msg.type == 'friend':     # 仅当消息类型为friend时可用该方法
	msg.add_friend()
```

## 2.2 `quote`方法添加`at`参数
|   参数   |   类型   |   默认值   |  说明    |
| :--: | :--: | :--: | :--: |
| msg | str | / | 要发送的消息内容 |
| at | str \| list | None | 要@的人的昵称或微信号，单人str多人list |

用于在引用消息的同时，@指定人员

```python
if msg.type in ['friend', 'self']:       # 仅当消息类型为friend或者self时可用该方法
    msg.quote('xxx', at=['张三', '李四'])
```

## 2.3  通过消息对象获取好友（群好友）信息`sender_info`方法

```python
from wxautox import WeChat

wx = WeChat()
msgs = wx.GetAllMessage()

# 获取最后一条消息，假设为好友发来的消息
msg = msgs[-1]

# 仅消息类型为`friend`的才有该方法
if msg.type == 'friend':
    sender_info = msg.sender_info()

# {
#     'nickname': '张三',
#     'id': '123456',
#     'remark': '同事张三',
#     'tags': '同事',
#     'source': '通过扫一扫添加',
#     'signature': '张三的个性签名'
# }
```

|  参数名   |                        说明                         |
| :-------: | :-------------------------------------------------: |
| nickname  |                        昵称                         |
|    id     | 消息的`ui`控件提取到的`runtimeid`，唯一，不用可忽略 |
|  remark   |                        备注                         |
|   tags    |                        标签                         |
|  source   |                        来源                         |
| signature |                      个性签名                       |



## 2.4 通过消息对象获取当前聊天页面详情`details`属性

```python
... # 省略msg对象的获取过程

print(msg.details)
# {
#     'id': '428532284143281',    
#     'type': 'friend',           
#     'sender': '张三',           
#     'content': '哈哈哈',        
#     'sender_remark': '同事张三',
#     'chat_type': 'group',       
#     'chat_name': '工作群',      
#     'group_member_count': 54    
# }
```

|       参数名       |                             说明                             |
| :----------------: | :----------------------------------------------------------: |
|         id         |     消息的`ui`控件提取到的`runtimeid`，唯一，不用可忽略      |
|        type        | 消息类型，friend其他人发的消息、time时间消息、sys系统消息、self自己发的消息 |
|       sender       |                       消息发送人的昵称                       |
|      content       |                           消息内容                           |
|   sender_remark    |                消息发送人的备注，没有则为None                |
|     chat_type      |  聊天类型，group为群聊、friend为好友聊天、official为公众号   |
|     chat_name      |               当天聊天对象名，群名或好友名...                |
| group_member_count |               群聊人数，如果是群消息则有该参数               |

## 2.5 解析卡片链接`parse_url`方法（20241211新增）