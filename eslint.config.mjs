import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { flatConfigs as importXConfigs } from "eslint-plugin-import-x";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { configs as tseslintConfigs } from "typescript-eslint";

// eslint-disable-next-line import-x/no-named-as-default-member -- CJS interop; named ESM export is unavailable
const { configs: nextConfigs } = nextPlugin;

const eslintConfig = defineConfig([
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"]),
    eslintJs.configs.recommended,
    ...tseslintConfigs.recommended,
    eslintReact.configs["recommended-typescript"],
    reactHooks.configs.flat.recommended,
    nextConfigs["core-web-vitals"],
    importXConfigs.recommended,
    importXConfigs.typescript,
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts}"],
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: [
                        "*.mjs",
                        "*.cjs",
                        ".github/scripts/*.mjs",
                        "eslint.config.mjs",
                        "postcss.config.mjs",
                    ],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            "import-x/resolver-next": [
                createTypeScriptImportResolver({
                    project: "./tsconfig.json",
                }),
            ],
        },
        rules: {
            "import-x/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling", "index"],
                        "object",
                        "type",
                    ],
                    pathGroups: [
                        {
                            pattern: "@shared/**",
                            group: "internal",
                            position: "before",
                        },
                        {
                            pattern: "@features/**",
                            group: "internal",
                            position: "before",
                        },
                        {
                            pattern: "@widgets/**",
                            group: "internal",
                            position: "before",
                        },
                        {
                            pattern: "@views/**",
                            group: "internal",
                            position: "before",
                        },
                        {
                            pattern: "@/**",
                            group: "internal",
                            position: "before",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["builtin"],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
    {
        files: [".github/scripts/**/*.{js,mjs,cjs}", "*.config.{js,mjs,cjs,mts}"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
]);

export default eslintConfig;
