---
title: 更新日志
toc: false
weight: 4
---
## v39.1.33

- 修复[`SendFiles`](/docs/class/chat/#发送文件-sendfiles)方法发送文件/图片会多次执行的BUG

## v39.1.32

- 增加移除群置顶消息的方法[`GetTopMessage`](/docs/class/chat/#移除置顶消息-gettopmessage)
- 修复[`ChatInfo`](/docs/class/chat/#获取聊天窗口信息-chatinfo)的BUG
- 修复朋友圈下载图片偶尔为空的BUG
- 优化[`GetNextNewMessage`](/docs/class/wechat/#获取下一个新消息-getnextnewmessage)方法
- 优化[`SendFiles`](/docs/class/chat/#发送文件-sendfiles)方法
- 优化[`AddFriendFromGroup`](/docs/class/chat/#从群聊中添加好友-addfriendfromgroup)方法
- [`QuoteMessage`](/docs/class/message/#quotemessage)增加`click_quote`方法，用于点击被引用框体


## v39.1.31

- 增加[`GetContactGroups`](/docs/class/wechat/#获取通讯录群聊列表-getcontactgroups)方法，获取通讯录群聊列表
- 增加[`GetDialog`](/docs/class/chat/#获取对话框-getdialog)方法，获取对话框对象，用于某些自定义操作
- [WxParam](/docs/class/other/#wxparam)增加`NOTE_LOAD_TIMEOUT`属性，用于设置微信笔记加载超时时间
- 优化申请好友对话框判断
- 优化支持IDE方法参数提示和docstring的正确显示