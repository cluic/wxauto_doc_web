---
sidebar_position: 3
title: 3. 添加好友
---

# 添加好友

## 1. 发起好友申请

`AddNewFriend`方法用于发起好友申请

参数说明：

| 参数 | 类型 | 默认值 | 说明 |
| :----: | :----: | :----: | :----: |
| keywords | str | / | 微信号、手机号、QQ号 |
| addmsg | str | '你好，我是xxxx' | 添加好友的消息 |
| remark | str | None | 备注名 |

:::warning 注意
注：微信有一定的限制，如果频繁添加好友，可能会被限制添加好友的权限，请谨慎使用，切勿滥用！！！
:::

```python title="Python -- 发起好友申请示例代码"
from wxauto import WeChat

wx = WeChat()

keywords = '13800000000'      # 微信号、手机号、QQ号
addmsg = '你好，我是xxxx'      # 添加好友的消息
remark = '备注名字'            # 备注名，没有则不用设置
tags = ['朋友', '同事']        # 标签列表

# 发起好友申请
wx.AddNewFriend(keywords, addmsg=addmsg, remark=remark, tags=tags)
```

## 2. 接受好友请求

### 2.1 获取新的好友申请对象列表

`GetNewFriends`方法用于获取新的好友申请对象列表

```python title="Python -- 获取新的好友申请对象列表示例代码"
from wxauto import WeChat

wx = WeChat()

new = wx.GetNewFriends()
# [<wxauto New Friends Element at 0x1e95fced080 (张三: 你好,我是xxx群的张三)>,
# <wxauto New Friends Element at 0x1e95fced081 (李四: 你好,我是xxx群的李四)>]
```

### 2.2 通过好友申请对象接受好友请求

```python title="Python -- 通过好友申请对象接受好友请求示例代码"
...  # 接2.1代码

# 获取第一个可接受的新好友对象
new_friend1 = new[0]

print(new_friend1.name)  # 获取好友申请昵称
# 张三

print(new_friend1.msg)  # 获取好友申请信息
# 你好,我是xxx群的张三

# 接受好友请求，并且添加备注“备注张三”、添加标签wxauto
new_friend1.Accept(remark='备注张三', tags=['wxauto'])

# 切换回聊天页面
wx.SwitchToChat()
```

:::info 提示
该方法接受好友请求后，并不会自动切换回聊天页面，需要配合调用`SwitchToChat`方法切换至聊天页面，否则其他有关聊天页面的方法不可使用
:::