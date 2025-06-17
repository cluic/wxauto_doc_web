---
weight: 3
bookFlatSection: true
title: "Message类"
---

消息类中，有两个固定属性：

- **`attr`**：消息属性，即消息的来源属性
  - system：系统消息
  - time：时间消息
  - tickle：拍一拍消息
  - self：自己发送的消息
  - friend：好友消息
  - other：其他消息
- **`type`**：消息类型，即消息的内容属性
  - text：文本消息
  - quote：引用消息
  - voice：语音消息
  - image：图片消息
  - video：视频消息
  - file：文件消息
  - location：位置消息
  - link：链接消息
  - emotion：表情消息
  - merge：合并转发消息
  - personal_card：个人名片消息
  - note: 笔记消息
  - other：其他消息

而`self`和`friend`又可以跟消息类型所组合，所以所有消息类别如下：

<!-- ```
Message (基类)
├── SystemMessage (系统消息)
│   └── TickleMessage (拍一拍消息)
├── TimeMessage (时间消息)
└── HumanMessage (人发送的消息)
    ├── SelfMessage (自己发送的消息)
    │   ├── SelfTextMessage (文本消息)
    │   ├── SelfQuoteMessage (引用消息)
    │   ├── SelfVoiceMessage (语音消息)
    │   ├── SelfImageMessage (图片消息)
    │   ├── SelfVideoMessage (视频消息)
    │   ├── SelfFileMessage (文件消息)
    │   ├── SelfLocationMessage (位置消息)
    │   ├── SelfLinkMessage (链接消息)
    │   ├── SelfEmotionMessage (表情消息)
    │   ├── SelfMergeMessage (合并转发消息)
    │   ├── SelfPersonalCardMessage (个人名片消息)
    |   ├─── SelfNoteMessage (笔记消息)
    │   └── SelfOtherMessage (其他消息)
    └── FriendMessage (好友消息)
        ├── FriendTextMessage (文本消息)
        ├── FriendQuoteMessage (引用消息)
        ├── FriendVoiceMessage (语音消息)
        ├── FriendImageMessage (图片消息)
        ├── FriendVideoMessage (视频消息)
        ├── FriendFileMessage (文件消息)
        ├── FriendLocationMessage (位置消息)
        ├── FriendLinkMessage (链接消息)
        ├── FriendEmotionMessage (表情消息)
        ├── FriendMergeMessage (合并转发消息)
        ├── FriendPersonalCardMessage (个人名片消息)
        └── FriendOtherMessage (其他消息)
``` -->

