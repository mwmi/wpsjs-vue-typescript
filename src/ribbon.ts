import {
  WPS_Enum,
  GetUrlPath,
  GetRouterHash,
  wpsAlert,
} from "./utils/util.ts";

import { InvokeFromSystemDemo, openOfficeFileFromSystemDemo } from "./utils/systemdemo.ts";

export function OnAddinLoad(ribbonUI: any) {
  if (typeof (window.Application.ribbonUI) != "object") {
    window.Application.PluginStorage.setItem("ribbonUI", ribbonUI);
  }

  if (typeof (window.Application.Enum) != "object") { // 如果没有内置枚举值
    window.Application.Enum = WPS_Enum
  }

  //这几个导出函数是给外部业务系统调用的
  window.openOfficeFileFromSystemDemo = openOfficeFileFromSystemDemo
  window.InvokeFromSystemDemo = InvokeFromSystemDemo

  window.Application.PluginStorage.setItem("EnableFlag", false) //往PluginStorage中设置一个标记，用于控制两个按钮的置灰
  window.Application.PluginStorage.setItem("ApiEventFlag", false) //往PluginStorage中设置一个标记，用于控制ApiEvent的按钮label

  // 启动后1秒后打开任务窗格
  setTimeout(() => {
    ToggleTaskPane(`${GetUrlPath()}${GetRouterHash()}`)
  }, 1000)

  return true
}

var WebNotifycount = 0;
export function OnAction(control: { Id: any }) {
  const eleId = control.Id;
  switch (eleId) {
    case "btnShowMsg":
      {
        const doc = window.Application.ActiveWorkbook;
        if (!doc) {
          wpsAlert("当前没有打开任何文档");
          return;
        }
        wpsAlert(doc.Name);
      }
      break;
    case "btnIsEnbable": {
      let bFlag = window.Application.PluginStorage.getItem("EnableFlag");
      window.Application.PluginStorage.setItem("EnableFlag", !bFlag);

      //通知wps刷新以下几个按饰的状态
      window.Application.ribbonUI.InvalidateControl("btnIsEnbable");
      window.Application.ribbonUI.InvalidateControl("btnShowDialog");
      window.Application.ribbonUI.InvalidateControl("btnShowTaskPane");
      //window.Application.ribbonUI.Invalidate(); 这行代码打开则是刷新所有的按钮状态
      break;
    }
    case "btnShowDialog":
      window.Application.ShowDialog(
        GetUrlPath() + GetRouterHash() + "/dialog",
        "这是一个对话框网页",
        600 * window.devicePixelRatio,
        600 * window.devicePixelRatio,
        false,
      );
      break;
    case "btnShowTaskPane":
      {
        ToggleTaskPane(`${GetUrlPath()}${GetRouterHash()}/taskpane`);
      }
      break;
    case "btnApiEvent":
      {
        let bFlag = window.Application.PluginStorage.getItem("ApiEventFlag");
        let bRegister = bFlag ? false : true;
        window.Application.PluginStorage.setItem("ApiEventFlag", bRegister);
        if (bRegister) {
          window.Application.ApiEvent.AddApiEventListener(
            "NewWorkbook",
            "ribbon.OnNewDocumentApiEvent",
          );
        } else {
          window.Application.ApiEvent.RemoveApiEventListener(
            "NewWorkbook",
            "ribbon.OnNewDocumentApiEvent",
          );
        }

        window.Application.ribbonUI.InvalidateControl("btnApiEvent");
      }
      break;
    case "btnWebNotify":
      {
        let currentTime = new Date();
        let timeStr =
          currentTime.getHours() +
          ":" +
          currentTime.getMinutes() +
          ":" +
          currentTime.getSeconds();
        window.Application.OAAssist.WebNotify(
          "这行内容由wps加载项主动送达给业务系统，可以任意自定义, 比如时间值:" +
          timeStr +
          "，次数：" +
          ++WebNotifycount,
          true,
        );
      }
      break;
    default:
      break;
  }
  return true;
}

export function GetImage(control: { Id: any }) {
  const eleId = control.Id;
  switch (eleId) {
    case "btnShowMsg":
      return "images/1.svg";
    case "btnShowDialog":
      return "images/2.svg";
    case "btnShowTaskPane":
      return "images/3.svg";
    default:
  }
  return "images/newFromTemp.svg";
}

export function OnGetEnabled(control: { Id: any }) {
  const eleId = control.Id;
  switch (eleId) {
    case "btnShowMsg":
      return true;
    case "btnShowDialog": {
      let bFlag = window.Application.PluginStorage.getItem("EnableFlag");
      return bFlag;
    }
    case "btnShowTaskPane": {
      let bFlag = window.Application.PluginStorage.getItem("EnableFlag");
      return bFlag;
    }
    default:
      break;
  }
  return true;
}

export function OnGetVisible(control: { Id: any }) {
  const eleId = control.Id;
  console.log(eleId);
  return true;
}

export function OnGetLabel(control: { Id: any }) {
  const eleId = control.Id;
  switch (eleId) {
    case "btnIsEnbable": {
      let bFlag = window.Application.PluginStorage.getItem("EnableFlag");
      return bFlag ? "按钮Disable" : "按钮Enable";
    }
    case "btnApiEvent": {
      let bFlag = window.Application.PluginStorage.getItem("ApiEventFlag");
      return bFlag ? "清除新建文件事件" : "注册新建文件事件";
    }
  }
  return "";
}

export function OnNewDocumentApiEvent(doc: { Name: string }) {
  wpsAlert("新建文件事件响应，取文件名: " + doc.Name);
}

/**
 * 切换任务窗格可见性
 * @param url  任务窗格URL
 */
export function ToggleTaskPane(url: string) {
  let tsId = window.Application.PluginStorage.getItem("taskpane_id");
  if (!tsId) {
    let tskpane = window.Application.CreateTaskPane(url);
    window.Application.PluginStorage.setItem("taskpane_id", tskpane.ID);
    window.Application.PluginStorage.setItem("taskpane_url", url);
    tskpane.Visible = true;
  } else {
    let taskIdNumber = parseInt(tsId, 10);
    let tskpane = window.Application.GetTaskPane(taskIdNumber);
    let taskpaneUrl = window.Application.PluginStorage.getItem("taskpane_url");
    if (taskpaneUrl != url) {
      tskpane.Navigate(url);
      window.Application.PluginStorage.setItem("taskpane_url", url);
      tskpane.Visible = true;
    } else {
      tskpane.Visible = !tskpane.Visible;
    }
  }
}