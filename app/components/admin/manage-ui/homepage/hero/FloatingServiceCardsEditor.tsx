"use client"

import { LayoutGrid, RotateCcw } from "lucide-react"
import {
  DEFAULT_HERO_FLOATING_CARDS,
  type HeroFloatingCard,
} from "@/lib/home-hero-data"
import {
  ContextNote,
  EditorGroup,
  FieldWarning,
  TextAreaField,
  TextField,
  ToggleField,
} from "../../ManageUIFormFields"

type FloatingServiceCardsEditorProps = {
  cards: HeroFloatingCard[]
  onChange: (cards: HeroFloatingCard[]) => void
}

export default function FloatingServiceCardsEditor({
  cards,
  onChange,
}: FloatingServiceCardsEditorProps) {
  function updateCard(index: number, patch: Partial<HeroFloatingCard>) {
    onChange(
      cards.map((card, cardIndex) =>
        cardIndex === index ? { ...card, ...patch } : card,
      ),
    )
  }

  function resetCard(index: number) {
    const fallback = DEFAULT_HERO_FLOATING_CARDS[index]

    if (!fallback) {
      return
    }

    onChange(
      cards.map((card, cardIndex) =>
        cardIndex === index ? { ...fallback } : card,
      ),
    )
  }

  return (
    <EditorGroup
      title="Floating Service Cards"
      description="Edit the four fixed floating cards around the Hero visual."
      icon={LayoutGrid}
    >
      <ContextNote>
        The four cards keep the public Hero layout stable. You can edit their
        copy and visibility, but they cannot be added, removed, or reordered.
      </ContextNote>

      <div className="space-y-3">
        {cards.map((card, index) => {
          const fallback = DEFAULT_HERO_FLOATING_CARDS[index]

          return (
            <div
              key={card.id}
              className="rounded-lg border border-[#DDE7F8] bg-white p-3.5"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F1F5F9] text-[9px] font-semibold text-[#526786]">
                    {index + 1}
                  </span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A8CA8]">
                    Floating Card {index + 1}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => resetCard(index)}
                  disabled={!fallback}
                  className="inline-flex h-7 items-center justify-center gap-1.5 rounded-md border border-[#DDE7F8] bg-white px-2 text-[10px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RotateCcw size={11} aria-hidden="true" />
                  Reset Card
                </button>
              </div>

              <div className="space-y-3">
                <ToggleField
                  id={`hero-card-${index}-visible`}
                  label="Show this card"
                  checked={card.visible}
                  onChange={(checked) =>
                    updateCard(index, { visible: checked })
                  }
                />

                <div>
                  <TextField
                    id={`hero-card-${index}-title`}
                    label="Card Title"
                    value={card.title}
                    onChange={(value) =>
                      updateCard(index, { title: value })
                    }
                    maxLength={100}
                  />
                  {!card.title.trim() ? (
                    <FieldWarning>
                      Floating card title cannot be empty.
                    </FieldWarning>
                  ) : null}
                </div>

                <TextAreaField
                  id={`hero-card-${index}-description`}
                  label="Card Description"
                  value={card.description}
                  onChange={(value) =>
                    updateCard(index, { description: value })
                  }
                  rows={2}
                  maxLength={300}
                />
              </div>
            </div>
          )
        })}
      </div>
    </EditorGroup>
  )
}
