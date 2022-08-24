import { validateString } from "./validate-string";

let password = "password8782,6481";

let pass = valicateString(
  password,
  [
    // 限制密码长度
    (password) => {
      return password.length >= 6 && password.length <= 12;
    },
    // 限制密码长度
    (password) => {
      let testexp = /^[A-Za-z0-9]*$/;
      return testexp.test(password);
    },
  ],
  [
    () => {
      console.log("密码长度应该在6~12之间");
    },
    () => {
      console.log("密码只能包含英文字母和数字");
    },
  ]
);

console.log(pass);
