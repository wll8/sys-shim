## sys.cpu.getBrand()
返回CPU商标信息

``` js
await native.sys.cpu.getBrand()

/**
 * 返回
[false, '12th Gen Intel(R) Core(TM) i7-12700K']
 */
```

## sys.cpu.getFrequence()
返回表示 CPU 频率的数值,以 MHz 为单位

``` js
await native.sys.cpu.getFrequence()

/**
 * 返回
[false, 3629.869264]
 */
```

## sys.cpu.getFrequence(true) 
返回表示 CPU 频率的友好格式的字符串,单位: GHz 小数位数：1

``` js
await native.sys.cpu.getFrequence(true)

/**
 * 返回
[false, '3.7 GHz']
 */
```

## sys.cpu.getInfo
按原始文档，不传参数会报错，故不予实现

## sys.cpu.getInfo() 
[参考](https://bbs.aardio.com/doc/reference/libraries/kernel/raw/datatype.html)

``` js
await native.sys.cpu.getInfo(1,{_struct: `INT eax;INT ebx;INT eCx;INT edx`})

/**
 * 返回
[false, {
    "eCx": 4277859203,
    "eax": 591474,
    "ebx": 1283459072,
    "edx": 3217816575,
    "_struct": "INT eax;INT ebx;INT eCx;INT edx"
}]
 */
```

## sys.cpu.getInfoByWmi() 
使用 WMI 接口类 win32_processor 查询处理器信息  [参考](https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-processor)
  
[返回对象:sysCpuWmiInfoObject](#syscpuwmiinfoobject)

``` js
await native.sys.cpu.getInfoByWmi()

/**
 * 返回
[false, {
    "AddressWidth": 64,
    "Architecture": 9,
    "AssetTag": "To Be Filled By O.E.M.",
    "Availability": 3,
    "Caption": "Intel64 Family 6 Model 151 Stepping 2",
    ...
}]
 */
```

## sys.cpu.getMaxExtFunction() 
CPU的扩展信息最大查询索引

``` js
await native.sys.cpu.getMaxExtFunction()

/**
 * 返回
[false, 2147483656]
 */
```

## sys.cpu.getVender() 
返回制造商信息,Intel会返回"GenuineIntel",AMD会返回"AuthenticAMD"

``` js
await native.sys.cpu.getVender()

/**
 * 返回
[false, 'GenuineIntel']
 */
```

## sysCpuWmiInfoObject

### sysCpuWmiInfoObject.? 
 [参考](https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-processor)

### sysCpuWmiInfoObject.AddressWidth 
 CPU 位宽,值为 32 或 64

### sysCpuWmiInfoObject.Architecture 
 指令集架构,x86 值为 0,x64 值为 9

### sysCpuWmiInfoObject.CurrentClockSpeed 
 CPU 当前速度,单位 MHz,该值除 1000 可换算为单位 GHz,使用 math.round 可以限定小数位数

### sysCpuWmiInfoObject.DeviceID 
 设备 ID

### sysCpuWmiInfoObject.Manufacturer 
 生产厂商,例如"GenuineIntel"

### sysCpuWmiInfoObject.MaxClockSpeed 
 CPU 最大速度,单位 MHz,该值除 1000 可换算为单位 GHz

### sysCpuWmiInfoObject.Name 
 设备名

### sysCpuWmiInfoObject.NumberOfCores 
 CPU 核心数

### sysCpuWmiInfoObject.NumberOfLogicalProcessors 
 CPU 逻辑核心数
