import globals from "globals";
import pluginJs from "@eslint/js";
import reactPlugin from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.jest, // Jest 환경 추가
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin, // react 플러그인 추가
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error", // JSX 내 변수 사용 감지
      "no-var": "error", // var 금지
      "no-multiple-empty-lines": "error", // 여러 줄 공백 금지
      "no-console": ["error", { allow: ["warn", "error", "info"] }], // console.log 제한
      eqeqeq: "error", // === 사용 필수
      "dot-notation": "error", // dot notation 사용 권장
      "no-unused-vars": "error", // 사용하지 않는 변수 금지
    },
  },
  pluginJs.configs.recommended
];