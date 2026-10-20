import type { Meta, StoryObj } from "@storybook/react-vite"
import { Chamfered } from "./Chamfered"

const meta = {
  title: "Website Components/Chamfered shape",
  component: Chamfered,
  parameters: { layout: "padded" },
  argTypes: { fill: { control: "inline-radio", options: ["glass", "solid", "none"] } },
  args: { cut: 24, radius: 12, accent: 96, fill: "glass", className: "h-40 max-w-md p-6", children: "Content" },
} satisfies Meta<typeof Chamfered>

export default meta
type Story = StoryObj<typeof meta>

export const Card: Story = {}
/** The hero box: 32px cut, 16px radius, 220px accents. */
export const HudFrame: Story = { args: { cut: 32, radius: 16, accent: 220, className: "h-72 max-w-3xl p-8" } }
/** Fill=Off: the outline frame around the comparison table. */
export const Outline: Story = { args: { cut: 32, radius: 16, accent: 220, fill: "none", className: "h-72 max-w-3xl p-8" } }
