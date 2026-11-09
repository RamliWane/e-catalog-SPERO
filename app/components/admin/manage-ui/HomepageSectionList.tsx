"use client"

import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
} from "lucide-react"
import {
  HOMEPAGE_SECTION_META,
  type HomepageSectionId,
  type HomepageVisibility,
} from "./manage-ui-data"

type HomepageSectionListProps = {
  order: HomepageSectionId[]
  visibility: Record<HomepageSectionId, HomepageVisibility>
  selectedId: HomepageSectionId
  modifiedSectionIds: HomepageSectionId[]
  onSelect: (id: HomepageSectionId) => void
  onMove: (id: HomepageSectionId, direction: -1 | 1) => void
  onToggleVisibility: (id: HomepageSectionId) => void
}

const SECTION_META_BY_ID = new Map(
  HOMEPAGE_SECTION_META.map((section) => [section.id, section]),
)

export default function HomepageSectionList({
  order,
  visibility,
  selectedId,
  modifiedSectionIds,
  onSelect,
  onMove,
  onToggleVisibility,
}: HomepageSectionListProps) {
  return (
    <aside className="self-start rounded-xl border border-[#DDE7F8] bg-white shadow-[0_2px_8px_rgba(20,33,61,0.04)] xl:sticky xl:top-6">
      <div className="border-b border-[#DDE7F8] px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-semibold tracking-tight text-[#14213D]">
            Homepage Sections
          </h2>
          <span className="rounded-full bg-[#F5F8FF] px-2 py-0.5 text-[9px] font-semibold text-[#183B56]">
            {order.length} sections
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-4 text-[#526786]">
          Select, reorder, and control the visibility of each section.
        </p>
      </div>

      <ol className="divide-y divide-[#DDE7F8]">
        {order.map((id, index) => {
          const section = SECTION_META_BY_ID.get(id)
          if (!section) {
            return null
          }

          const isSelected = id === selectedId
          const isVisible = visibility[id] === "Visible"
          const isModified = modifiedSectionIds.includes(id)

          return (
            <li
              key={id}
              className={`relative ${
                isSelected ? "bg-[#F5F8FF]" : "bg-white"
              }`}
            >
              {isSelected ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 bg-[#3978FF]"
                />
              ) : null}

              <button
                type="button"
                aria-current={isSelected ? "true" : undefined}
                aria-label={`Select ${section.name}`}
                onClick={() => onSelect(id)}
                className="w-full px-4 pb-2.5 pt-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3978FF]"
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold ${
                      isSelected
                        ? "bg-[#14213D] text-white"
                        : "bg-[#F1F5F9] text-[#526786]"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-[12px] font-semibold text-[#14213D]">
                        {section.name}
                      </p>
                      {isModified ? (
                        <span
                          title="Unsaved section changes"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3978FF]"
                        >
                          <span className="sr-only">
                            Unsaved section changes
                          </span>
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-4 text-[#526786]">
                      {section.description}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-medium text-[#526786] ring-1 ring-[#DDE7F8]">
                        {section.typeLabel}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                          isVisible
                            ? "bg-[#EFF6FF] text-[#183B56]"
                            : "bg-[#F1F5F9] text-[#526786]"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${
                            isVisible ? "bg-[#3978FF]" : "bg-[#94A3B8]"
                          }`}
                        />
                        {visibility[id]}
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              <div className="flex items-center justify-between gap-2 px-4 pb-3">
                <button
                  type="button"
                  onClick={() => onToggleVisibility(id)}
                  aria-label={`${isVisible ? "Hide" : "Show"} ${section.name}`}
                  title={isVisible ? "Hide section" : "Show section"}
                  className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[#DDE7F8] bg-white px-2 text-[10px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
                >
                  {isVisible ? (
                    <EyeOff size={12} aria-hidden="true" />
                  ) : (
                    <Eye size={12} aria-hidden="true" />
                  )}
                  {isVisible ? "Hide" : "Show"}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onMove(id, -1)}
                    disabled={index === 0}
                    aria-label={`Move ${section.name} up`}
                    title="Move Up"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#DDE7F8] bg-white text-[#526786] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowUp size={12} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onMove(id, 1)}
                    disabled={index === order.length - 1}
                    aria-label={`Move ${section.name} down`}
                    title="Move Down"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#DDE7F8] bg-white text-[#526786] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowDown size={12} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
