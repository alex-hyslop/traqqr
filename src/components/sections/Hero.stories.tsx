import type { Meta, StoryObj } from "@storybook/react-vite"
import poster from "@/assets/hero/hero-video-poster.jpg"
import { assetUrl } from "@/lib/asset-url"
import { Hero } from "./Hero"

const meta = {
  title: "Website Sections/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

/** With Kev's "A Tracking Revolution" thumbnail as the video poster. */
export const Homepage: Story = { args: { poster: { src: assetUrl(poster) } } }
/** Before a thumbnail exists: the muted placeholder with the play button. */
export const NoPoster: Story = {}
