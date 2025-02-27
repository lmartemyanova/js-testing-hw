import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "module"}},
  {languageOptions: { globals: {
    ...globals.browser, 
    ...globals.node,
    ...globals.jest,
  } }},
  pluginJs.configs.recommended,
  {
    ignores: ['dist/*', 'coverage/*', 'reports/*']
  },
  {
    files: ['**/*.test.js'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off',
      'jest/expect-expect': 'error',
    },
  }
];
