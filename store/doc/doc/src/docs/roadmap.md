---
sidebar: false
---

## 2024-04 月

### 常用原生 api 文档


`原生 API` 是指通过 js 可调用的原生方法。为了让开发者不用再花精力去关注原生 api 的使用。所以这里对大部分原生 api 进行 js 调用验证后，统一在此进行对每个 api 进行文档化描述。


为了让描述更容易理解，需要对原始文档进行变更，包括但不限于：

- 错别字修正。
- 格式修正：例如参数逗号后空格、参数语义化等。
- 对于难理解的概念进行适当批注。

此 todo 用于标记工作进度和需求，为了避免工作冲突，建议`分模块进行工作`，例如 fsys 由 A 完成，fsys.path 由 B 完成。

-  `// 跳过` 表示暂无需关注，不予理睬。
- 已完成文档和验证的，使用 `- [x]` 标记。


- 原则
  - 原生 js 能处理的不封装，例如：网址拆分
  - 顶级模块的实现优先的，例如 fsys.copy

- 优先级
  - 先实现已声明优先级的
  - 优先级1 -- 必须处理
  - 优先级2 -- 有空处理
  - 优先级3 -- 可不处理

#### fsys 文件操作
  - fsys
    - [ ] fsys.WIN32_FIND_DATA -- // 跳过
    - [x] fsys.attrib(文件路径, , 文件属性) 
    - [x] fsys.attrib(文件路径, 文件属性) 
    - [x] fsys.attrib(文件路径) 
    - [x] fsys.copy 
    - [ ] fsys.copy(源路径, 目标路径, FOF选项, 进度标题, 父窗口句柄) 
    - [x] fsys.createDir(目录路径, 是否清空重建) 
    - [x] fsys.createParentDir(路径) 
    - [x] fsys.delete 
    - [ ] fsys.delete(路径, FOF选项, 进度标题, 父窗口句柄) 
    - [x] fsys.deleteEx 
    - [ ] fsys.deleteEx(路径, FOF选项, 进度标题, 父窗口句柄) 
    - [ ] fsys.enum(目录路径, 通配符, , 目录回调函数) 
    - [ ] fsys.enum(目录路径, 通配符, 回调函数, 是否处理子目录) 
    - [ ] fsys.enum(目录路径, 通配符, 回调函数, 目录筛选函数) 
    - [x] fsys.formatSize 
    - [x] fsys.formatSize(字节长度) 
    - [x] fsys.formatSize(字节长度低位, 字节长度高位) 
    - [ ] fsys.fromFileTime 
    - [ ] fsys.fromFileTime(FILETIME结构体) 
    - [x] fsys.getCurDir() 
    - [x] fsys.getDrive() 
    - [x] fsys.getExtensionName(路径) 
    - [x] fsys.getFileName(文件路径) 
    - [x] fsys.getParentDir(路径) 
    - [ ] fsys.getSpecial(_CSIDL__) 
    - [ ] fsys.getSpecialDefault(_CSIDL__) 
    - [x] fsys.getSysDir() 
    - [x] fsys.getTempDir() 
    - [x] fsys.getWinDir() 
    - [ ] fsys.gmatch(文件路径, 查找串) 
    - [ ] fsys.idListFromPath(路径) // 跳过
    - [x] fsys.isDir(路径) 
    - [x] fsys.isHidden(文件路径) 
    - [x] fsys.isReadonly(文件路径) 
    - [x] fsys.isSystem(文件路径) 
    - [x] fsys.joinpath(根目录, 不定个数子路径) 
    - [x] fsys.list(目录路径, 模式匹配, 通配符) 
    - [x] fsys.longpath(路径) 
    - [x] fsys.move 
    - [ ] fsys.move(源路径, 目标路径, FOF选项, 进度标题, 父窗口句柄) 
    - [ ] fsys.opError -- // 跳过
    - [ ] fsys.opFlags -- // 跳过
    - [ ] fsys.pathFromIdList(PIDL名称ID, 是否释放PIDL) 
    - [x] fsys.rename 
    - [ ] fsys.rename(源路径, 目标路径, FOF选项) 
    - [x] fsys.replace(文件路径, 查找串, 替换串, 替换次数) 
    - [x] fsys.searchFile 
    - [x] fsys.searchFile(文件名) 
    - [x] fsys.searchFile(文件名, 目录, ...) 
    - [x] fsys.searchFile(文件名, 目录, true) 
    - [x] fsys.setAttributes(文件路径, 文件属性) 
    - [x] fsys.setCurDir(目录) 
    - [x] fsys.shortpath(路径) 
    - [ ] _CSIDL_COMMON_FAVORITES -- // 跳过
    - [ ] _CSIDL_COOKIES -- // 跳过
    - [ ] _CSIDL_HISTORY -- // 跳过
    - [ ] _CSIDL_INTERNET_CACHE -- // 跳过
    - [ ] _CSIDL_TEMPLATES -- // 跳过
    - [ ] findDataObject.cAlternateFileName 
    - [ ] findDataObject.cFileName 
    - [ ] findDataObject.dwFileAttributes 
    - [ ] findDataObject.ftCreationTime 
    - [ ] findDataObject.ftLastAccessTime 
    - [ ] findDataObject.ftLastWriteTime 
    - [ ] findDataObject.nFileSizeHigh 
    - [ ] findDataObject.nFileSizeLow 
  - dirWatcher 目录监视器 -- 优先级1
  - dlg 文件对话框  -- 优先级1
    - [ ] fsys.dlg.OPENFILENAME() // 跳过
    - [ ] fsys.dlg.OPENFILENAME(缓冲区大小, 默认文件名) // 跳过
    - [x] fsys.dlg.open 
    - [x] fsys.dlg.open(指定文件类型, 对话框标题, 默认目录, 父窗口, 选项参数, 默认文件名) 
    - [x] fsys.dlg.openDir 
    - [x] fsys.dlg.openDir() 
    - [x] fsys.dlg.openDir(目录, 父窗口, 标题, 窗口标题) 
    - [x] fsys.dlg.openEx 
    - [x] fsys.dlg.openEx(指定文件类型, 对话框标题, 默认目录, 父窗口, 选项参数, 缓冲区大小) 
    - [x] fsys.dlg.save 
    - [x] fsys.dlg.save(指定文件类型, 对话框标题, 默认目录, 父窗口, 选项参数, 默认文件名) 
    - [x] fsys.dlg.saveOp 
    - [x] fsys.dlg.saveOp(指定文件类型, 对话框标题, 默认目录, 父窗口, 默认文件名) 
    - [ ] OPENFILENAMEObject.defExt
    - [ ] OPENFILENAMEObject.defaultFileName
    - [ ] OPENFILENAMEObject.filter
    - [ ] OPENFILENAMEObject.flags
    - [ ] OPENFILENAMEObject.hwndOwner
    - [ ] OPENFILENAMEObject.initialDir
    - [ ] OPENFILENAMEObject.open()
    - [ ] OPENFILENAMEObject.save()
    - [ ] OPENFILENAMEObject.title
  - dlg.dir 目录对话框  -- 优先级1
    - [x] fsys.dlg.dir 
    - [x] fsys.dlg.dir(path,hwndOwner,title,okLabel,clientGuid,multiSel) 
  - drives 逻辑分区
  - file 文件读写 -- 优先级1
  - fileInfo 文件唯一ID
  - hardlink 硬链接 -- 优先级2
  - hosts 文件
  - info 文件信息
  - ini 配置文件
  - knownFolder 已知文件夹
  - lnk 快捷方式  -- 优先级1
    - [ ] fsys.lnk() 
    - [ ] fsys.lnk.enum 
    - [ ] fsys.lnk.getMsiTarget(lnk文件路径) 
    - [x] fsys.lnk.getTarget(lnk文件路径) 
    - [x] fsys.lnk.search 
    - [x] fsys.lnk.search(目标文件名或参数, 快捷方式标题) 
    - [x] fsys.lnk.searchInDesktop 
    - [x] fsys.lnk.searchInDesktop(目标文件名或参数, 快捷方式标题) 
    - [x] fsys.lnk.searchLnk(文件名或参数, 快捷方式标题, 0) 
    - [x] fsys.lnk.searchLnk(文件名或参数, 快捷方式标题, 2) 
    - [ ] lnkfileObject.arguments 
    - [ ] lnkfileObject.description 
    - [ ] lnkfileObject.filename 
    - [ ] lnkfileObject.filepath 
    - [ ] lnkfileObject.free() // 跳过
    - [ ] lnkfileObject.getIcon() // 跳过
    - [ ] lnkfileObject.hotkey 
    - [ ] lnkfileObject.load() // 跳过
    - [ ] lnkfileObject.load(lnk文件路径) // 跳过
    - [ ] lnkfileObject.path 
    - [ ] lnkfileObject.pinToDesktop(false) // 跳过
    - [ ] lnkfileObject.pinToDesktop(true) // 跳过
    - [ ] lnkfileObject.pinToPrograms(false, 子目录路径) // 跳过
    - [ ] lnkfileObject.pinToPrograms(true, 子目录路径) // 跳过
    - [ ] lnkfileObject.resolve(hwndParent, flags) // 跳过
    - [ ] lnkfileObject.save(lnk文件存储路径) // 跳过
    - [ ] lnkfileObject.setIcon(文件路径, 图标索引) // 跳过
    - [ ] lnkfileObject.showCmd 
    - [ ] lnkfileObject.workDir 
  - media 媒体文件播放
  - mime 多用途扩展文件类型
  - path 路径函数
    - [x] fsys.path.addBackslash(路径) 
    - [x] fsys.path.canonicalize(路径, 是否处理短路径) 
    - [x] fsys.path.cmp(路径, 比较路径) 
    - [x] fsys.path.commonPrefix(路径, 路径2) 
    - [ ] fsys.path.compact(文件路径, 显示像素宽度) // 跳过
    - [x] fsys.path.eofBackslash(文件路径) 
    - [x] fsys.path.full(path) 
    - [x] fsys.path.full(path, root) 
    - [x] fsys.path.isDir(路径) 
    - [x] fsys.path.ischild(目录, 路径) 
    - [x] fsys.path.long(路径) 
    - [x] fsys.path.relative(路径, 目录, 返回路径是否以斜杠开始) 
    - [x] fsys.path.relativeTo(参考路径, 目标路径, 参考路径属性, 目标路径属性) 
    - [x] fsys.path.removeBackslash(路径) 
    - [x] fsys.path.replaceDir(路径, 根目录, 新的根目录) 
    - [x] fsys.path.replaceFile(路径, 新文件名) 
    - [x] fsys.path.short(路径) 
    - [x] fsys.path.validName(路径) 
  - remove 移除操作 -- 优先级1
    - [x] fsys.remove() 
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
    - [ ] inet.httpFile 
    - [ ] inet.httpFile() 
    - [ ] inet.httpFile(URL, 存储路径, 配置文件路径, userAgent, proxy, ...) 

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
  - sys
    - [x] sys.getComputerName()
    - [x] sys.getStartTime()
    - [x] sys.getUserName()
    - [x] sys.hibernate()
    - [x] sys.lock()
    - [x] sys.logoff()
    - [x] sys.restart()
    - [x] sys.setComputerName(计算机名)
    - [x] sys.shutdown()
    - [x] sys.sleep()
  - baseBoard 主板信息 -- 优先级1
    - [ ] sys.baseBoard.caption 
    - [ ] sys.baseBoard.configOption 
    - [ ] sys.baseBoard.creationClassName 
    - [ ] sys.baseBoard.description 
    - [ ] sys.baseBoard.getFullName() 
    - [ ] sys.baseBoard.manufacturer 
    - [ ] sys.baseBoard.name 
    - [ ] sys.baseBoard.otherIdentifyingInfo 
    - [ ] sys.baseBoard.partNumber 
    - [ ] sys.baseBoard.product 
    - [ ] sys.baseBoard.serialNumber 
    - [ ] sys.baseBoard.status 
    - [ ] sys.baseBoard.tag 
    - [ ] sys.baseBoard.version 
    - [ ] sys.baseBoard.bios.BIOSReleaseDate 
    - [ ] sys.baseBoard.bios.BIOSVendor 
    - [ ] sys.baseBoard.bios.BIOSVersion 
    - [ ] sys.baseBoard.bios.BaseBoardManufacturer 
    - [ ] sys.baseBoard.bios.BaseBoardProduct 
    - [ ] sys.baseBoard.bios.BaseBoardVersion 
    - [ ] sys.baseBoard.bios.BiosMajorRelease 
    - [ ] sys.baseBoard.bios.BiosMinorRelease 
    - [ ] sys.baseBoard.bios.SystemFamily 
    - [ ] sys.baseBoard.bios.SystemManufacturer 
    - [ ] sys.baseBoard.bios.SystemProductName 
    - [ ] sys.baseBoard.bios.SystemSKU 
    - [ ] sys.baseBoard.bios.SystemVersion 
  - comPort 串口
  - cpu 处理器信息 -- 优先级1
    - [x] sys.cpu.getBrand() 
    - [x] sys.cpu.getFrequence() 
    - [x] sys.cpu.getFrequence(true) 
    - [ ] sys.cpu.getInfo // 跳过
    - [ ] sys.cpu.getInfo() // 跳过
    - [x] sys.cpu.getInfoByWmi() 
    - [x] sys.cpu.getMaxExtFunction() 
    - [x] sys.cpu.getVender() 
  - device 硬件设备列表
  - display 显卡
  - displaySwitch 切换显示器
  - hd 硬盘序列号 -- 优先级1
    - [ ] sys.hd.getInfo() 
    - [ ] syshdinfObject.sFirmwareRev 
    - [ ] syshdinfObject.sModelNumber 
    - [ ] syshdinfObject.sSerialNumber 
    - [ ] syshdinfObject.ulTotalAddressableSectors 
    - [ ] syshdinfObject.wBufferSize 
    - [ ] syshdinfObject.wBufferType 
    - [ ] syshdinfObject.wCapabilities 
    - [ ] syshdinfObject.wGenConfig 
    - [ ] syshdinfObject.wNumCyls 
    - [ ] syshdinfObject.wNumHeads 
    - [ ] syshdinfObject.wNumSectorsPerTrack 
    - [ ] syshdinfObject.wReserved2 
    - [ ] syshdinfObject.wUltraDMA 
  - info 系统信息 -- 优先级1
    - [ ] sys.info 
    - [ ] sys.info() 
    - [ ] sysInfoObject.dwActiveProcessorMask 
    - [ ] sysInfoObject.dwAllocationGranularity 
    - [ ] sysInfoObject.dwNumberOfProcessors 
    - [ ] sysInfoObject.dwPageSize 
    - [ ] sysInfoObject.dwProcessorType 
    - [ ] sysInfoObject.isX64() 
    - [ ] sysInfoObject.lpMaximumApplicationAddress 
    - [ ] sysInfoObject.lpMinimumApplicationAddress 
    - [ ] sysInfoObject.wProcessorArchitecture 
    - [ ] sysInfoObject.wProcessorLevel 
    - [ ] sysInfoObject.wProcessorRevision 
  - mem 内存信息 -- 优先级1
    - [ ] sys.mem.getInfo() 
    - [ ] MEMORYSTATUSEX2Object.availPageFile 
    - [ ] MEMORYSTATUSEX2Object.availPhys 
    - [ ] MEMORYSTATUSEX2Object.availVirtual 
    - [ ] MEMORYSTATUSEX2Object.memoryLoad 
    - [ ] MEMORYSTATUSEX2Object.totalPageFile 
    - [ ] MEMORYSTATUSEX2Object.totalPhys 
    - [ ] MEMORYSTATUSEX2Object.totalVirtual 
    - [ ] memorystatusFieldObject.formatSize 
    - [ ] memorystatusFieldObject.size 
    - [ ] memorystatusFieldObject.sizeHighPart 
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
    - clip
      - [ ] win.clip.formats() 
      - [ ] win.clip.read() 
      - [ ] win.clip.readBitmap() 
      - [ ] win.clip.readUnicode() 
      - [ ] win.clip.write() 
      - [ ] win.clip.writeBitmap 
      - [ ] win.clip.writeBitmap(位图句柄, 接管位图, 清空剪贴板) 
    - file 剪贴板文件 -- 优先级1
      - [ ] win.clip.file.oleCopy() 
      - [ ] win.clip.file.read() 
      - [ ] win.clip.file.write(文件路径) 
      - [ ] win.clip.file.write(文件路径, "copy") 
      - [ ] win.clip.file.write(文件路径, "move") 
    - gif 动画 -- 优先级1
      - [ ] win.clip.gif.write() 
    - html 复制操作 -- 优先级1
      - [ ] win.clip.html() 
    - png 图像 -- 优先级1
      - [ ] win.clip.png.read() 
      - [ ] win.clip.png.write(剪贴板数据, 是否清空剪贴板) 
    - viewer 剪贴板监视 -- 优先级2

  - util 实用工具
    - tray 托盘图标 -- 优先级1
    - deviceNotification 设备监视

### 游乐场

- 在线游乐场 -- 可以在文档中编写、执行、分享代码
  - [点击查看原型](https://hongqiye.com/rp/play-sys-shim/#id=owjkbb&p=%E6%B8%B8%E4%B9%90%E5%9C%BA&hi=1)

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
