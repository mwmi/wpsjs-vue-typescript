/// <reference types="et-jsapi-declare" />

// 在后续的wps版本中，wps的所有枚举值都会通过wps.Enum对象来自动支持，现阶段先人工定义
export const WPS_Enum = {
  msoCTPDockPositionLeft: 0,
  msoCTPDockPositionRight: 2,
} as const;

export function GetUrlPath(): string {
  // 在本地网页的情况下获取路径
  if (window.location.protocol === "file:") {
    const path = window.location.href;
    // 删除文件名以获取根路径
    return path.substring(0, path.lastIndexOf("/"));
  }

  // 在非本地网页的情况下获取根路径
  const { protocol, hostname, port } = window.location;
  const portPart = port ? `:${port}` : "";
  return `${protocol}//${hostname}${portPart}`;
}

export function GetRouterHash(): string {
  if (window.location.protocol === "file:") {
    return "";
  }
  return "/#";
}

/**
 * 执行系统命令
 * @param file 程序或文件路径
 * @param parameters 命令行参数
 * @param cmd 窗口样式 0 隐藏显示 1 正常显示 2 最小化显示 3 最大化显示
 * @returns 如果函数成功，则返回大于 32 的值。 如果函数失败，它将返回一个错误值，该值指示失败的原因。
 * @see {@link https://learn.microsoft.com/zh-cn/windows/win32/api/shellapi/nf-shellapi-shellexecutea|ShellExecuteA}
 */
export function shellExecute(
  file: string,
  parameters = "",
  cmd: 0 | 1 | 2 | 3 = 1,
): any {
  return Application.ExecuteExcel4Macro(
    `CALL("Shell32","ShellExecuteA","JJCCCJJ",0,"","${file}", "${parameters}",0, ${cmd})`,
  );
}

/**
 * 显示一个提示框
 * @param message 提示信息
 * @param type 提示框类型 1 确认取消 2 信息 3 警告
 * @returns true 确定 false 取消
 */
export function wpsAlert(message: string, type: 1 | 2 | 3 = 2): any {
  return Application.ExecuteExcel4Macro(`ALERT("${message}", "${type}")`);
}

// 为了向后兼容，仍然提供默认导出
export default {
  WPS_Enum,
  GetUrlPath,
  GetRouterHash,
  shellExecute,
  wpsAlert,
};
