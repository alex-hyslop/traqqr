import type { Meta, StoryObj } from "@storybook/react-vite"
import { ImagePlaceholder, VideoPlaceholder } from "./Placeholders"

const meta = {
  title: "Website Components/Placeholders",
  component: VideoPlaceholder,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
} satisfies Meta<typeof VideoPlaceholder>

export default meta
type Story = StoryObj<typeof meta>

/** Hero video embed: poster area + play button until the demo video exists. */
export const Video: Story = {}
/** Text + media image slot until the product screenshots exist. */
export const Image: Story = { render: () => <ImagePlaceholder label="Screenshot coming soon" className="h-80" /> }
