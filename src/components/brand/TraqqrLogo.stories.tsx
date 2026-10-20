import type { Meta, StoryObj } from "@storybook/react-vite"
import { TraqqrLogo } from "./TraqqrLogo"

const meta = {
  title: "Website Components/Traqqr logo",
  component: TraqqrLogo,
  parameters: { layout: "padded" },
} satisfies Meta<typeof TraqqrLogo>

export default meta
type Story = StoryObj<typeof meta>

/** Desktop nav (32px). */
export const Nav: Story = {}
/** Mobile bar (36.4px, Brand / Traqqr 137×36). */
export const MobileBar: Story = { args: { height: 36.4 } }
/** Footer (40.8px). */
export const Footer: Story = { args: { height: 40.826 } }
