import type { Meta, StoryObj } from "@storybook/react-vite"
import poster from "@/assets/hero/hero-video-poster.jpg"
import { homePages } from "@/data/pages/home"
import type { Section } from "@/data/sections"
import { assetUrl } from "@/lib/asset-url"
import { Hero } from "./Hero"

const heroCopy = (locale: "de" | "en") =>
  homePages[locale].sections.find((s): s is Extract<Section, { kind: "hero" }> => s.kind === "hero")!.props

const meta = {
  title: "Website Sections/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
  args: { ...heroCopy("de"), locale: "de" },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

/** With Kev's "A Tracking Revolution" thumbnail as the video poster. */
export const Homepage: Story = { args: { poster: { src: assetUrl(poster) } } }

/** The English homepage's hero. */
export const HomepageEnglish: Story = { args: { ...heroCopy("en"), locale: "en", poster: { src: assetUrl(poster) } } }

/** Before a thumbnail exists: the muted placeholder with the play button. */
export const NoPoster: Story = {}
