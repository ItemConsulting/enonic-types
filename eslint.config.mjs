import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ["**/*.{ts}"],
    ignores: ["build/**/*.*"],
    rules: {
      "no-unused-vars": "off",
      "no-use-before-define": "off",
    },
  },
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended
];
