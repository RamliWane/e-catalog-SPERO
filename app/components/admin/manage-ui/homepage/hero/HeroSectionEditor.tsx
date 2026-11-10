"use client"

import type { HeroContent } from "@/lib/home-hero-data"
import { ContextNote } from "../../ManageUIFormFields"
import FloatingServiceCardsEditor from "./FloatingServiceCardsEditor"
import HeroCopyFields from "./HeroCopyFields"
import HeroDisplaySettings from "./HeroDisplaySettings"
import HeroVisualFields from "./HeroVisualFields"
import PopularSearchTagsEditor from "./PopularSearchTagsEditor"
import SearchConfigurationFields from "./SearchConfigurationFields"

type HeroSectionEditorProps = {
  content: HeroContent
  onChange: (content: HeroContent) => void
}

export default function HeroSectionEditor({
  content,
  onChange,
}: HeroSectionEditorProps) {
  function update(patch: Partial<HeroContent>) {
    onChange({
      ...content,
      ...patch,
    })
  }

  return (
    <div className="space-y-5">
      <ContextNote>
        Saving the Hero section writes its content to the database and updates
        the public homepage. Other homepage sections still stay in this browser
        session.
      </ContextNote>

      <HeroCopyFields content={content} onChange={update} />

      <SearchConfigurationFields content={content} onChange={update} />

      <HeroVisualFields content={content} onChange={update} />

      <PopularSearchTagsEditor
        tags={content.popularTags}
        onChange={(popularTags) => update({ popularTags })}
      />

      <FloatingServiceCardsEditor
        cards={content.floatingCards}
        onChange={(floatingCards) => update({ floatingCards })}
      />

      <HeroDisplaySettings content={content} onChange={update} />
    </div>
  )
}
