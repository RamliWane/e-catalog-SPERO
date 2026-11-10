"use client"

import { SlidersHorizontal } from "lucide-react"
import type { HeroContent } from "@/lib/home-hero-data"
import {
  ContextNote,
  EditorGroup,
  ToggleField,
} from "../../ManageUIFormFields"

type HeroDisplaySettingsProps = {
  content: HeroContent
  onChange: (patch: Partial<HeroContent>) => void
}

export default function HeroDisplaySettings({
  content,
  onChange,
}: HeroDisplaySettingsProps) {
  return (
    <EditorGroup
      title="Display Settings"
      description="Control which Hero elements appear on the public homepage."
      icon={SlidersHorizontal}
    >
      <ToggleField
        id="hero-show-popular-tags"
        label="Show popular search tags"
        description="Displays the tag list below the search field."
        checked={content.showPopularTags}
        onChange={(checked) => onChange({ showPopularTags: checked })}
      />

      <ToggleField
        id="hero-show-floating-cards"
        label="Show floating service cards"
        description="Displays the four service cards around the Hero visual."
        checked={content.showFloatingCards}
        onChange={(checked) => onChange({ showFloatingCards: checked })}
      />

      <ContextNote>
        Use the Homepage Sections list to hide the entire Hero section. These
        settings only control the visual and content blocks inside the Hero.
      </ContextNote>
    </EditorGroup>
  )
}
