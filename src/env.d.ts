declare interface Window {
  openOfficeFileFromSystemDemo: any
  InvokeFromSystemDemo: any
}

declare module 'wpsjs/vite_plugins' {
  export interface CopyFileOptions {
    src: string;
    dest: string;
  }

  export interface FunctionsScannerOptions {
    inputJsPath: string;
    outputJsonPath: string;
    namespace: string;
  }

  export function copyFile(options: CopyFileOptions);
  export function functionsScanner(options: FunctionsScannerOptions);
}