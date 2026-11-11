"use client"

import { useEffect, useState } from "react"
import { RotateCcw } from "lucide-react"
import {
  cloneBrowseContent,
  type BrowseContent,
} from "@/lib/home-browse-data"
import { cloneHeroContent, type HeroContent } from "@/lib/home-hero-data"
import HomepageEditorFeedback, {
  type HomepageFeedback,
} from "./homepage/HomepageEditorFeedback"
import { savePersistedHomepageSection } from "./homepage/savePersistedHomepageSection"
import HomepageSectionEditor from "./HomepageSectionEditor"
import HomepageSectionList from "./HomepageSectionList"
import ManageUIConfirmDialog from "./ManageUIConfirmDialog"
import {
  cloneHomepageState,
  createInitialHomepageState,
  DEFAULT_HOMEPAGE_STATE,
  HOMEPAGE_SECTION_META,
  type HomepageContentMap,
  type HomepageEditorState,
  type HomepageSectionId,
} from "./manage-ui-data"

type HomepageEditorProps = {
  initialHero: HeroContent
  initialHeroVisible: boolean
  initialBrowse: BrowseContent
  initialBrowseVisible: boolean
}

const DEFAULT_STATE_SERIALIZED = JSON.stringify(DEFAULT_HOMEPAGE_STATE)

function createEditorState({
  hero,
  heroVisible,
  browse,
  browseVisible,
}: {
  hero: HeroContent
  heroVisible: boolean
  browse: BrowseContent
  browseVisible: boolean
}): HomepageEditorState {
  const state = createInitialHomepageState()

  state.content.hero = cloneHeroContent(hero)
  state.visibility.hero = heroVisible ? "Visible" : "Hidden"
  state.content.browse = cloneBrowseContent(browse)
  state.visibility.browse = browseVisible ? "Visible" : "Hidden"

  return state
}

