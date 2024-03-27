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
    background: url(/sys-shim-doc/assets/icon/run.svg);
  }
  .share-icon {
    background: url(/sys-shim-doc/assets/icon/share.svg);
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
// 获取执行代码
function getExecCode(el){
  const parent = el.parentNode
  const languageJSEl = parent.querySelector(".language-javascript")
   // 没有获取的dom直接返回
  if(!languageJSEl) return
  return languageJSEl.textContent
}
// 执行代码
async function execCode(text){
 // 得到异步函数
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  // 得到执行函数
  const execAsyncCode = new AsyncFunction(text)
  const result = await execAsyncCode()
  return result
}
// 添加md上面的按钮执行图标
function addExecDiv(parentEl){
  const execDiv = document.createElement("div")
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
 
  // 执行按钮点击
  execBtn.onclick = function(){
    const text = getExecCode(execDiv) 
    execCode(text)
  }
  // 分享按钮点击
  shareBtn.onclick =  function(){
    const text = getExecCode(execDiv) 
    console.log("生成分享链接", text)
  }
  parentEl.appendChild(execDiv)
}
function addMdButtons(){
  const jsCodeDoms = document.querySelectorAll(".line-numbers-mode")
  // 如何jsCodeDomes为假就不执行下面步骤
  if(!jsCodeDoms && !jsCodeDoms.length)return
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

function init(){
  // 创建style标签
  createStyleEl()
  // 添加css样式
  injectStyle(execBtnCss)
  // 监听路由变化
  watchRouterChange()
}

if(globalThis.Sys){
  init()
}
