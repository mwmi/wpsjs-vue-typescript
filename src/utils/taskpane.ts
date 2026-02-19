import { WPS_Enum } from "../utils/util.ts";

export function onbuttonclick(idStr: string, _param?: any) {
  // _param 参数保留用于未来扩展，当前版本未使用
  if (typeof window.Application.Enum != "object") {
    // 如果没有内置枚举值
    window.Application.Enum = WPS_Enum as any;
  }
  switch (idStr) {
    case "dockLeft": {
      let tsId = window.Application.PluginStorage.getItem("taskpane_id");
      if (tsId && typeof tsId === "number") {
        let tskpane = window.Application.GetTaskPane(tsId);
        tskpane.DockPosition = window.Application.Enum
          .msoCTPDockPositionLeft as number;
      }
      break;
    }
    case "dockRight": {
      let tsId = window.Application.PluginStorage.getItem("taskpane_id");
      if (tsId && typeof tsId === "number") {
        let tskpane = window.Application.GetTaskPane(tsId);
        tskpane.DockPosition = window.Application.Enum
          .msoCTPDockPositionRight as number;
      }
      break;
    }
    case "hideTaskPane": {
      let tsId = window.Application.PluginStorage.getItem("taskpane_id");
      if (tsId && typeof tsId === "number") {
        let tskpane = window.Application.GetTaskPane(tsId);
        tskpane.Visible = false;
      }
      break;
    }
    case "addString": {
      let curSheet = window.Application.ActiveSheet;
      if (curSheet) {
        curSheet.Cells.Item(1, 1).Formula =
          "Hello, wps加载项!" + curSheet.Cells.Item(1, 1).Formula;
      }
      break;
    }
    case "getDocName": {
      let doc = window.Application.ActiveWorkbook;
      if (!doc) {
        return "当前没有打开任何文档";
      }
      return doc.Name;
    }
    case "openWeb": {
      break;
    }
  }
}
