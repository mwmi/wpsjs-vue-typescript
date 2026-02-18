/**
 * 这是一个加载项自定义函数
 * @customfunction
 * @param {string} arg0 - 支持字符串参数
 * @param {number} arg1 - 支持数值参数
 * @param {boolean} arg2 - 支持bool参数
 * @returns {string} - 可以设置返回值类型
 */
function custom_function(
  arg0: string,
  arg1: number,
  arg2: boolean,
  arg3: any,
  arg4: any,
): string {
  let argAndType = (arg: any) => `${arg}: ${typeof arg}`;
  let argAndTypeList = [arg0, arg1, arg2, arg3, arg4].map(argAndType);
  let message = `这是一个加载项自定义函数(${argAndTypeList.join(", ")})`;
  return message;
}
