const CracoLessPlugin = require("craco-less-plugin");
const CracoEnvPlugin = require("craco-plugin-env");
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@(.*)$": "<rootDir>/src$1",
      },
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyVars: {
          hack: `true;@import "${require.resolve(
            "./src/assets/less/yoda-theme.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {},
      },
    },
  ],
};
