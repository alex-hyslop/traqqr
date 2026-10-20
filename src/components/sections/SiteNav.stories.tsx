import type { Meta, StoryObj } from "@storybook/react-vite"
import { SiteNav } from "./SiteNav"

// Desktop (lg+): floating glass bar with the dropdowns. Narrow the canvas below 1024px for the
// mobile states: the app's top bar, the floating bar once scrolled, and the menu Sheet.
const meta = {
  title: "Website Sections/Site nav",
  component: SiteNav,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="min-h-[200vh]">
        <Story />
        <p className="px-6 pt-40 font-mono text-sm text-muted-foreground">Scroll past 80px to see the scrolled state.</p>
      </div>
    ),
  ],
} satisfies Meta<typeof SiteNav>

export default meta
type Story = StoryObj<typeof meta>

export const Top: Story = {}
export const Scrolled: Story = { args: { scrolled: true } }
