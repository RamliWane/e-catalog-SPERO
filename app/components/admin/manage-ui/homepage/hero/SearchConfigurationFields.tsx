"use client"

import { Search } from "lucide-react"
import type { HeroContent } from "@/lib/home-hero-data"
import {
  ContextNote,
  EditorGroup,
  FieldWarning,
  TextField,
} from "../../ManageUIFormFields"

type SearchConfigurationFieldsProps = {
  content: HeroContent
  onChange: (patch: Partial<HeroContent>) => void
}

export default function SearchConfigurationFields({
  content,
  onChange,
}: SearchConfigurationFieldsProps) {
  return (
    <EditorGroup
      title="Search Configuration"
      description="Configure the Hero search field and its accessible button label."
      icon={Search}
    >
      <div>
        <TextField
          id="hero-search-placeholder"
          label="Search Placeholder"
          value={content.searchPlaceholder}
          onChange={(value) => onChange({ searchPlaceholder: value })}
          maxLength={300}
        />
        {!content.searchPlaceholder.trim() ? (
          <FieldWarning>Search placeholder cannot be empty.</FieldWarning>
        ) : null}
      </div>

      <div>
        <TextField
          id="hero-search-button-label"
          label="Search Button Label"
          value={content.searchButtonLabel}
          onChange={(value) => onChange({ searchButtonLabel: value })}
          maxLength={80}
          hint="Used as the accessible label for the round search button."
        />
        {!content.searchButtonLabel.trim() ? (
          <FieldWarning>Search button label cannot be empty.</FieldWarning>
        ) : null}
      </div>

      <ContextNote>
        The Hero uses an inline search field instead of a separate CTA button.
        The button label is exposed to assistive technology rather than shown
        as visible text.
      </ContextNote>
    </EditorGroup>
  )
}
