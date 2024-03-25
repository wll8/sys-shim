const execBtnCss = `
  .line-numbers-mode:hover .code-common-btn {
    opacity: 1;
  }
  .code-common-btn {
    position: absolute;
    top: 0.5em;
    z-index: 5;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border-width: 0;
    border-radius: 0.5rem;
    outline: none;
    cursor: pointer;
    transition: opacity 0.4s;
    display: flex;
    opacity: 0;
    align-items: center;
    justify-content: center;
  }
  .exec {
    right: 3.5em;
  }
  .share {
    right: 6.5em;
  }
  .code-common-btn:hover {
    opacity: 1;
    background-color: #d8e9f6;
  }
  .code-common-btn .icon {
    width: 1.25rem;
    height: 1.25rem;
    background-size: 100% 100%;
  }
  .exec-icon {
    background: url(./assets/icon/run.svg);
  }
  .share-icon {
    background: url(./assets/icon/share.svg);
  }
`
function createStyleEl(){
  const styleEl = document.createElement("style")
  const body = document.body
  styleEl.id = "customStyle"
  body.append(styleEl)
}
// 注入css样式
function injectStyle(css){
  const customStyleEl = document.querySelector("#customStyle")
  customStyleEl.innerHTML = css
}
function addExecDiv(parentEl){
  const execDiv = document.createElement("div")
  // 
  const text = parentEl.querySelector(".language-javascript").textContent
 
  execDiv.innerHTML = `
      <div class="exec code-common-btn">
        <span class="icon exec-icon" />
      </div>
      <div class="share code-common-btn">
        <span class="icon share-icon"  />
      </div>
    `
  const execBtn =  execDiv.querySelector(".exec")
  const shareBtn = execDiv.querySelector(".share")
  // 得到异步函数
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  // 得到执行函数
  const execCode = new AsyncFunction(text)
  // 执行代码
  execBtn.onclick = function(){
    execCode()
  }
  // 分享代码
  shareBtn.onclick =  function(){
    console.log("生成分享链接", text)
  }
  parentEl.appendChild(execDiv)
}
function addMdButtons(){
  const jsCodeDoms = document.querySelectorAll(".line-numbers-mode")
  const length = jsCodeDoms.length
  for(let i = 0 ;  i < length; i++){
    const jsCodeDom = jsCodeDoms[i]
    // 添加按钮操作函数
    addExecDiv(jsCodeDom)
  }
}
let path = ''
// 监听页面元素以及路由变化
function watchRouterChange(){
  document.getElementById('app').addEventListener("DOMSubtreeModified", function(){
    const newpath = location.href
    if(path !== newpath){
      setTimeout(()=>{
        addMdButtons()
      }, 500)
      path = newpath
    } 
  }, false);
}

function execCode(){
  // 创建style标签
  createStyleEl()
  // 添加css样式
  injectStyle(execBtnCss)

  // addMdButtons()
  watchRouterChange()
}
if(globalThis.Sys) {
 
  new globalThis.Sys().then(async main => {
    globalThis.main = main
    globalThis.native = main.native
    globalThis.Neutralino = await main.api.neutralino()
    const [, hwnd] = await main.form.hwnd
    const title = 'sys-shim 文档'
    const icon = "https://www.hongqiye.com/favicon.ico"
    const obj = {hwnd, title, icon}

    execCode()
    console.log(obj)
  
    await main.ws.call('run', [`
      var arg = ...
      win.form._forms[arg.hwnd].text = arg.title
      win.form._forms[arg.hwnd].setIcon(arg.icon)
    `, obj])
  })
} else {
  console.group(
    "%c提示:",
    "background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 4px ;"
  );
  console.log( "你可以直接下载 https://github.com/wll8/sys-shim-doc/releases/download/v0.0.1/sys-shim-doc.exe" );
  console.log( "然后 F12 打开控制台，测试 api 调用" );
  console.log( "例如 native.process('mspaint')" );
  console.log( "由于应用未签名，可能报毒，介意误下" );
  console.groupEnd();
}
