
module.exports = require('babel-loader').custom(babel => {
  function myPlugin() {
    // console.log(babel);
    return { visitor: {} };
  }
  return {
    // customOptions({ opt1, opt2, ...loader }) {
    //   return {
    //     custom: { opt1, opt2 },
    //     ...loader
    //   }
    // },
    config(cfg) {
      if (cfg.hasFilesystemConfig()) {
        return cfg.options
      }

      return {
        ...cfg.options,
        plugins: [
          ...(cfg.options.plugins || []),
          myPlugin,
        ],
      };
    },
    result(result) {
      // console.log(result.code)
      return {
        ...result,
        code: result.code + '\n//自定义loader生成'
      }
    }
  }
})