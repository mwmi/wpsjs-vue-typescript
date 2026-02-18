import { wpsAlert } from "./util.ts";

/**
 * 从业务系统打开 Office 文件
 * @param param - 参数对象或 JSON 字符串
 * @returns 处理结果
 */
function openOfficeFileFromSystemDemo(
  param: string,
): Record<string, any> {
  const jsonObj =
    typeof param === "string" ? JSON.parse(param) : param;
  wpsAlert("从业务系统传过来的参数为：" + JSON.stringify(jsonObj));
  return { wps加载项项返回: jsonObj.filepath + ", 这个地址给的不正确" };
}

/**
 * 从业务系统调用的处理函数
 * @param param - 参数对象或 JSON 字符串
 * @returns 处理结果
 */
function InvokeFromSystemDemo(
  param: string,
): Record<string, any> {
  const jsonObj =
    typeof param === "string" ? JSON.parse(param) : param;
  const handleInfo = jsonObj.Index;

  switch (handleInfo) {
    case "getDocumentName": {
      let docName = "";
      const activeWorkbook = window.Application.ActiveWorkbook;
      if (activeWorkbook) {
        docName = activeWorkbook.Name;
      }

      return { 当前打开的文件名为: docName };
    }

    case "newDocument": {
      let newDocName = "";
      const doc = window.Application.Workbooks.Add();
      newDocName = doc.Name;

      return { 操作结果: "新建文档成功，文档名为：" + newDocName };
    }

    case "OpenFile": {
      const filePath = jsonObj.filepath;
      if (filePath) {
        // 使用类型断言访问 Application 对象
        const app = window.Application as any;
        if (app.Workbooks.OpenFromUrl) {
          app.Workbooks.OpenFromUrl(filePath);
        } else {
          app.Workbooks.Open(filePath);
        }
        return { 操作结果: "打开文件成功" };
      }
      return { 操作结果: "文件路径为空" };
    }

    default:
      return { 其它xxx: "未知的操作指令" };
  }
}

export default {
  openOfficeFileFromSystemDemo,
  InvokeFromSystemDemo,
};
