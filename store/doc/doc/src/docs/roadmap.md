---
sidebar: false
---

## 2024-04 月

### 常用原生 api 文档

- 原则
  - 原生 js 能处理的不封装，例如：网址拆分
  - 顶级模块的实现优先的，例如 fsys.copy

- 优先级
  - 先实现已声明优先级的
  - 优先级1 -- 必须处理
  - 优先级2 -- 有空处理
  - 优先级3 -- 可不处理

- fsys 文件操作
  - dirWatcher 目录监视器 -- 优先级1
  - dlg 文件对话框  -- 优先级1
  - dlg.dir 目录对话框  -- 优先级1
  - drives 逻辑分区
  - file 文件读写 -- 优先级1
  - fileInfo 文件唯一ID
  - hardlink 硬链接 -- 优先级2
  - hosts 文件
  - info 文件信息
  - ini 配置文件
  - knownFolder 已知文件夹
  - lnk 快捷方式  -- 优先级1
  - media 媒体文件播放
  - mime 多用途扩展文件类型
  - path 路径函数
  - remove 移除操作 -- 优先级1
  - shortcut 快捷方式生成器 -- 优先级2
  - size 文件大小
  - url 快捷方式 -- 优先级2
  - version 版本信息
  - watch 监视文件 -- 优先级1

- inet 网络
  - adapter 适配器
  - adapterInfo 适配器配置
  - conn 连接设置
  - mac 地址
  - http 网络传输协议 -- 优先级1
  - httpFile 断点续传 -- 优先级1

- key 键盘模拟
  - hook 键盘钩子 -- 优先级1
  - hotkey 超级热键

- mouse 鼠标模拟
  - cursor 光标 -- 优先级1
  - hook 鼠标钩子 -- 优先级1

- process 进程操作
  - popen 进程管道 -- 优先级1
  - admin 管理权限
  - batch 批处理 -- 优先级2
  - cmdline 获取启动参数 -- 优先级1
  - command 进程命令
  - control 控制面板 -- 优先级2
  - file 文件操作
  - usage 内存CPU占用率 -- 优先级1


- service 服务程序 -- 优先级2
- sys 系统相关
  - baseBoard 主板信息 -- 优先级1
  - comPort 串口
  - cpu 处理器信息 -- 优先级1
  - device 硬件设备列表
  - display 显卡
  - displaySwitch 切换显示器
  - hd 硬盘序列号 -- 优先级1
  - info 系统信息 -- 优先级1
  - mem 内存信息 -- 优先级1
  - monitor 显示器
  - networkCards 网卡设备
  - printer 打印机
  - reg 注册表
  - run 启动项
  - runAsTask 启动任务
  - storage 存储设备 -- 优先级1


- win 窗口操作
  - cur 鼠标指针
  - image 图像
  - reg 注册表操作
  - taskScheduler 计划任务
  - version 版本信息 -- 优先级1
  - versionEx 扩展版本信息 -- 优先级1
  - clip 剪贴板 -- 优先级1
    - file 剪贴板文件 -- 优先级1
    - gif 动画 -- 优先级1
    - html 复制操作 -- 优先级1
    - png 图像 -- 优先级1
    - viewer 剪贴板监视 -- 优先级2

  - util 实用工具
    - tray 托盘图标 -- 优先级1
    - deviceNotification 设备监视

### 游乐场

- 在线游乐场 -- 可以在文档中编写、执行、分享代码
- 示例代码运行 -- 除了复制功能之外，还允许直接点击执行
- 运行日志 -- 可以在界面上看到运行日志，方便分析执行情况

## 2024-05 月

### 自动化测试

使用 nodejs 自动化测试 api 的可用性。

### 常用 neutralinojs api 封装及文档

- Neutralino.app
  - [x] app.exit -- 注：退出码暂未实现
  - [x] app.killProcess
  - [ ] app.restartProcess
  - [x] app.getConfig
  - [ ] app.broadcast
  - [ ] app.readProcessInput
  - [ ] app.writeProcessOutput
  - [ ] app.writeProcessError
- Neutralino.clipboard
  - [x] clipboard.writeText
  - [x] clipboard.readText
- Neutralino.computer

- Neutralino.debug

- Neutralino.events

- Neutralino.extensions

- Neutralino.filesystem

- Neutralino.init

- Neutralino.os
  - [x] os.execCommand
  - [x] os.spawnProcess
  - [ ] os.updateSpawnedProcess
  - [ ] os.getSpawnedProcesses
  - [x] os.getEnv
  - [x] os.getEnvs
  - [x] os.showOpenDialog
  - [x] os.showSaveDialog
  - [x] os.showFolderDialog
  - [ ] os.showNotification
  - [x] os.showMessageBox
  - [ ] os.setTray
  - [x] os.getPath
  - [x] os.open
- Neutralino.storage

- Neutralino.updater

- Neutralino.window


### 知识库制作

智能模型训练所用。

## 2024-06 月

### 常用工具实现

- 菜单栏
- 托盘
- http

### 相关工具

- 项目生成器
- 项目打包器

## 2024-07 月

### 案例

### 视频教程
