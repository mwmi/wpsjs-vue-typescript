import { GetUrlPath, wpsAlert } from "../utils/util.ts";

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
      let tsId = window.Application.PluginStorage.getItem("taskpane_id");
      if (!tsId) {
        let tskpane = window.Application.CreateTaskPane(
          GetUrlPath() + "/taskpane",
        );
        let id = tskpane.ID;
        window.Application.PluginStorage.setItem("taskpane_id", id);
        tskpane.Visible = true;
      } else {
        // 确保 tsId 是数字类型
        const taskIdNumber =
          typeof tsId === "string" ? parseInt(tsId, 10) : (tsId as number);
        let tskpane = window.Application.GetTaskPane(taskIdNumber);
        tskpane.Visible = true;
      }
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
