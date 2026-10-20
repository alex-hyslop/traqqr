import type { Preview } from "@storybook/react-vite"

import "../src/styles/global.css"

// The website is dark only (BaseLayout sets class="dark" on <html>), so stories are too.
document.documentElement.classList.add("dark")

const preview: Preview = {
  parameters: {
    options: {
      storySort: { order: ["Website Sections", "Website Components"] },
    },
  },
}

export default preview
