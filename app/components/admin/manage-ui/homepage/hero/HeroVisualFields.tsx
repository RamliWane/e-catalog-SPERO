"use client"

import { Image as ImageIcon, RotateCcw } from "lucide-react"
import {
  DEFAULT_HERO_CONTENT,
  HERO_VISUAL_OPTIONS,
  type HeroContent,
} from "@/lib/home-hero-data"
import {
  ContextNote,
  EditorGroup,
  FieldWarning,
  SelectField,
  TextField,
  ToggleField,
} from "../../ManageUIFormFields"

type HeroVisualFieldsProps = {
  content: HeroContent
  onChange: (patch: Partial<HeroContent>) => void
}

export default function HeroVisualFields({
  content,
  onChange,
}: HeroVisualFieldsProps) {
  function resetVisual() {
    onChange({
      visualImage: DEFAULT_HERO_CONTENT.visualImage,
      visualImageAlt: DEFAULT_HERO_CONTENT.visualImageAlt,
    })
  }

  return (
    <EditorGroup
      title="Hero Visual"
      description="Choose the local visual asset and provide accessible alt text."
      icon={ImageIcon}
    >
      <ToggleField
        id="hero-show-visual"
        label="Show Hero visual"
        description="Controls the illustration column on the public homepage."
        checked={content.showVisual}
        onChange={(checked) => onChange({ showVisual: checked })}
      />

      <SelectField
        id="hero-visual-image"
        label="Hero Visual Asset"
        value={content.visualImage}
        options={HERO_VISUAL_OPTIONS}
        onChange={(value) => onChange({ visualImage: value })}
        hint="Only local assets from the public folder can be selected."
      />

      <div>
        <TextField
          id="hero-visual-image-alt"
          label="Visual Alt Text"
          value={content.visualImageAlt}
          onChange={(value) => onChange({ visualImageAlt: value })}
          maxLength={300}
          hint="Describe the visual for screen reader users."
        />
        {!content.visualImageAlt.trim() ? (
          <FieldWarning>Visual alt text cannot be empty.</FieldWarning>
        ) : null}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={resetVisual}
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#DDE7F8] bg-white px-2.5 text-[11px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
        >
          <RotateCcw size={12} aria-hidden="true" />
          Reset Visual
        </button>
      </div>

      <ContextNote>
        Image alignment, size, and object fit are not configurable because the
        public Hero uses a fixed contained layout.
      </ContextNote>
    </EditorGroup>
  )
}
