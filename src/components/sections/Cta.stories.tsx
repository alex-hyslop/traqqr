import type { Meta, StoryObj } from "@storybook/react-vite"
import { Cta } from "./Cta"

const meta = {
  title: "Website Sections/CTA",
  component: Cta,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Cta>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