export default function HomepageEditor({
  initialHero,
  initialHeroVisible,
  initialBrowse,
  initialBrowseVisible,
}: HomepageEditorProps) {
  const buildInitialState = () =>
    createEditorState({
      hero: initialHero, heroVisible: initialHeroVisible,
      browse: initialBrowse, browseVisible: initialBrowseVisible,
    })
  const [state, setState] = useState<HomepageEditorState>(buildInitialState)
  const [baseline, setBaseline] = useState<HomepageEditorState>(buildInitialState)
  const [selectedId, setSelectedId] = useState<HomepageSectionId>("hero")
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [feedback, setFeedback] = useState<HomepageFeedback | null>(null)

  useEffect(() => {
    if (!feedback) return
    const timeout = window.setTimeout(() => setFeedback(null), 4500)
    return () => window.clearTimeout(timeout)
  }, [feedback])

  const isDirty = JSON.stringify(state) !== JSON.stringify(baseline)
  const isAtDefault = JSON.stringify(state) === DEFAULT_STATE_SERIALIZED
  const selectedMeta = HOMEPAGE_SECTION_META.find(
    (section) => section.id === selectedId,
  )
  const sectionChanged = (id: HomepageSectionId) =>
    JSON.stringify(state.content[id]) !== JSON.stringify(baseline.content[id]) ||
    state.visibility[id] !== baseline.visibility[id]
  const isSectionDirty = sectionChanged(selectedId)
  const modifiedSectionIds = state.order.filter(sectionChanged)

  function handleMove(id: HomepageSectionId, direction: -1 | 1) {
    const currentIndex = state.order.indexOf(id)
    const targetIndex = currentIndex + direction

    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= state.order.length) {
      return
    }

    const nextOrder = [...state.order]
    const movedSection = nextOrder[currentIndex]
    nextOrder[currentIndex] = nextOrder[targetIndex]
    nextOrder[targetIndex] = movedSection

    setState({
      ...state,
      order: nextOrder,
    })
  }

  function handleToggleVisibility(id: HomepageSectionId) {
    setState({
      ...state,
      visibility: {
        ...state.visibility,
        [id]: state.visibility[id] === "Visible" ? "Hidden" : "Visible",
      },
    })
  }

  function handleDiscardSection() {
    const baselineClone = cloneHomepageState(baseline)

    setState({
      ...state,
      content: {
        ...state.content,
        [selectedId]: baselineClone.content[selectedId],
      },
      visibility: {
        ...state.visibility,
        [selectedId]: baselineClone.visibility[selectedId],
      },
    })

    setFeedback({
      tone: "info",
      message: `Changes to ${selectedMeta?.name ?? "this section"} were discarded.`,
    })
  }

  function applyPersistedSection(
    id: "hero" | "browse",
    content: HeroContent | BrowseContent,
    isVisible: boolean,
  ) {
    const nextVisibility = isVisible ? "Visible" : "Hidden"
    const update = (current: HomepageEditorState): HomepageEditorState => ({
      ...current,
      content: {
        ...current.content,
        [id]: content,
      } as HomepageContentMap,
      visibility: {
        ...current.visibility,
        [id]: nextVisibility,
      },
    })

    setState(update)
    setBaseline(update)
  }

  async function handleSave() {
    if (!isSectionDirty || isSaving) {
      return
    }

    if (selectedId === "hero" || selectedId === "browse") {
      await savePersistedHomepageSection({
        sectionId: selectedId,
        state,
        isSectionDirty,
        isSaving,
        onSavingChange: setIsSaving,
        onFeedback: setFeedback,
        onSaved: applyPersistedSection,
      })
      return
    }

    setBaseline((currentBaseline) => ({
      ...currentBaseline,
      content: {
        ...currentBaseline.content,
        [selectedId]: JSON.parse(
          JSON.stringify(state.content[selectedId]),
        ) as HomepageEditorState["content"][HomepageSectionId],
      },
      visibility: {
        ...currentBaseline.visibility,
        [selectedId]: state.visibility[selectedId],
      },
    }))
    setFeedback({
      tone: "success",
      message: `${selectedMeta?.name ?? "Section"} saved to this browser session.`,
    })
  }

  function handleReset() {
    setState(createInitialHomepageState())
    setSelectedId("hero")
    setIsResetDialogOpen(false)
    setFeedback({
      tone: "info",
      message:
        "Homepage reset to the default data. Save Hero or Browse by Category to write the defaults to the database.",
    })
  }

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-[#DDE7F8] bg-white shadow-[0_2px_8px_rgba(20,33,61,0.04)]">
        <div className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[14px] font-semibold tracking-tight text-[#14213D]">
                Homepage Content
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                  isDirty
                    ? "bg-[#FFF7ED] text-[#C2410C]"
                    : "bg-[#ECFDF5] text-[#047857]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    isDirty ? "bg-[#F97316]" : "bg-[#10B981]"
                  }`}
                />
                {isDirty ? "Unsaved changes" : "All changes saved"}
              </span>
            </div>
            <p className="mt-1 text-[11px] leading-4 text-[#526786]">
              Hero and Browse by Category are saved to the database. Other
              sections stay in this browser session.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsResetDialogOpen(true)}
              disabled={isAtDefault || isSaving}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE7F8] bg-white px-3 text-[12px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw size={14} aria-hidden="true" />
              Reset to Default
            </button>
          </div>
        </div>

        {feedback ? (
          <div className="border-t border-[#DDE7F8] px-4 py-3 sm:px-5">
            <HomepageEditorFeedback
              feedback={feedback}
              onDismiss={() => setFeedback(null)}
            />
          </div>
        ) : null}
      </section>

      <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)]">
        <HomepageSectionList
          order={state.order}
          visibility={state.visibility}
          selectedId={selectedId}
          modifiedSectionIds={modifiedSectionIds}
          onSelect={setSelectedId}
          onMove={handleMove}
          onToggleVisibility={handleToggleVisibility}
        />

        <div className="min-w-0 space-y-4">
          <HomepageSectionEditor
            sectionId={selectedId}
            state={state}
            isSectionDirty={isSectionDirty}
            isSaving={isSaving}
            onStateChange={setState}
            onDiscardSection={handleDiscardSection}
            onSave={handleSave}
          />
        </div>
      </div>

      {isResetDialogOpen ? (
        <ManageUIConfirmDialog
          onClose={() => setIsResetDialogOpen(false)}
          onConfirm={handleReset}
        />
      ) : null}
    </div>
  )
}
