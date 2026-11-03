import type { Meta, StoryObj } from "@storybook/react-vite"
import { homeSection } from "@/data/pages/home"
import { Faq } from "./Faq"

const meta = {
  title: "Website Sections/FAQ",
  component: Faq,
  parameters: { layout: "fullscreen" },
  args: homeSection("de", "faq"),
} satisfies Meta<typeof Faq>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
