import type { Meta, StoryObj } from "@storybook/react-vite"
import { CtaButtons } from "./CtaButtons"

const meta = {
  title: "Website Components/CTA buttons",
  component: CtaButtons,
  parameters: { layout: "padded" },
} satisfies Meta<typeof CtaButtons>

export default meta
type Story = StoryObj<typeof meta>

/** Text + media: arrow + "Watch demo"; stacks full width below md. */
export const Default: Story = {}
export const Hero: Story = { args: { secondary: { label: "Watch demo · 2 min", play: true } } }
/** CTA card: no arrow, side by side on mobile too. */
export const CtaCard: Story = { args: { arrow: false, stackOnMobile: false } }
export const PrimaryOnly: Story = { args: { secondary: null } }
