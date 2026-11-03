import type { Meta, StoryObj } from "@storybook/react-vite"
import { homeSection } from "@/data/pages/home"
import { Stats } from "./Stats"

const meta = {
  title: "Website Sections/Stats",
  component: Stats,
  parameters: { layout: "fullscreen" },
  args: homeSection("de", "stats"),
} satisfies Meta<typeof Stats>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
export const HomepageEnglish: Story = { args: homeSection("en", "stats") }
