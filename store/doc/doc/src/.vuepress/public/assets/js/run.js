function runCode() {
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
      background-color: transparent;
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
    styleEl.innerHTML = execBtnCss
    body.append(styleEl)
  }

  function addExecDiv(el){
    const execDiv = document.createElement("div")
    execDiv.innerHTML = `
        <button class="exec code-common-btn">
          <span class="icon exec-icon" />
        </button>
        <button class="share code-common-btn">
          <span class="icon share-icon"  />
        </button>
      `
    const execBtn =  execDiv.querySelector(".exec")
    const shareBtn = execDiv.querySelector(".share")
    // 执行代码
    execBtn.addEventListener("click", function(){
      if(!globalThis.Sys) {
        alert(`此功能需连接到 sys-shim`)
        return undefined
      }
      eval(`(async () => {
        ${el.innerText}
      })()`)
    })
    // 分享代码
    shareBtn.addEventListener("click", function(){
      console.log("生成分享链接", el.innerText)
    })
    el.appendChild(execDiv)
  }  

  createStyleEl()
  const list = document.querySelectorAll(`div.language-javascript`)
  list.forEach(item => addExecDiv(item))
}

{
  const old = window.RenderedHack || new Function();
  window.RenderedHack = () => {
    old()
    runCode()
  }
}
