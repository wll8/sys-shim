#include <stdio.h>
#include <stdbool.h>

// 假设以下为头文件和第三方库的引用
#include <web/socket/server.h>
#include <web/socket/jsonServer.h>
#include <web/json.h>
#include <fsys.h>
#include <fsys.file.h>
#include <fsys.res.h>
#include <win/util/tray.h>
#include <win/ui.h>
#include <wsock/tcp/simpleHttpServer.h>
#include <web/view.h>
#include <inet/http.h>
#include <console.h>
#include <io.h>

char* tempPath = fsys.getTempDir() + "/sys-shim/";
fsys.createDir(tempPath);

// 释放资源
fsys.res.saveRes("/res", tempPath);
fsys.file* jsFileSys = fsys.file(tempPath + "/res/sys.js");
char* jsFileSysStr = jsFileSys->readAll();

char* cfgPath = "";
web_json_value_t data = {
    .u.object = {
        "main": io.fullpath("./sys.js"),
        "page": io.fullpath("./page.html")
    }
};

if (_STUDIO_INVOKED) {
    cfgPath = io.fullpath("./dev.package.json");
} else {
    cfgPath = io.fullpath("./package.json");
}

if (io.exist(cfgPath)) {
    char* cfgContent = fsys.file(cfgPath)->readAll();
    web_json_value_t cfgData = web_json_parse(cfgContent, strlen(cfgContent));
    if (cfgData.type == web_json_object) {
        web_json_object_entry_t* entry = cfgData.u.object;
        while (entry != NULL) {
            web_json_object_entry_t* next = entry->next;
            if (entry->value.type != web_json_null) {
                web_json_object_replace(&data, entry->name, strlen(entry->name), &entry->value);
            }
            entry = next;
        }
    }
}

// 创建 WebSocket 服务端
web_socket_server_t wsrv = web_socket_server();
wsrv.start();
char* wsUrl = wsrv.getUrl();
web_socket_json_server_t rpcServer = web_socket_json_server(wsrv);

// 这里可以自定义WebSocket 服务端可以使用的 URL 路径
wsrv.onUpgradeToWebsocket = function(hSocket){
    return rpcServer.start(hSocket);
};

win_form_t winform = win_form(text = "main debug");

if (data.u.object->debug) {
    winform.show(true);
}
winform.add(edit={
    cls: "richedit",
    left: 23,
    top: 24,
    right: 730,
    bottom: 380,
    db: 1,
    dl: 1,
    dr: 1,
    dt: 1,
    edge: 1,
    hscroll: 1,
    multiline: 1,
    vscroll: 1,
    z: 1
});

void* hwndObj;
int msgMap[] = {
    0x205, // _WM_RBUTTONUP
    0x202 // _WM_LBUTTONUP
};

typedef struct deep_get_result {
    void* cur;
    char* endKey;
} deep_get_result;

deep_get_result deepGet(void* obj, char* str) {
    char** arr = string.split(str, ".");
    void* cur = obj;
    char* endKey = "";
    for (int i = 1; arr[i]; i++) { 
        char* key = arr[i];
        if (!arr[i + 1]) {
            endKey = key;
        } else {
            cur = deepGet(cur[key], arr[i + 1]).cur;
        }
    }
    return (deep_get_result) {cur, endKey};
}

void* getIcon(void* icon) {
    void* hIcon;
    if (inet_url_is(icon)) {
        inet_http_t http = inet_http();
        http.get(icon);
    } else {
        http = NULL;
    }
    if (icon->type == TYPE_NUMBER) {
        if (icon >= 0x7F00) { 
            hIcon = ::LoadIcon(NULL, topointer(icon));
        } else {
            hIcon = ::LoadIcon(_HINSTANSE, topointer(icon));
        }
    } elseif (icon->type == TYPE_STRING) {
        hIcon = ..win.image.createIcon(icon, true, 16, 32);
    } else {
        hIcon = icon : _HAPPICON;
    }
    return hIcon;
}

typedef struct external_view_function {
    void* (*create)(char*);
    void (*fullscreen)(void*);
    void (*setIcon)(void*, void*, void*);
    void (*setPos)(void*, int, int);
    void (*setTopmost)(void*, bool);
} external_view_function;

typedef struct external_tray_function {
    void* (*create)(void);
    void (*icon)(void*, void*);
    void (*tip)(void*, char*);
    void (*pop)(void*, ...);
    void (*on)(void*, int);
    void (*off)(void*, int);
} external_tray_function;

typedef struct external_base_function {
    void (*publish)(char*, ...);
    void (*msgBox)(...);
    void (*exit)(void*);
} external_base_function;

typedef struct external {
    external_view_function view;
    external_tray_function tray;
    external_base_function base;
} external;

