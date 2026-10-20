import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextMedia } from "./TextMedia"

const meta = {
  title: "Website Sections/Text + media",
  component: TextMedia,
  parameters: { layout: "fullscreen" },
  argTypes: {
    mediaSide: { control: "inline-radio", options: ["right", "left"] },
  },
  args: {
    badge: "Live Feed",
    title: "See every event the moment it happens.",
    body: "Watch visits, leads and sales arrive in real time, and check exactly what reached Meta from the browser and from your server.",
    items: [
      "Live feed of every event",
      "Browser vs. server delivery",
      "Deduplication at a glance",
      "Fingerprint coverage per site",
      "Event Inspector for debugging",
    ],
    mediaSide: "right",
    grid: true,
    borderTop: false,
  },
} satisfies Meta<typeof TextMedia>

export default meta
type Story = StoryObj<typeof meta>

export const MediaRight: Story = {}
export const MediaLeft: Story = {
  args: {
    badge: "First-party reverse proxy",
    title: ["Your domain. Your data.", "Fewer blocked events."],
    body: "Route tracking through your own subdomain with Cloudflare, so ad blockers treat it like the rest of your site.",
    items: [
      "Runs on your own domain",
      "Set up with Cloudflare",
      "Up to 4 proxy domains per site",
      "Falls back safely if you switch it off",
    ],
    mediaSide: "left",
    borderTop: true,
  },
}
export const NoSecondaryButton: Story = { args: { secondary: null, grid: false } }
