const tailwindcss = require("tailwindcss");
const postcssPresetEnv = require("postcss-preset-env");
module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),
    require("autoprefixer"),
    postcssPresetEnv
  ]
};
