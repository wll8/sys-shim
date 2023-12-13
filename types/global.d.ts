/**
 * sys-shim 注入的 js 类
 */
declare class Sys {}

declare interface Window {
  /**
   * Sys 的初始化结果
   */
  main: {
    /**
     * 窗口操作
     */
    win: {
      /**
       * 窗口默认标题
       */
      title: string,

      /**
       * 弹出对话框
       * @param text 文本
       * @param title 标题
       */
      msgbox(text: string, title?: string)

      /**
       * 退出消息循环，可在参数中指定loopMessage退出代码
       */
      quitMessage()
    }
    ws: GlobalType.CommonClient_
  }
}
