import type { Meta, StoryObj } from "@storybook/react-vite"
import { homeSection } from "@/data/pages/home"
import { TrustStrip } from "./TrustStrip"

const meta = {
  title: "Website Sections/Trust strip",
  component: TrustStrip,
  parameters: { layout: "fullscreen" },
  args: homeSection("de", "trust"),
} satisfies Meta<typeof TrustStrip>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
export const HomepageEnglish: Story = { args: homeSection("en", "trust") }
