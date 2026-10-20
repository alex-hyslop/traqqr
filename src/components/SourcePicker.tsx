import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@klicktipp/traqqr-components"

// Interactive compositions live in their own .tsx so the compound parts share
// React context inside a single island — hydrate this, not the parts.
export function SourcePicker() {
  return (
    <Select defaultValue="a">
      <SelectTrigger className="w-55">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectContent>
    </Select>
  )
}
