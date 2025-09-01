import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals"),
{
  ignores:
    [
      ".next/**",
      ".env",
      "node_modules",
      "public/**",
      "next.config.js",
      "postcss.config.js"
    ]
},
{
  languageOptions: { globals: { ...globals.browser, ...globals.node } }
},
{ files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
{ files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
{
  rules: {
    "no-unused-vars": ["warn"],
    "no-undef": ["warn"],
    "quotes": ["warn", "double", { "avoidEscape": true }],
    "semi": ["warn", "always"],
    "indent": ["warn", 2],
    "class-methods-use-this": "warn",
    "eol-last": ["warn", "always"],
    "no-unused-expressions": ["warn"],
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "no-trailing-spaces": ["warn"],
    "no-useless-constructor": 0,
    "no-loop-func": 0,
  }
},

js.configs.recommended,
];

export default eslintConfig;
