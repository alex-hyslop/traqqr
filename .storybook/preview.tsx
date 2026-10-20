import type { Preview } from "@storybook/react-vite"

import "../src/styles/global.css"

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: { icon: "mirror", items: ["light", "dark"], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, { globals }) => {
      document.documentElement.classList.toggle("dark", globals.theme === "dark")
      return <Story />
    },
  ],
}

export default preview
