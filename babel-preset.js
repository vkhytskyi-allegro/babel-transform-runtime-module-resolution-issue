const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare((api, { target = '', options = {} } = {}) => {
  api.assertVersion('^7.0.0');

  return {
    assumptions: {
      setPublicClassFields: true,
      privateFieldsAsProperties: true,
    },
    presets: [
      [
        require('@babel/preset-env'),
        {
          modules: false,
          bugfixes: true,
          ...options.env,
        },
      ],
    ],
    plugins: [],
  };
});
