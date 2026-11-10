import { and, eq, sql } from "drizzle-orm"
import { cacheLife, cacheTag } from "next/cache"
import { pages, pageSections } from "@/drizzle/schema"
import {
  cloneHeroContent,
  DEFAULT_HERO_CONTENT,
  normalizeHeroContent,
  type HeroContent,
} from "@/lib/home-hero-data"

export const HOMEPAGE_HERO_CACHE_TAG = "homepage-hero"

const HOMEPAGE_SLUG = "homepage"
const HERO_SECTION_KEY = "hero"
const HERO_SECTION_TITLE = "Hero Section"

export type HomepageHeroRecord = {
  content: HeroContent
  isVisible: boolean
  persisted: boolean
  updatedAt: string | null
}

async function getDb() {
  if (!process.env.DATABASE_URL) {
    return null
  }

  const { db } = await import("@/lib/db")
  return db
}

function createDefaultRecord(): HomepageHeroRecord {
  return {
    content: cloneHeroContent(DEFAULT_HERO_CONTENT),
    isVisible: true,
    persisted: false,
    updatedAt: null,
  }
}

async function readHomepageHero(): Promise<HomepageHeroRecord> {
  const db = await getDb()

  if (!db) {
    return createDefaultRecord()
  }

  try {
    const [row] = await db
      .select({
        sectionId: pageSections.id,
        content: pageSections.content,
        isVisible: pageSections.isVisible,
        updatedAt: pageSections.updatedAt,
      })
      .from(pages)
      .leftJoin(
        pageSections,
        and(
          eq(pageSections.pageId, pages.id),
          eq(pageSections.sectionKey, HERO_SECTION_KEY),
        ),
      )
      .where(eq(pages.slug, HOMEPAGE_SLUG))
      .limit(1)

    if (!row?.sectionId) {
      return createDefaultRecord()
    }

    return {
      content: normalizeHeroContent(row.content),
      isVisible: row.isVisible !== 0,
      persisted: true,
      updatedAt: row.updatedAt ?? null,
    }
  } catch {
    return createDefaultRecord()
  }
}

export async function getHomepageHero(): Promise<HomepageHeroRecord> {
  "use cache"
  cacheTag(HOMEPAGE_HERO_CACHE_TAG)
  cacheLife("minutes")

  return readHomepageHero()
}

export async function saveHomepageHeroRecord(
  content: HeroContent,
  isVisible: boolean,
): Promise<HomepageHeroRecord> {
  const db = await getDb()

  if (!db) {
    throw new Error("Database is not configured.")
  }

  const savedAt = new Date().toISOString()

  await db.transaction(async (tx) => {
    await tx
      .insert(pages)
      .values({
        name: "Homepage",
        slug: HOMEPAGE_SLUG,
        description: "Homepage content.",
        status: "published",
      })
      .onDuplicateKeyUpdate({
        set: {
          name: "Homepage",
        },
      })

    const [page] = await tx
      .select({ id: pages.id })
      .from(pages)
      .where(eq(pages.slug, HOMEPAGE_SLUG))
      .limit(1)

    if (!page) {
      throw new Error("Homepage page record could not be created.")
    }

    await tx
      .insert(pageSections)
      .values({
        pageId: page.id,
        sectionKey: HERO_SECTION_KEY,
        title: HERO_SECTION_TITLE,
        content,
        isVisible: isVisible ? 1 : 0,
        sortOrder: 0,
      })
      .onDuplicateKeyUpdate({
        set: {
          title: HERO_SECTION_TITLE,
          content,
          isVisible: isVisible ? 1 : 0,
          sortOrder: 0,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
  })

  return {
    content: cloneHeroContent(content),
    isVisible,
    persisted: true,
    updatedAt: savedAt,
  }
}
