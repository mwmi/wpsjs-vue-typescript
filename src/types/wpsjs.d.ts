// 扩展 Window 接口，添加 WPS 加载项相关的全局属性
interface Window {
  /**
   * 从业务系统打开 Office 文件的函数
   * @param param - 参数对象或 JSON 字符串
   * @returns 处理结果
   */
  openOfficeFileFromSystemDemo: (param: string) => Record<string, any>
  
  /**
   * 从业务系统调用的处理函数
   * @param param - 参数对象或 JSON 字符串
   * @returns 处理结果
   */
  InvokeFromSystemDemo: (param: string) => Record<string, any>
  
  /**
   * WPS 应用程序对象
   */
  Application: {
    ribbonUI: any
    Enum: any
    ActiveWorkbook: any
    Workbooks: any
    ActiveSheet: any
    PluginStorage: {
      getItem: (key: string) => any
      setItem: (key: string, value: any) => void
    }
    ApiEvent: {
      AddApiEventListener: (event: string, callback: string) => void
      RemoveApiEventListener: (event: string, callback: string) => void
    }
    OAAssist: {
      WebNotify: (message: string, showInConsole: boolean) => void
    }
    CreateTaskPane: (url: string) => { ID: string | number; Visible: boolean }
    GetTaskPane: (id: number) => { Visible: boolean }
    devicePixelRatio: number
  }
}

declare module 'wpsjs/vite_plugins' {
  import type { Plugin } from 'vite'
  
  /**
   * 扫描函数插件配置
   */
  interface FunctionsScannerOptions {
    /** 输入的JavaScript文件路径 */
    inputJsPath: string
    /** 输出的JSON文件路径 */
    outputJsonPath: string
    /** 函数命名空间 */
    namespace: string
  }
  
  /**
   * 复制文件插件配置
   */
  interface CopyFileOptions {
    /** 源文件路径 */
    src: string
    /** 目标文件路径 */
    dest: string
  }
  
  /**
   * 函数扫描器插件
   * 用于扫描指定文件中的函数并生成JSON配置
   */
  export function functionsScanner(options: FunctionsScannerOptions): Plugin
  
  /**
   * 文件复制插件
   * 用于在构建过程中复制指定文件
   */
  export function copyFile(options: CopyFileOptions): Plugin
}