// 定义允许 Node.js 调用的函数
rpcServer.external = (external) {
    (external_view_function) {
        .create = function(char* htmlFile){
            win_form_t winform = win_form(text = "main");
            void* hwnd = winform.hwnd;
            hwndObj[hwnd] = winform;
            web_view_t wb = web.view(hwndObj[hwnd], data.userDataDir, data.browserArguments);
            hwndObj[hwnd].wb = wb;
            hwndObj[hwnd].wb.external = (void*) {
                .wsUrl = wsUrl,
                .hwnd = hwnd
            };
            hwndObj[hwnd].wb.preloadScript(jsFileSysStr);
            hwndObj[hwnd].wb.preloadScript(`
                // 添加 ext
                window.ext = chrome.webview.hostObjects.external
            `);
            hwndObj[hwnd].wb.go(htmlFile);
            hwndObj[hwnd].text = wb.xcall("() => document.title");
            win.setActive(hwnd); // 激活窗口
            win.setForeground(hwnd); // 移动窗口到最前面
            hwndObj[hwnd].wb.focus();
            hwndObj[hwnd].show();
            return hwnd;
        },
        .fullscreen = function(void* hwnd) {
            hwndObj[hwnd].wb.fullscreen();
        },
        .setIcon = function(void* hwnd, void* small, void* big) {
            big = big ?: small;
            hwndObj[hwnd].setIcon(getIcon(small), getIcon(big));
        },
        .setPos = function(void* hwnd, int x, int y) {
            hwndObj[hwnd].setPos(x, y);
        },
        .setTopmost = function(void* hwnd, bool enabled) {
            win.setTopmost(hwnd, enabled);
        }
    },
    (external_tray_function) {
        .create = function() {
            win_form_t winform = win_form();
            void* hwnd = winform.hwnd;
            hwndObj[hwnd] = winform;
            hwndObj[hwnd].onTrayMessage = {};
            hwndObj[hwnd].tray = win.util.tray(hwndObj[hwnd]);
            return hwnd;
        },
        .icon = function(void* hwnd, void* path) {
            hwndObj[hwnd].tray.icon = getIcon(path);
        },
        .tip = function(void* hwnd, char* tip) {
            hwndObj[hwnd].tray.tip = tip;
        },
        .pop = function(void* hwnd, ...) {
           
            hwndObj[hwnd].tray.pop(...);
        },
        .on = function(void* hwnd, int key) {
            int code = msgMap[key];
            hwndObj[hwnd].onTrayMessage[code] = function(wParam){
                rpcServer.publish(hwnd + "." + key, wParam);
            };
        },
        .off = function(void* hwnd, int key) {
            int code = msgMap[key];
            hwndObj[hwnd].onTrayMessage[code] = NULL;
        }
    },
    (external_base_function) {
        .publish = function(char* key, ...) {
            rpcServer.publish(key, ...);
        },
        .msgBox = function(...) {
            win.msgbox(...);
        },
        .exit = function(void* hwnd) {
            if (hwnd) {
                win.close(hwnd);
            } else {
                win.quitMessage();
            }
        }
    }
};

fsys.file* jsFile = io.fullpath(data.u.object->main);
fsys.file* htmlFile = io.fullpath(data.u.object->page);

int execFile(char* param) {
    char* jsArg = process.joinArguments(_CMDLINE) ?: "";
    char* nodeArg = " --require " + jsFileSys.path + " " + jsFile + " " + jsArg;
    string.setenv("wsUrl", wsUrl);
    char* nodeExePath = nodeJs.getInstallPath();
    void* node, err = ..process.popen(nodeExePath, nodeArg, {workDir=..io.fullpath(self.workDir)});
    if (node) {
        node.codepage = 65001;
        node.logResponse(winform.edit);
        node.assignToJobObject(..process.job.limitKill);
    };
    return (int) NULL, err;
}

// ...
if (io.exist(jsFile) && io.exist(htmlFile)) {
    winform.text = data.u.object->windowTitle ?: "main";
    winform.hwndObj = hwndObj;
    winform.showInTaskbar = true;
    winform.onMessage = function(msg) {
        if (msg.message == 0x10) { // _WM_CLOSE
            rpcServer.stopAll();
        }
        return 0;
    };
    winform.hIcon = ::LoadIcon(_HINSTANSE, "IDI_APPLICATION");
    web_view_t wb = web.view(hwndObj[winform.hwnd], data.userDataDir, data.browserArguments);
    hwndObj[winform.hwnd].wb = wb;
    hwndObj[winform.hwnd].wb.external = (void*) {
        .wsUrl = wsUrl,
        .hwnd = winform.hwnd
    };
    hwndObj[winform.hwnd].wb.preloadScript(jsFileSysStr);
    hwndObj[winform.hwnd].wb.go(htmlFile);
    hwndObj[winform.hwnd].show();

    execFile("");
} else {
    win.msgbox("Invalid file paths.");
}

rpcServer.wait(); // 等待 WebSocket 服务端关闭

// 释放资源
delete hwndObj;
if (fsys.exist(tempPath)) {
    fsys.deleteDir(tempPath);
}
