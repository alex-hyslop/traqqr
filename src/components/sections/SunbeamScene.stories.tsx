import type { Meta, StoryObj } from "@storybook/react-vite"
import { SunbeamScene } from "./SunbeamScene"

// Scroll the canvas: the video scrubs and the tracker card follows. Video files come from public/media.
const meta = {
  title: "Website Sections/Sunbeam scene",
  component: SunbeamScene,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SunbeamScene>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
