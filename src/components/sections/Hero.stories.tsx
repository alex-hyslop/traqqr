import type { Meta, StoryObj } from "@storybook/react-vite"
import { Hero } from "./Hero"

const meta = {
  title: "Website Sections/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
