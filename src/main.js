import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// #region import elementui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

Vue.use(ElementUI, { locale });
// #endregion


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
