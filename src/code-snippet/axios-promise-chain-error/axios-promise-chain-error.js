import { processCatch } from "./utils";

request1()
  .then((jsonResult) => {
    if (jsonResult.code === 501) {
      throw Error(wrapErrorMessage(jsonResult));
    }

    this.$message.success("request1 success");
    return request2();
  })
  .then((jsonResult) => {
    if (jsonResult.code === 503) {
      throw Error(wrapErrorMessage(jsonResult));
    }

    this.$message.success("request2 success");
  })
  .catch((error) => {
    processCatch(error);
  });
