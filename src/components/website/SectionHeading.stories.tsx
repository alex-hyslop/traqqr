import type { Meta, StoryObj } from "@storybook/react-vite"
import { SectionHeading } from "./SectionHeading"

const meta = {
  title: "Website Components/Section heading",
  component: SectionHeading,
  parameters: { layout: "padded" },
  argTypes: { align: { control: "inline-radio", options: ["center", "left"] } },
  args: {
    badge: "The problem",
    title: "Your pixel misses sales. Traqqr doesn't.",
    lead: "Ad blockers, cookie banners and browser limits stop the Meta Pixel from reporting every sale.",
    align: "center",
  },
} satisfies Meta<typeof SectionHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Centred: Story = {}
export const Left: Story = { args: { align: "left", title: ["Your domain. Your data.", "Fewer blocked events."] } }
export const NoBadgeOrLead: Story = { args: { badge: undefined, lead: undefined, title: "Frequently asked questions" } }
