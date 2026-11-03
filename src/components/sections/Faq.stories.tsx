import type { Meta, StoryObj } from "@storybook/react-vite"
import { homePages } from "@/data/pages/home"
import type { Section } from "@/data/sections"
import { Faq } from "./Faq"

const faq = homePages.en.sections.find((s): s is Extract<Section, { kind: "faq" }> => s.kind === "faq")!.props

const meta = {
  title: "Website Sections/FAQ",
  component: Faq,
  parameters: { layout: "fullscreen" },
  args: faq,
} satisfies Meta<typeof Faq>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
