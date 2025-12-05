import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // React Hooks plugin configuration
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  // Main rules configuration
  {
    rules: {
      "no-console": "warn",
      "no-alert": "warn",
      "no-fallthrough": "error",
      "no-unreachable": "error",
      "no-restricted-imports": "off",
    },
  },
  // TypeScript-specific rules
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // Disable the base rule in favor of the TypeScript version
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      
      // Use the more comprehensive unused-imports plugin
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      
      // Custom restricted imports
      "@typescript-eslint/no-restricted-imports": [
        "warn",
        {
          name: "react-redux",
          importNames: ["useSelector", "useDispatch"],
          message: "Use typed hooks `useAppDispatch` and `useAppSelector` instead.",
        },
      ],
    },
  },
  // React-specific settings (optional but recommended)
  {
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off", // Not needed with TypeScript
      "react/jsx-uses-react": "off", // Not needed in React 17+
    },
  },
];