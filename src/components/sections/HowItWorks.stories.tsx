import type { Meta, StoryObj } from "@storybook/react-vite"
import { HowItWorks } from "./HowItWorks"

const meta = {
  title: "Website Sections/How it works",
  component: HowItWorks,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HowItWorks>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
