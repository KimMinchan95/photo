import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            "import/order": [
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
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
]);

export default eslintConfig;
