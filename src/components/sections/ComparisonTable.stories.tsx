import type { Meta, StoryObj } from "@storybook/react-vite"
import { ComparisonTable } from "./ComparisonTable"

const meta = {
  title: "Website Sections/Comparison table",
  component: ComparisonTable,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ComparisonTable>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
export const CustomRows: Story = {
  args: {
    badge: "Compared",
    title: "Tag manager vs. Traqqr",
    columns: { bad: "Tag manager", good: "Traqqr" },
    rows: [
      { label: "Setup", bad: "Days of configuration", good: "One snippet" },
      { label: "Maintenance", bad: "A developer on call", good: "None" },
    ],
  },
}
