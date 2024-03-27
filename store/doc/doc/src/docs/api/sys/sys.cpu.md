# sys.cpu

## sys.cpu.getBrand()
返回CPU商标信息

``` js
;[, res] = await native.sys.cpu.getBrand()
console.log(res)

// Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz
```

## sys.cpu.getFrequence()
返回表示 CPU 频率的数值,以 MHz 为单位

``` js
;[, res] = await native.sys.cpu.getFrequence()
console.log(res)

// 2271.18168
```

## sys.cpu.getFrequence(true) 
返回表示 CPU 频率的友好格式的字符串,单位: GHz 小数位数：1

``` js
;[, res] = await native.sys.cpu.getFrequence(true)
console.log(res)

// 2.3 GHz
```

## sys.cpu.getInfo(EAX, 结构体) 

参考文档： https://en.wikipedia.org/wiki/CPUID

根据结构体查询 cpu 信息。

例如获取制造商信息：

``` js
;[, res] = await native.sys.cpu.getInfo(0, {_struct: `INT eax;BYTE ebx[4];BYTE ecx[4];BYTE edx[4]` })

console.log([res.ebx, res.ecx, res.edx].join(``))

// 返回值： GenuntelineI
// 也可以直接调用 `sys.cpu.getVender()` 获取。
```

获取制造商信息：

``` js
;[, res1] = await native.sys.cpu.getInfo(0x80000002, {_struct: `BYTE str[16]` })
;[, res2] = await native.sys.cpu.getInfo(0x80000003, {_struct: `BYTE str[16]` })
;[, res3] = await native.sys.cpu.getInfo(0x80000004, {_struct: `BYTE str[16]` })

console.log([res1.str, res2.str, res3.str].join(``))

// 返回值： Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz
// 也可以直接调用 `sys.cpu.getBrand()` 获取。
```

## sys.cpu.getInfoByWmi() 
使用 WMI 接口类 win32_processor 查询处理器信息  [参考](https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-processor)
  
[返回对象:sysCpuWmiInfoObject](#syscpuwmiinfoobject)

``` js
;[, res] = await native.sys.cpu.getInfoByWmi()
console.log(res)

/**
{
  "AddressWidth": 64,
  "Architecture": 9,
  "AssetTag": "To Be Filled By O.E.M.",
  "Availability": 3,
  "Caption": "Intel64 Family 6 Model 151 Stepping 2",
  ...
}
**/
```

## sys.cpu.getMaxExtFunction() 
CPU的扩展信息最大查询索引

``` js
;[, res] = await native.sys.cpu.getMaxExtFunction()
console.log(res)

// 2147483656
```

## sys.cpu.getVender() 
返回制造商信息,Intel会返回"GenuineIntel",AMD会返回"AuthenticAMD"

``` js
;[, res] = await native.sys.cpu.getVender()
console.log(res)

// GenuineIntel
```

## sysCpuWmiInfoObject

 [参考](https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-processor)

### .AddressWidth 
 CPU 位宽,值为 32 或 64

### .Architecture 
 指令集架构,x86 值为 0,x64 值为 9

### .CurrentClockSpeed 
 CPU 当前速度,单位 MHz,该值除 1000 可换算为单位 GHz,使用 math.round 可以限定小数位数

### .DeviceID 
 设备 ID

### .Manufacturer 
 生产厂商,例如"GenuineIntel"

### .MaxClockSpeed 
 CPU 最大速度,单位 MHz,该值除 1000 可换算为单位 GHz

### .Name 
 设备名

### .NumberOfCores 
 CPU 核心数

### .NumberOfLogicalProcessors 
 CPU 逻辑核心数
