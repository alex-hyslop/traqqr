import type { Meta, StoryObj } from "@storybook/react-vite"
import { homeSection } from "@/data/pages/home"
import { FeatureCards } from "./FeatureCards"

const meta = {
  title: "Website Sections/Feature cards",
  component: FeatureCards,
  parameters: { layout: "fullscreen" },
  args: homeSection("de", "cards"),
} satisfies Meta<typeof FeatureCards>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
export const HomepageEnglish: Story = { args: homeSection("en", "cards") }
