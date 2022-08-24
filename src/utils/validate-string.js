/**
 *
 * @param {string} string 要验证的字符串
 * @param {Array<string>} tests 回调数组，表示一组验证规则
 * @param {Array<string>} callbacks  回调数组，与tests一一对应
 * @returns
 */
function valicateString(string, tests, callbacks) {
  try {
    for (let i = 0; i < tests.length; i++) {
      if (!tests[i](string)) {
        throw new Error(i);
      }
    }
    return true;
  } catch (error) {
    let i = error.message;
    callbacks[i](string);
    return false;
  }
}
