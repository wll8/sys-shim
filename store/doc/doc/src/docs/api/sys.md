## sys.getComputerName()
 返回计算机名

## sys.getStartTime()
 返回系统启动时间  

``` js
await main.native.sys.getStartTime()

/**
 * 返回
[false, '2024-03-17T03:58:18Z']
 */
```

## sys.getUserName()
 返回当前登录用户名

## sys.hibernate()
 休眠

## sys.lock()
 锁定计算机

## sys.logoff()
 注销

## sys.restart()
 重启

## sys.setComputerName("计算机名")
 修改计算机名,重启后生效

## sys.shutdown()
 关机

## sys.sleep()
 睡眠,  
即硬盘休眠+内存待机
