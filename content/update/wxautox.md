---
title: Plus版✨
toc: false
weight: 4
---
# 更新日志

## v39.1.40

- 修复添加监听偶尔卡死的问题
- 优化GetNextNewMessage

## v39.1.39

- 修复获取通讯录群组有时失败的问题
- 修复合并消息有时无法下载图片的问题
- 修复朋友圈偶尔评论卡住的问题
- 修复msg对象download_head_image方法偶尔无法正常下载的问题
- 优化SendUrlCard方法
- 修复转发消息多目标报错问题、发送卡片附带none的问题

## v39.1.38

- [dialog对象](/docs/class/other/#wechatdialog)增加[get_all_text](/docs/class/other/#get_all_text)方法，以方便获取对话框内容
- 优化转发消息选择联系人优先精准匹配
- [转发消息](/docs/class/message/#forward)选择联系人时，可发送附加信息
- 增加[get_wx_logins](/docs/class/other/#get_wx_logins)方法，获取所有登录窗口对象
- 优化搜索切换联系人，增加[分步搜索](/docs/class/session/#search)
- GetSesion方法不再获取未显示的会话
- 修复当前页面没有任何聊天消息时，无法触发新消息判断的问题

## v39.1.37

- 修复session对象双击无效问题、选择菜单失败问题
- 修复特定情况下时间消息解析为other的问题

## v39.1.36

- 为确保兼容分辨率缩放，将FORCE_MESSAGE_XBIAS默认为True
- 优化GetNextNewMessage方法
- 优化GetMyInfo方法

## v39.1.35

- 修复初始化时当微信窗口没有聊天页面时，GetNextNewMessage方法报错问题

## v39.1.34

- 优化消息对象下载图片、视频
- 修复朋友圈下载图片报错问题
- 修复删除消息偶尔报错问题

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