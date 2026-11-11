import {
  saveHomepageBrowse,
  saveHomepageHero,
} from "@/app/admin/manage-ui/homepage/actions"
import { cloneBrowseContent, type BrowseContent } from "@/lib/home-browse-data"
import { cloneHeroContent, type HeroContent } from "@/lib/home-hero-data"
import type { HomepageEditorState } from "../manage-ui-data"

type PersistedSectionId = "hero" | "browse"

type HomepageFeedback = {
  tone: "success" | "info" | "error"
  message: string
}

type SavePersistedHomepageSectionOptions = {
  sectionId: PersistedSectionId
  state: HomepageEditorState
  isSectionDirty: boolean
  isSaving: boolean
  onSavingChange: (isSaving: boolean) => void
  onFeedback: (feedback: HomepageFeedback | null) => void
  onSaved: (
    id: PersistedSectionId,
    content: HeroContent | BrowseContent,
    isVisible: boolean,
  ) => void
}

function formatError(result: { message: string; errors: string[] }) {
  const detail =
    result.errors.length > 0 ? ` ${result.errors.join(" ")}` : ""

  return `${result.message}${detail}`
}

export async function savePersistedHomepageSection({
  sectionId,
  state,
  isSectionDirty,
  isSaving,
  onSavingChange,
  onFeedback,
  onSaved,
}: SavePersistedHomepageSectionOptions) {
  if (!isSectionDirty || isSaving) {
    return
  }

  onSavingChange(true)
  onFeedback(null)

  try {
    if (sectionId === "hero") {
      const result = await saveHomepageHero({
        content: state.content.hero,
        isVisible: state.visibility.hero === "Visible",
      })

      if (!result.ok) {
        onFeedback({ tone: "error", message: formatError(result) })
        return
      }

      onSaved("hero", cloneHeroContent(result.content), result.isVisible)
      onFeedback({
        tone: "success",
        message:
          "Hero section saved to the database. The public homepage will use the new content.",
      })
      return
    }

    const result = await saveHomepageBrowse({
      content: state.content.browse,
      isVisible: state.visibility.browse === "Visible",
    })

    if (!result.ok) {
      onFeedback({ tone: "error", message: formatError(result) })
      return
    }

    onSaved("browse", cloneBrowseContent(result.content), result.isVisible)
    onFeedback({
      tone: "success",
      message:
        "Browse by Category saved to the database. The public homepage will use the new content.",
    })
  } catch {
    onFeedback({
      tone: "error",
      message: `${
        sectionId === "hero" ? "Hero" : "Browse by Category"
      } could not be saved. Check the connection and try again.`,
    })
  } finally {
    onSavingChange(false)
  }
}
