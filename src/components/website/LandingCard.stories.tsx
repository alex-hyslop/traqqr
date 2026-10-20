import type { Meta, StoryObj } from "@storybook/react-vite"
import { LandingCard } from "./LandingCard"

const meta = {
  title: "Website Components/Landing card",
  component: LandingCard,
  parameters: { layout: "padded" },
  argTypes: { fill: { control: "inline-radio", options: ["glass", "solid"] } },
  args: {
    as: "div",
    eyebrow: "01 / TRACK",
    title: "Track every signal.",
    body: "Every visit, lead and sale, captured server-side.",
    fill: "glass",
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof LandingCard>

export default meta
type Story = StoryObj<typeof meta>

/** Over a glow (hero feature cards). */
export const Glass: Story = {}
/** On the bg-card band (How it works). */
export const Solid: Story = {
  args: { fill: "solid", eyebrow: "01 / ADD YOUR SITE", title: "Paste one snippet.", body: "Add the Traqqr snippet to your site's <head>." },
  decorators: [(Story) => <div className="bg-card p-6"><Story /></div>],
}
