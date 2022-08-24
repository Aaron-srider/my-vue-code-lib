module.exports = {
  chainWebpack(config) {
    const webpack = require("webpack");

    // 添加jquery
    config.plugin("provide").use(webpack.ProvidePlugin, [
      {
        $: "jquery",
        jquery: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      },
    ]);
  },
};