|                                                      |   [自己发送的消息`SelfMessage`](#selfmessage)  |   [对方发来的消息`FriendMessage`](#friendmessage)  |
| :--------------------------------------------------: | :-----------------------------------------: | :---------------------------------------------: |
|         [文本消息`TextMessage`](#textmessage)         |                SelfTextMessage             |               FriendTextMessage                  |
|        [引用消息`QuoteMessage`](#quotemessage)        |                SelfQuoteMessage            |               FriendQuoteMessage                 |
|        [语音消息`VoiceMessage`](#voicemessage)        |                SelfVoiceMessage            |               FriendVoiceMessage                 |
|        [图片消息`ImageMessage`](#imagemessage)        |                SelfImageMessage            |               FriendImageMessage                 |
|        [视频消息`VideoMessage`](#videomessage)        |                SelfVideoMessage            |               FriendVideoMessage                 |
|         [文件消息`FileMessage`](#filemessage)         |                SelfFileMessage             |               FriendFileMessage                  |
|     [✨位置消息`LocationMessage`](#locationmessage)     |              SelfLocationMessage           |             FriendLocationMessage                |
|         [✨链接消息`LinkMessage`](#linkmessage)         |                SelfLinkMessage             |               FriendLinkMessage                  |
|      [✨表情消息`EmotionMessage`](#emotionmessage)      |               SelfEmotionMessage           |              FriendEmotionMessage                |
|        [✨合并消息`MergeMessage`](#mergemessage)        |                SelfMergeMessage            |               FriendMergeMessage                 |
| [✨名片消息`PersonalCardMessage`](#personalcardmessage) |            SelfPersonalCardMessage         |           FriendPersonalCardMessage              |
|      [✨笔记消息`NoteMessage`](#notemessage)            |                SelfNoteMessage             |               FriendNoteMessage                  |
|        [其他消息`OtherMessage`](#othermessage)        |                SelfOtherMessage            |               FriendOtherMessage                 |

简单的使用示例：

```python
from wxautox.msgs import *

... # 省略获取消息对象的过程

# 假设你获取到了一个消息对象
msg = ...

# 当消息为好友消息时，回复收到
# 方法一：
if msg.attr == 'friend':
    msg.reply('收到')

# 方法二：
if isinstance(msg, FriendMessage):
    msg.reply('收到')
```

## Message

消息基类，所有消息类型都继承自该类

**属性**（所有消息类型都包含以下属性）：

| 属性名 | 类型 | 描述  |
| :-----: | :---: | -------- |
| type  | str | 消息内容类型 |
| attr  | str | 消息来源类型 |
| info | Dict | 消息的详细信息 |
| id | str | 消息UI ID（不重复，切换UI后会变） |
| ✨hash | str | 消息hash值（可能重复，切换UI后不变） |
| sender | str | 消息发送者 |

### chat_info

获取该消息所属聊天窗口的信息

```python
chat_info = msg.chat_info()
```

**返回值**：

- 类型：`dict`
- 描述：聊天窗口信息
- 返回值示例：
```python
# 好友
{'chat_type': 'friend', 'chat_name': '张三'}  

# 群聊
{'group_member_count': 500, 'chat_type': 'group', 'chat_name': '工作群'}  

# 客服
{'company': '@肯德基', 'chat_type': 'service', 'chat_name': '店长xxx'} 

# 公众号
{'chat_type': 'official', 'chat_name': '肯德基'} 
```

### ✨ get_all_text

获取消息中所有文本内容

```python
text_list = msg.get_all_text()
```

**返回值**：

- 类型：List[str]

### roll_into_view

将消息滚动到视野内

```python
msg.roll_into_view()
```

## SystemMessage

系统消息，没有特殊用法

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| attr | str |  system | 消息属性 |

## TickleMessage

拍一拍消息，继承自[SystemMessage](#systemmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| attr | str |  tickle | 消息属性 |

特有属性：

| 属性     | 类型   | 描述             |
| -------- | ------ | ---------------- |
| tickle_list     | str    | 拍一拍消息列表  |

## TimeMessage

时间消息

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| attr | str |  time | 消息属性 |

特有属性：

| 属性     | 类型   | 描述             |
| -------- | ------ | ---------------- |
| time     | str    | 时间  YYYY-MM-DD HH:MM:SS  |

## HumanMessage

人发送的消息，即自己或好友、群友发送的消息

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| attr | str |  friend | 消息属性 |

### click

点击该消息，一般特殊消息才会有作用，比如图片消息、视频消息等

```python
msg.click()
```

### select_option

右键该消息，弹出右键菜单，并选择指定选项

```python
msg.select_option("复制")
```

**返回值**：

- 类型：[`WxResponse`](/docs/class/other/#wxresponse)
- 描述：操作结果

### quote

引用该消息，并回复

```python
msg.quote("回复内容")
```

**参数**：

| 参数名 | 类型   |  默认值  | 描述           |
| ------ | ------ | -------- | -------------- |
| text   | str    | 无       | 引用内容       |
| at     | Union[List[str], str] | 无       | @用户列表     |
| timeout | int    | 3        | 超时时间，单位为秒 |

**返回值**：

- 类型：[`WxResponse`](/docs/class/other/#wxresponse)
- 描述：操作结果

### forward

转发该消息

```python
msg.forward("转发对象名称")
```

**参数**：

| 参数名 | 类型   |  默认值  | 描述           |
| ------ | ------ | -------- | -------------- |
| targets    | Union[List[str], str]    | 无       | 转发对象名称   |
| timeout | int    | 3        | 超时时间，单位为秒 |

**返回值**：

- 类型：[`WxResponse`](/docs/class/other/#wxresponse)
- 描述：操作结果


### ✨tickle

拍一拍该消息发送人

```python
msg.tickle()
```

**返回值**：

- 类型：[`WxResponse`](/docs/class/other/#wxresponse)
- 描述：操作结果

### ✨delete

删除该消息

```python
msg.delete()
```

**返回值**：

- 类型：[`WxResponse`](/docs/class/other/#wxresponse)
- 描述：操作结果

### ✨download_head_image

下载该消息发送人的头像

```python
msg.download_head_image()
```

**返回值**：

- 类型：Path
- 描述：下载路径Path对象

## FriendMessage

好友、群友发送的消息，即聊天页面中，左侧人员发送的消息。继承自[HumanMessage](#humanmessage)



### ✨sender_info

获取发送人信息

```python
msg.sender_info()
```

**返回值**：

- 类型：Dict[str, str]



### ✨at

@该消息发送人

```python
msg.at('xxxxxx')
```

**参数**：

| 参数名 | 类型   |  默认值  | 描述           |
| ------ | ------ | -------- | -------------- |
| content   | str  | 必填       | 要发送的内容    |
| quote     | bool | False     | 是否引用该消息    |


**返回值**：

- 类型：[`WxResponse`](/docs/class/other/#wxresponse)
- 描述：操作结果



### ✨add_friend

添加该消息的发送人为好友

```python
msg.add_friend()
```

**参数**：

| 参数名 | 类型   |  默认值  | 描述           |
| ------ | ------ | -------- | -------------- |
| addmsg   | str  | None      | 添加好友时的附加消息，默认为None    |
| remark     | str | None     | 添加好友后的备注，默认为None    |
| tags     | list | None     | 添加好友后的标签，默认为None    |
| permission     | Literal['朋友圈', '仅聊天'] | '朋友圈'     | 添加好友后的权限，默认为'朋友圈'    |
| timeout     | int | 3     | 搜索好友的超时时间，默认为3秒    |

**返回值**：

- 类型：[`WxResponse`](/docs/class/other/#wxresponse)
- 描述：操作结果


### ✨multi_select

{{< cards >}}
  {{< card link="/docs/example/#8-合并转发消息" title="👉查看合并转发消息示例" tag="点击跳转" tagType="info" >}}
{{< /cards >}}

多选该消息，仅作合并转发使用，如果不进行合并转发，请勿调用该方法

```python
msg.multi_select()
```

**参数**：无

**返回值**：无


## SelfMessage

自己发送的消息，即聊天页面中，右侧自己发送的消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| attr | str |  self | 消息属性 |

## TextMessage

文本消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  text | 消息属性 |

## QuoteMessage

引用消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  quote | 消息属性 |

特有属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| quote_content | str |  引用消息内容 | 引用消息内容 |

### ✨download_quote_image

下载引用消息中的图片，返回图片路径

```python
msg.download_quote_image()
```

**参数**：

| 参数名 | 类型   |  默认值  | 描述         |
| ----- | --- |----- | -------- |
| dir_path     | str | None     | 下载路径，默认为None |
| timeout     | int | 10     | 超时时间，默认为10秒    |

**返回值**：
Path: 视频路径，成功时返回该类型

### ✨click_quote

点击引用框体

```python
msg.click_quote()
```

**参数**：无

**返回值**：无

## ImageMessage

图片消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  image | 消息属性 |

### download

下载图片，返回图片路径

```python
msg.download()
```

**参数**：

| 参数名 | 类型   |  默认值  | 描述           |
| ------ | ------ | -------- | -------------- |
| dir_path | Union[str, Path]  | None | 下载图片的目录，不填则默认[WxParam.DEFAULT_SAVE_PATH](#wxparam-类) |
| timeout | int  |  10 | 下载超时时间 |

**返回值**：

- Path: 图片路径，成功时返回该类型
- [`WxResponse`](/docs/class/other/#wxresponse): 下载结果，失败时返回该类型

## VideoMessage

视频消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  video | 消息属性 |

### download

下载视频，返回视频路径

```python
msg.download()
```

**参数**：

| 参数名 | 类型   |  默认值  | 描述           |
| ------ | ------ | -------- | -------------- |
| dir_path | Union[str, Path]  | None | 下载视频的目录，不填则默认[WxParam.DEFAULT_SAVE_PATH](#wxparam-类) |
| timeout | int  |  10 | 下载超时时间 |

**返回值**：

- Path: 视频路径，成功时返回该类型
- [`WxResponse`](/docs/class/other/#wxresponse): 下载结果，失败时返回该类型

## VoiceMessage

视频消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  video | 消息属性 |

### to_text

将语音消息转换为文本，返回文本内容

```python
msg.to_text()
```

## FileMessage

文件消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  file | 消息属性 |

### download

下载文件，返回文件路径

```python
msg.download()
```

**参数**：

| 参数名 | 类型   |  默认值  | 描述           |
| ------ | ------ | -------- | -------------- |
| dir_path | Union[str, Path]  | None | 下载文件的目录，不填则默认[WxParam.DEFAULT_SAVE_PATH](#wxparam-类) |
| timeout | int  |  10 | 下载超时时间 |

**返回值**：

- Path: 文件路径，成功时返回该类型
- [`WxResponse`](/docs/class/other/#wxresponse): 下载结果，失败时返回该类型

## ✨LocationMessage

位置消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  location | 消息属性 |

特有属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| ✨address | str |  地址信息 | 该消息卡片的地址信息 |

## ✨LinkMessage

链接消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  link | 消息属性 |

### ✨get_url

获取链接地址

```python
msg.get_url()
```

| 参数名 | 类型   |  默认值  | 描述    |
| ------ | ------ | -------- | ------ |
| timeout | int  |  10 | 下载超时时间 |

**返回值**：

- str: 链接地址

## ✨EmotionMessage

表情消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  emotion | 消息属性 |

## ✨MergeMessage

合并消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  merge | 消息属性 |

### ✨get_messages

获取合并消息中的所有消息

```python
msg.get_messages()
```

**返回值**：

- List[str]: 合并消息中的所有消息

## ✨PersonalCardMessage

名片消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  personal_card | 消息属性 |

### ✨add_friend

添加好友

```python
msg.add_friend()
```

| 参数名 | 类型   |  默认值  | 描述    |
| ------ | ------ | -------- | ------ |
| addmsg | str    | None     | 添加好友时的附加消息 |
| remark | str    | None     | 添加好友后的备注 |
| tags   | List[str]   | None     | 添加好友后的标签 |
| permission | Literal['朋友圈', '仅聊天'] | '朋友圈' | 添加好友后的权限 |
| timeout | int    | 3        | 搜索好友的超时时间 |

**返回值**：

- [`WxResponse`](/docs/class/other/#wxresponse): 是否添加成功

## ✨NoteMessage

笔记消息。继承自[HumanMessage](#humanmessage)

固定属性：

| 属性名 | 类型 | 属性值  | 描述  |
| ----- | --- |----- | -------- |
| type | str |  note | 消息属性 |

### ✨get_content

获取笔记内容

```python
from pathlib import Path

note_content_list = msg.get_content()
for content in note_content_list:
    if isintance(content, str):
        # 文本内容
        print(content)
    elif isintance(content, Path):
        # 文件路径，文件、视频、图片等
        print('文件路径：', content)
```


### ✨save_files

保存笔记中的文件

```python
msg.save_files()
```

| 参数名 | 类型   |  默认值  | 描述    |
| ------ | ------ | -------- | ------ |
| dir_path | Union[str, Path]    | None     | 保存路径 |

**返回值**：

- [`WxResponse`](/docs/class/other/#wxresponse): 是否保存成功，若成功则data为保存的文件路径列表

### ✨to_markdown

将笔记转换为Markdown格式

```python
msg.to_markdown()
```

| 参数名 | 类型   |  默认值  | 描述    |
| ------ | ------ | -------- | ------ |
| dir_path | Union[str, Path]    | None     | 保存路径 |

**返回值**：

- Path: markdown文件路径

## OtherMessage

其他暂未支持解析的消息类型