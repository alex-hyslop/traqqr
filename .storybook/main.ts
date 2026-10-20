import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath } from "node:url"

// Site-only compositions. Library components are documented in the
// traqqr-components Storybook — don't duplicate their stories here.
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()]
    config.resolve = {
      ...config.resolve,
      alias: { ...config.resolve?.alias, "@": fileURLToPath(new URL("../src", import.meta.url)) },
    }
    return config
  },
}

export default config
