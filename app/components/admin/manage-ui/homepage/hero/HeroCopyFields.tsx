"use client"

import { Type } from "lucide-react"
import type { HeroContent } from "@/lib/home-hero-data"
import {
  EditorGroup,
  FieldWarning,
  TextAreaField,
  TextField,
} from "../../ManageUIFormFields"

type HeroCopyFieldsProps = {
  content: HeroContent
  onChange: (patch: Partial<HeroContent>) => void
}

export default function HeroCopyFields({
  content,
  onChange,
}: HeroCopyFieldsProps) {
  return (
    <EditorGroup
      title="Hero Copy"
      description="The headline and supporting copy shown in the public Hero."
      icon={Type}
    >
      <TextField
        id="hero-eyebrow"
        label="Eyebrow Text"
        value={content.eyebrow}
        onChange={(value) => onChange({ eyebrow: value })}
        maxLength={200}
        hint="Small uppercase label above the main heading."
      />

      <div>
        <TextAreaField
          id="hero-heading"
          label="Main Heading"
          value={content.heading}
          onChange={(value) => onChange({ heading: value })}
          rows={2}
          maxLength={300}
          hint="Keep the headline concise so it stays readable on smaller screens."
        />
        {!content.heading.trim() ? (
          <FieldWarning>
            Main heading is empty. Add a headline before saving.
          </FieldWarning>
        ) : null}
      </div>

      <div>
        <TextAreaField
          id="hero-description"
          label="Description"
          value={content.description}
          onChange={(value) => onChange({ description: value })}
          rows={3}
          maxLength={2000}
        />
        {!content.description.trim() ? (
          <FieldWarning>
            Description is empty. The public Hero will show only the headline.
          </FieldWarning>
        ) : null}
      </div>
    </EditorGroup>
  )
}
