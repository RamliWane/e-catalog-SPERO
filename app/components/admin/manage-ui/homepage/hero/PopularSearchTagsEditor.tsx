"use client"

import { ArrowDown, ArrowUp, Plus, Tags, Trash2 } from "lucide-react"
import {
  createHeroTagId,
  type HeroTag,
} from "@/lib/home-hero-data"
import {
  ContextNote,
  EditorGroup,
  FieldWarning,
  TextField,
} from "../../ManageUIFormFields"

type PopularSearchTagsEditorProps = {
  tags: HeroTag[]
  onChange: (tags: HeroTag[]) => void
}

const MAX_TAGS = 20

export default function PopularSearchTagsEditor({
  tags,
  onChange,
}: PopularSearchTagsEditorProps) {
  const labelCounts = new Map<string, number>()

  for (const tag of tags) {
    const key = tag.label.trim().toLowerCase()
    if (key) {
      labelCounts.set(key, (labelCounts.get(key) ?? 0) + 1)
    }
  }

  function updateTag(index: number, patch: Partial<HeroTag>) {
    onChange(
      tags.map((tag, tagIndex) =>
        tagIndex === index ? { ...tag, ...patch } : tag,
      ),
    )
  }

  function moveTag(index: number, direction: -1 | 1) {
    const targetIndex = index + direction

    if (targetIndex < 0 || targetIndex >= tags.length) {
      return
    }

    const nextTags = [...tags]
    const moved = nextTags[index]
    nextTags[index] = nextTags[targetIndex]
    nextTags[targetIndex] = moved
    onChange(nextTags)
  }

  function removeTag(index: number) {
    onChange(tags.filter((_, tagIndex) => tagIndex !== index))
  }

  function addTag() {
    if (tags.length >= MAX_TAGS) {
      return
    }

    onChange([...tags, { id: createHeroTagId(), label: "" }])
  }

  return (
    <EditorGroup
      title="Popular Search Tags"
      description="These tags appear below the Hero search bar."
      icon={Tags}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-medium text-[#7A8CA8]">
          {tags.length} of {MAX_TAGS} tags
        </p>
        <button
          type="button"
          onClick={addTag}
          disabled={tags.length >= MAX_TAGS}
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#DDE7F8] bg-white px-2.5 text-[11px] font-medium text-[#183B56] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={12} aria-hidden="true" />
          Add Tag
        </button>
      </div>

      {tags.length === 0 ? (
        <ContextNote>
          No popular search tags are configured. Add a tag or hide the tag block
          in display settings.
        </ContextNote>
      ) : (
        <div className="space-y-2.5">
          {tags.map((tag, index) => {
            const labelKey = tag.label.trim().toLowerCase()
            const isDuplicate =
              Boolean(labelKey) && (labelCounts.get(labelKey) ?? 0) > 1

            return (
              <div
                key={tag.id}
                className="rounded-lg border border-[#DDE7F8] bg-white p-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#F1F5F9] text-[9px] font-semibold text-[#526786]">
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <TextField
                      id={`hero-tag-${tag.id}`}
                      label={`Tag ${index + 1}`}
                      value={tag.label}
                      onChange={(value) =>
                        updateTag(index, { label: value })
                      }
                      maxLength={80}
                    />
                    {!tag.label.trim() ? (
                      <FieldWarning>
                        Tag label cannot be empty.
                      </FieldWarning>
                    ) : null}
                    {isDuplicate ? (
                      <FieldWarning>
                        This tag is duplicated. Use a unique label.
                      </FieldWarning>
                    ) : null}
                  </div>

                  <div className="mt-[22px] flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveTag(index, -1)}
                      disabled={index === 0}
                      aria-label={`Move ${tag.label || `tag ${index + 1}`} up`}
                      title="Move Up"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#DDE7F8] bg-white text-[#526786] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowUp size={12} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveTag(index, 1)}
                      disabled={index === tags.length - 1}
                      aria-label={`Move ${tag.label || `tag ${index + 1}`} down`}
                      title="Move Down"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#DDE7F8] bg-white text-[#526786] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowDown size={12} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      aria-label={`Remove ${tag.label || `tag ${index + 1}`}`}
                      title="Remove Tag"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#FECDD3] bg-white text-[#BE123C] transition-colors hover:bg-[#FFF1F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] focus-visible:ring-offset-2"
                    >
                      <Trash2 size={12} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ContextNote>
        Tag IDs are kept stable while you edit, reorder, or remove tags. Each
        label must be unique.
      </ContextNote>
    </EditorGroup>
  )
}
