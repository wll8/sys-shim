import { basicSetup } from 'codemirror'
import { EditorState, type EditorStateConfig } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import type { EditorViewConfig, ViewUpdate } from '@codemirror/view'

// 创建配置
export const createEditorView = (config: EditorViewConfig) => new EditorView(config)

/**
 * 为Editor添加事件扩展功能
 */
export interface WEditorEvents {
  onChange?: (value: string, viewUpdate: ViewUpdate) => void
}
export interface WEditorStateConfig extends EditorStateConfig, WEditorEvents {
}
// 生成状态
export function creatEditorState(config: WEditorStateConfig) {
  return EditorState.create({
    ...config,
    extensions: [
      basicSetup,
      // 添加事件监听
      EditorView.updateListener.of((viewUpdate) => {
        // 监听代码变化并绑定
        if (viewUpdate.docChanged)
          config.onChange && config.onChange(viewUpdate.state.doc.toString(), viewUpdate)
      }),
      ...(Array.isArray(config.extensions) ? config.extensions : [config.extensions]),

    ],
  })
}

// 获取工具
export function getEditorTools(view: EditorView) {
  // doc state
  const getDoc = () => view.state.doc.toString()
  const setDoc = (newDoc: string) => {
    if (newDoc !== getDoc()) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: newDoc,
        },
      })
    }
  }
  return {
    getDoc,
    setDoc,
  }
}
