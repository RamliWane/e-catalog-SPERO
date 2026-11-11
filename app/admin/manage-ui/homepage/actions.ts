"use server"

import { updateTag } from "next/cache"
import {
  validateBrowseEditorInput,
  type BrowseContent,
} from "@/lib/home-browse-data"
import { validateHeroEditorInput, type HeroContent } from "@/lib/home-hero-data"
import {
  HOMEPAGE_BROWSE_CACHE_TAG,
  saveHomepageBrowseRecord,
} from "@/lib/homepage-browse"
import {
  HOMEPAGE_HERO_CACHE_TAG,
  saveHomepageHeroRecord,
} from "@/lib/homepage-hero"

export type SaveHomepageHeroResult =
  | {
      ok: true
      content: HeroContent
      isVisible: boolean
      savedAt: string
    }
  | {
      ok: false
      message: string
      errors: string[]
    }

export async function saveHomepageHero(
  input: unknown,
): Promise<SaveHomepageHeroResult> {
  const result = validateHeroEditorInput(input)

  if (!result.ok) {
    return {
      ok: false,
      message: "Review the highlighted Hero fields before saving.",
      errors: result.errors,
    }
  }

  try {
    const saved = await saveHomepageHeroRecord(result.content, result.isVisible)

    updateTag(HOMEPAGE_HERO_CACHE_TAG)

    return {
      ok: true,
      content: saved.content,
      isVisible: saved.isVisible,
      savedAt: saved.updatedAt ?? new Date().toISOString(),
    }
  } catch {
    return {
      ok: false,
      message:
        "The Hero section could not be saved to the database. Please try again.",
      errors: [],
    }
  }
}

export type SaveHomepageBrowseResult =
  | {
      ok: true
      content: BrowseContent
      isVisible: boolean
      savedAt: string
    }
  | {
      ok: false
      message: string
      errors: string[]
    }

export async function saveHomepageBrowse(
  input: unknown,
): Promise<SaveHomepageBrowseResult> {
  const result = validateBrowseEditorInput(input)

  if (!result.ok) {
    return {
      ok: false,
      message: "Review the highlighted Browse by Category fields before saving.",
      errors: result.errors,
    }
  }

  try {
    const saved = await saveHomepageBrowseRecord(
      result.content,
      result.isVisible,
    )

    updateTag(HOMEPAGE_BROWSE_CACHE_TAG)

    return {
      ok: true,
      content: saved.content,
      isVisible: saved.isVisible,
      savedAt: saved.updatedAt ?? new Date().toISOString(),
    }
  } catch {
    return {
      ok: false,
      message:
        "The Browse by Category section could not be saved to the database. Please try again.",
      errors: [],
    }
  }
}
