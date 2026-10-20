import type { Meta, StoryObj } from "@storybook/react-vite"
import { integrations } from "@/data/integrations"
import { LogoTiles } from "./LogoTiles"

// Hover or focus a tile for its tooltip.
const meta = {
  title: "Website Components/Logo tiles",
  component: LogoTiles,
  parameters: { layout: "padded" },
  args: { integrations },
} satisfies Meta<typeof LogoTiles>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {}
export const Single: Story = { args: { integrations: integrations.slice(3, 4) } }
