import { fixupConfigRules } from "@eslint/compat";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...fixupConfigRules(
        compat.extends(require.resolve("eslint-config-react-app"))
    ),
    {
        rules: {
            "no-var": "error", // var 금지
            "no-multiple-empty-lines": "error", // 여러 줄 공백 금지
            "no-console": ["error", { allow: ["warn", "error", "info"] }], // console.log() 금지
            eqeqeq: "error", // 일치 연산자 사용 필수
            "dot-notation": "error", // 가능하다면 dot notation 사용
            "no-unused-vars": "error", // 사용하지 않는 변수 금지
            "react/jsx-no-useless-fragment": "error", // 불필요한 Fragment 금지
        },
    },
];
