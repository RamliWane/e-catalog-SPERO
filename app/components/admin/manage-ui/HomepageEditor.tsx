"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Info, RotateCcw, X } from "lucide-react"
import HomepageSectionEditor from "./HomepageSectionEditor"
import HomepageSectionList from "./HomepageSectionList"
import ManageUIConfirmDialog from "./ManageUIConfirmDialog"
import {
  cloneHomepageState,
  createInitialHomepageState,
  DEFAULT_HOMEPAGE_STATE,
  HOMEPAGE_SECTION_META,
  type HomepageEditorState,
  type HomepageSectionId,
} from "./manage-ui-data"

type Feedback = {
  tone: "success" | "info"
  message: string
}

const DEFAULT_STATE_SERIALIZED = JSON.stringify(DEFAULT_HOMEPAGE_STATE)

function FeedbackBanner({
  feedback,
  onDismiss,
}: {
  feedback: Feedback
  onDismiss: () => void
}) {
  const isSuccess = feedback.tone === "success"

  return (
    <div
      role="status"
      className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-[11px] leading-5 ${
        isSuccess
          ? "border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]"
          : "border-[#DDE7F8] bg-[#F8FAFC] text-[#526786]"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
      ) : (
        <Info size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
      )}
      <p className="flex-1">{feedback.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss message"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF]"
      >
        <X size={13} aria-hidden="true" />
      </button>
    </div>
  )
}

export default function HomepageEditor() {
  const [state, setState] = useState<HomepageEditorState>(() =>
    createInitialHomepageState(),
  )
  const [baseline, setBaseline] = useState<HomepageEditorState>(() =>
    createInitialHomepageState(),
  )
  const [selectedId, setSelectedId] = useState<HomepageSectionId>("hero")
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  useEffect(() => {
    if (!feedback) {
      return
    }

    const timeout = window.setTimeout(() => {
      setFeedback(null)
    }, 4500)

    return () => window.clearTimeout(timeout)
  }, [feedback])

  const isDirty = JSON.stringify(state) !== JSON.stringify(baseline)
  const isAtDefault = JSON.stringify(state) === DEFAULT_STATE_SERIALIZED
  const selectedMeta = HOMEPAGE_SECTION_META.find(
    (section) => section.id === selectedId,
  )
  const isSectionDirty =
    JSON.stringify(state.content[selectedId]) !==
      JSON.stringify(baseline.content[selectedId]) ||
    state.visibility[selectedId] !== baseline.visibility[selectedId]
  const modifiedSectionIds = state.order.filter(
    (id) =>
      JSON.stringify(state.content[id]) !==
        JSON.stringify(baseline.content[id]) ||
      state.visibility[id] !== baseline.visibility[id],
  )

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

  function handleSave() {
    if (!isDirty) {
      return
    }

    setBaseline(cloneHomepageState(state))
    setFeedback({
      tone: "success",
      message:
        "Homepage changes saved to this local browser session. No data was sent to a server.",
    })
  }

  function handleReset() {
    setState(createInitialHomepageState())
    setSelectedId("hero")
    setIsResetDialogOpen(false)
    setFeedback({
      tone: "info",
      message:
        "Homepage reset to the default data. Select Save Changes to keep it in this session.",
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
                {isDirty ? "Unsaved changes" : "Saved locally"}
              </span>
            </div>
            <p className="mt-1 text-[11px] leading-4 text-[#526786]">
              Select a section and edit its content. Changes stay in this
              browser session.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsResetDialogOpen(true)}
              disabled={isAtDefault}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE7F8] bg-white px-3 text-[12px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw size={14} aria-hidden="true" />
              Reset to Default
            </button>
          </div>
        </div>

        {feedback ? (
          <div className="border-t border-[#DDE7F8] px-4 py-3 sm:px-5">
            <FeedbackBanner
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
            isDirty={isDirty}
            isSectionDirty={isSectionDirty}
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
