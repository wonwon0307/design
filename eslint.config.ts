import { defineConfig } from "eslint/config";
import { reactPackageEslintConfig } from "@repo/eslint-config/react";

export default defineConfig([
  {
    extends: [reactPackageEslintConfig],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
