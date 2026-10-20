import type { Meta, StoryObj } from "@storybook/react-vite"
import { integrations } from "@/data/integrations"
import { IntegrationsStrip } from "./IntegrationsStrip"

const meta = {
  title: "Website Sections/Integrations strip",
  component: IntegrationsStrip,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof IntegrationsStrip>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
export const FewerTiles: Story = { args: { integrations: integrations.slice(0, 4) } }
