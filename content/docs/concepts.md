---
weight: 3
bookFlatSection: true
title: "三、核心类概念"
---

## Chat

`Chat` 类代表一个微信聊天窗口实例，提供了与聊天相关的操作方法，用于对**微信聊天窗口**进行各种操作，后续文档以变量名`chat`作为该类对象。

<!-- <img src="/images/wechat_class.png" alt="image-20250513092533340" style="zoom: 67%;" /> -->

![/images/wechat_class.png](/images/chat_class.png)

## WeChat

`WeChat` 类是 `wxautox` 的主要入口点，它继承自 `Chat` 类和 `Listener` 类，代表微信主窗口实例，用于对**微信主窗口**进行各种操作，后续文档以变量名`wx`作为该类对象。

### 初始化参数

| 参数     | 类型 | 默认值 | 描述                             |
| -------- | ---- | ------ | -------------------------------- |
| nickname | str  | None   | 微信昵称，用于定位特定的微信窗口 |
| debug    | bool | False  | 是否开启调试模式                 |

```python
wx = WeChat(nickname="张三")
```

<!-- <img src="/images/chat_class.png" alt="image-20250513092208146" style="zoom:50%;" /> -->
![/images/wechat_class.png](/images/wechat_class.png)

## Message

`Message`类代表微信聊天中的消息，分为两个概念：

- 消息**内容**类型（`type`）：文本消息、图片消息、文件消息、语音消息、卡片消息等等
- 消息**来源**类型（`attr`）：系统消息、时间消息、自己发送的消息、对方发来的消息

```python
# 导入你想要的消息类型
from wxautox.msgs import (
    Message,
    TextMessage,
    FriendMessage,
    FriendTextMessage,
    ...
)

# 假设你获取到了一个消息对象
msg: Message = ...

# 如果是对方发来的消息，则回复收到
if isinstance(msg, FriendMessage):
    msg.reply("收到")
```


|           type↓ attr→          | 自己的消息`SelfMessage`       | 对方的消息`FriendMessage`   |
| :---------------------------: | :-------------------------------: | :-----------------------------: |
|     文本消息`TextMessage`     | `SelfTextMessage`                 | `FriendTextMessage`             |
|    引用消息`QuoteMessage`     | `SelfQuoteMessage`                | `FriendQuoteMessage`            |
|    语音消息`VoiceMessage`     | `SelfVoiceMessage`                | `FriendVoiceMessage`            |
|    图片消息`ImageMessage`     | `SelfImageMessage`                | `FriendImageMessage`            |
|    视频消息`VideoMessage`     | `SelfVideoMessage`                | `FriendVideoMessage`            |
|     文件消息`FileMessage`     | `SelfFileMessage`                 | `FriendFileMessage`             |
|   位置消息`LocationMessage`   | `SelfLocationMessage`             | `FriendLocationMessage`         |
|     链接消息`LinkMessage`     | `SelfLinkMessage`                 | `FriendLinkMessage`             |
|   表情消息`EmotionMessage`    | `SelfEmotionMessage`              | `FriendEmotionMessage`          |
|    合并消息`MergeMessage`     | `SelfMergeMessage`                | `FriendMergeMessage`            |
| 名片消息`PersonalCardMessage` | `SelfPersonalCardMessage`         | `FriendPersonalCardMessage`     |
|    其他消息`OtherMessage`     | `SelfOtherMessage`                | `FriendOtherMessage`            |

## WxResponse

该类用于该项目多个方法的返回值

```python
# 这里假设result为某个方法的WxResponse类型返回值
result: WxResponse = ...

# 判断是否成功
if result:
    data = result['data'] # 成功，获取返回数据，大多数情况下为None
else:
    print(result['message'])  # 该方法调用失败，打印错误信息
```

## WxParam

- **ENABLE_FILE_LOGGER** ( bool ) ：是否启用日志文件，默认True
- **DEFAULT_SAVE_PATH** ( str ) ：下载文件/图片默认保存路径，默认为当前工作目录下的`wxautox`文件下载文件夹
- **MESSAGE_HASH** ( bool ) ：是否启用消息哈希值用于辅助判断消息，开启后会稍微影响性能，默认False
- **DEFAULT_MESSAGE_XBIAS** ( int ) ：头像到消息X偏移量，用于消息定位，点击消息等操作，默认51
- **FORCE_MESSAGE_XBIAS** ( bool ) ：是否强制重新自动获取X偏移量，如果设置为True，则每次启动都会重新获取，默认False
- **LISTEN_INTERVAL** ( int ) ：监听消息时间间隔，单位秒，默认1
- **LISTENER_EXCUTOR_WORKERS** ( int ) ：监听执行器线程池大小，根据自身需求和设备性能设置，默认4
- **SEARCH_CHAT_TIMEOUT** ( int ) ：搜索聊天对象超时时间，单位秒，默认5

```python
from wxautox import WxParam

WxParam.LISTENER_EXCUTOR_WORKERS = 8
...
```