import type { Meta, StoryObj } from "@storybook/react-vite"
import { Section } from "./Section"
import { SectionHeading } from "./SectionHeading"

const meta = {
  title: "Website Components/Section",
  component: Section,
  parameters: { layout: "fullscreen" },
  argTypes: {
    width: { control: "inline-radio", options: ["content", "narrow", "hud"] },
    border: { control: "inline-radio", options: [undefined, "top", "y"] },
  },
  args: {
    width: "content",
    grid: false,
    band: false,
    children: <SectionHeading badge="Section" title="The shared section shell" lead="1152px content column, py-14 / lg:py-20." />,
    containerClassName: "flex justify-center",
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {}
export const GridBackground: Story = { args: { grid: true, border: "top" } }
export const Band: Story = { args: { band: true, border: "y" } }
