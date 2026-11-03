import type { Meta, StoryObj } from "@storybook/react-vite"
import { integrations } from "@/data/integrations"
import { homeSection } from "@/data/pages/home"
import { IntegrationsStrip } from "./IntegrationsStrip"

const meta = {
  title: "Website Sections/Integrations strip",
  component: IntegrationsStrip,
  parameters: { layout: "fullscreen" },
  args: homeSection("de", "integrations"),
} satisfies Meta<typeof IntegrationsStrip>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
export const HomepageEnglish: Story = { args: homeSection("en", "integrations") }
export const FewerTiles: Story = { args: { integrations: integrations.slice(0, 4) } }
