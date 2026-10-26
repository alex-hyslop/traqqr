import type { Meta, StoryObj } from "@storybook/react-vite"
import { Faq } from "./Faq"

const meta = {
  title: "Website Sections/FAQ",
  component: Faq,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Faq>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
