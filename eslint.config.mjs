import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";


export default defineConfig([
    {
      files: ["**/*.{js,mjs,cjs}"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
      plugins: {
        js,
      },
      rules: {
        ...js.configs.recommended.rules,
      },
      extends: ["plugin:prettier/recommended"],
    },
  ]);
