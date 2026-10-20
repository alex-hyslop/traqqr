import type { Meta, StoryObj } from "@storybook/react-vite"
import photo from "@/assets/testimonials/dawid-przybylski.jpg"
import { assetUrl } from "@/lib/asset-url"
import { Testimonial } from "./Testimonial"

// Featured layout (photo) from lg; narrow the canvas for the Compact layout (avatar).
const meta = {
  title: "Website Sections/Testimonial",
  component: Testimonial,
  parameters: { layout: "fullscreen" },
  args: {
    quote: [
      "“Since we started using traqqr.ai, our processes",
      "run far more reliably. Errors are caught early and our team",
      "always knows exactly what to do.”",
    ],
    name: "Dawid Przybylski",
    role: "Founder & Managing Director, Visual Facilitators GmbH",
    photo: { src: assetUrl(photo) },
    avatar: { src: assetUrl(photo) },
  },
} satisfies Meta<typeof Testimonial>

export default meta
type Story = StoryObj<typeof meta>

export const Homepage: Story = {}
