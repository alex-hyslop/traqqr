import type { Meta, StoryObj } from "@storybook/react-vite"
import poster from "@/assets/scene/poster.jpg"
import { homeSection } from "@/data/pages/home"
import { assetUrl } from "@/lib/asset-url"
import { SunbeamScene } from "./SunbeamScene"

// Scroll into the scene: it snaps to fill the canvas and plays once; one more scroll leaves it. The hint
// text follows <html lang>. Video files come from public/media.
const meta = {
  title: "Website Sections/Sunbeam scene",
  component: SunbeamScene,
  parameters: { layout: "fullscreen" },
  args: { ...homeSection("de", "scene"), poster: { src: assetUrl(poster) } },
} satisfies Meta<typeof SunbeamScene>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
