import type { Meta, StoryObj } from "@storybook/react-vite"

import { SourcePicker } from "./SourcePicker"

const meta = {
  title: "Site/SourcePicker",
  component: SourcePicker,
} satisfies Meta<typeof SourcePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
