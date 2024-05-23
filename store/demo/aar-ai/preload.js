const sleep = time => new Promise(resolve => setTimeout(resolve, time || 1e3))
const loadScript = function (url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;

    // 脚本加载完成后执行回调函数
    script.onload = resolve;

    document.head.appendChild(script);
  })
}


new Promise(async function () {
  await sleep()
  window.sys = window.Sys && await new window.Sys({ log: true })
  await loadScript(`https://unpkg.com/jquery@3.7.1/dist/jquery.js`)
  console.log("加载了")

  // 使用事件委托在 body 上添加点击事件监听器
  $('body').on('click', '.session-list .session-item .session', async function () {
    console.log("点击列表或搜索按钮")
    // 执行创建新按钮的代码
    await sleep()

    const observer = new MutationObserver(function (mutations) {
      addBtn()
    });
    // 配置观察选项
    const config = { attributes: true, childList: false, characterData: false };

    // 开始观察 .create-session 元素
    observer.disconnect()
    observer.observe($('.create-session').get(0), config);
    addBtn()
  });
})

function addBtn() {
  $('.language-aardio .copy-button').each(function () {
    // 检查是否已经存在按钮
    if (!$(this).prev().hasClass('run-code-button')) {
      // 创建新按钮并克隆 copy-button 的样式
      const newButton = $('<button class="run-code-button">执行</button>').css({
        'cursor': 'pointer', // 设置光标为手形
        'right': '50px',
        'position': 'relative',
        'padding': $(this).css('padding'), // 克隆 padding
        'background-color': $(this).css('background-color'), // 克隆背景颜色
        'border': $(this).css('border'), // 克隆边框
        'font-size': $(this).css('font-size'), // 克隆字体大小
        'cursor': $(this).css('cursor'), // 克隆鼠标样式
        'border-radius': $(this).css('border-radius'), // 克隆圆角
        'box-shadow': $(this).css('box-shadow') // 克隆阴影
      });

      // 添加点击事件处理
      newButton.click(function () {
        const code = $(this).closest('.language-aardio').find('code').text();
        window.sys.ws.call(`run`, [code])
      });

      // 添加鼠标悬停和离开事件处理
      newButton.hover(function () {
        $(this).css('color', '#0000ff'); // 设置新的字体颜色
      }, function () {
        // 鼠标离开时恢复字体颜色
        $(this).css('color', ''); // 恢复原来的字体颜色
      });

      // 将新按钮插入到 .copy-button 前面
      $(this).before(newButton);
    }
  });
}