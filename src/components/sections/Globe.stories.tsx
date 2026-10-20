import type { Meta, StoryObj } from "@storybook/react-vite"
import { Globe } from "./Globe"

// Example data only. Below 980px only 3 readouts show.
const meta = {
  title: "Website Sections/Globe",
  component: Globe,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Globe>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
