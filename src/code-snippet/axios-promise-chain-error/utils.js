/**
 * @param {string} response 后端的jsonResult对象
 * @returns {Object} response中以"-"连接的所有属性的字符串
 */
export function wrapErrorMessage(response) {
  let code = response.code;
  let message = response.message;
  let detail = response.detail;
  let data = response.data;

  return `${code}-${detail}-${message}-${data}`;
}

/**
 * @param {string} wrappedResp error中的message
 * @returns {Object} 后端的jsonResult对象，包含code,message,detail,data,都是字符串类型
 */
export function unwrapErrorMessage(wrappedResp) {
  const [code, detail, message, data] = wrappedResp.split("-");
  return {
    code,
    message,
    detail,
    data,
  };
}

/**
 * 用在catch中统一处理异常
 * @param {Object} error error中的message
 */
export function processCatch(error) {
  console.log("backend jsonResult:", error.message);
  let jsonResult = unwrapErrorMessage(error.message);
  this.$message.error(
    jsonResult.detail !== "null" ? jsonResult.detail : jsonResult.message
  );
}
