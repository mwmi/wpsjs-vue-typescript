import { ToggleTaskPane } from "@/ribbon.ts";
import { GetRouterHash, GetUrlPath, wpsAlert } from "../utils/util.ts";

export function onbuttonclick(idStr: string, _param?: any) {
  switch (idStr) {
    case "getDocName": {
      let doc = window.Application.ActiveWorkbook;
      if (!doc) {
        return "当前没有打开任何文档";
      }
      return doc.Name;
    }
    case "createTaskPane": {
      ToggleTaskPane(`${GetUrlPath()}${GetRouterHash()}/taskpane`, "taskpane");
      break;
    }
    case "newDoc": {
      window.Application.Workbooks.Add();
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
    case "closeDoc": {
      if (window.Application.Workbooks.Count < 2) {
        wpsAlert("当前只有一个文档，别关了。");
        break;
      }

      let doc = window.Application.ActiveWorkbook;
      if (doc) doc.Close();
      break;
    }
    case "openWeb": {
      break;
    }
  }
}
