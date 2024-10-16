# Changelog

## [0.0.1-19](/compare/v0.0.1-18...v0.0.1-19) (2024-10-14)


### Bug Fixes

* 端口边界处理 f268579
* 默认使用回环域避免被系统代理导致 ws 无法连接 eaf7299


### Features

* 禁用调试 3896f5d
* loading 结束后关闭它 1a33cb2
* webview 中访问的 url 是恒定的 c205120
* ws 和 http 使用相同端口 8817da9

## [0.0.1-18](/compare/v0.0.1-17...v0.0.1-18) (2024-08-15)


### Bug Fixes

* Empty object error 9bfab97

## [0.0.1-17](/compare/v0.0.1-16...v0.0.1-17) (2024-08-15)


### Features

* If the http port is occupied, use a new port (browser data will be lost) 130149b

## [0.0.1-16](/compare/v0.0.1-15...v0.0.1-16) (2024-06-28)


### Bug Fixes

* Space paths should not be an error 2d75dc1


### Features

* Improve json parameter compatibility #8 a3cc1aa, closes #8

## [0.0.1-15](/compare/v0.0.1-14...v0.0.1-15) (2024-06-24)


### Bug Fixes

* The callback function should not be executed multiple times 71f6799


### Features

* Add some test cases a2e82ba
* Improve compatibility #7 54da40c, closes #7
* Optimize Editor e449393

## [0.0.1-14](/compare/v0.0.1-13...v0.0.1-14) (2024-06-05)


### Features

* Use the --no-nameSuffix parameter to cancel the suffix 284b7b7

## [0.0.1-13](/compare/v0.0.1-12...v0.0.1-13) (2024-05-30)


### Bug Fixes

* The url parameter should not report an error 4038f89

## [0.0.1-12](/compare/v0.0.1-11...v0.0.1-12) (2024-05-22)


### Bug Fixes

* There should be no errors when passing in multiple lines of code 103d365


### Features

* Prefer using local files, such as package.json c8cf885

## [0.0.1-11](/compare/v0.0.1-10...v0.0.1-11) (2024-05-22)


### Features

* Compatibility processing when the icon is an html file e35b2e5
