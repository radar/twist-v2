module.exports = {
  "extends": ["standard", "plugin:react/recommended", "plugin:jest/recommended"],
  "parser": "babel-eslint",
  "rules": {
    "strict": 0,
    // incompatible with prettier
    // https://github.com/prettier/prettier/issues/3847
    "space-before-function-paren": 0,
  }
};
