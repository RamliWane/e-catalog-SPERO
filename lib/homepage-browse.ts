import { and, eq, sql } from "drizzle-orm"
import { cacheLife, cacheTag } from "next/cache"
import { pages, pageSections } from "@/drizzle/schema"
import {
  cloneBrowseContent,
  DEFAULT_BROWSE_CONTENT,
  normalizeBrowseContent,
  type BrowseContent,
} from "@/lib/home-browse-data"

export const HOMEPAGE_BROWSE_CACHE_TAG = "homepage-browse"

const HOMEPAGE_SLUG = "homepage"
const BROWSE_SECTION_KEY = "browse"
const BROWSE_SECTION_TITLE = "Browse by Category Section"

export type HomepageBrowseRecord = {
  content: BrowseContent
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

function createDefaultRecord(): HomepageBrowseRecord {
  return {
    content: cloneBrowseContent(DEFAULT_BROWSE_CONTENT),
    isVisible: true,
    persisted: false,
    updatedAt: null,
  }
}

async function readHomepageBrowse(): Promise<HomepageBrowseRecord> {
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
          eq(pageSections.sectionKey, BROWSE_SECTION_KEY),
        ),
      )
      .where(eq(pages.slug, HOMEPAGE_SLUG))
      .limit(1)

    if (!row?.sectionId) {
      return createDefaultRecord()
    }

    return {
      content: normalizeBrowseContent(row.content),
      isVisible: row.isVisible !== 0,
      persisted: true,
      updatedAt: row.updatedAt ?? null,
    }
  } catch {
    return createDefaultRecord()
  }
}

export async function getHomepageBrowse(): Promise<HomepageBrowseRecord> {
  "use cache"
  cacheTag(HOMEPAGE_BROWSE_CACHE_TAG)
  cacheLife("minutes")

  return readHomepageBrowse()
}

export async function saveHomepageBrowseRecord(
  content: BrowseContent,
  isVisible: boolean,
): Promise<HomepageBrowseRecord> {
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
        sectionKey: BROWSE_SECTION_KEY,
        title: BROWSE_SECTION_TITLE,
        content,
        isVisible: isVisible ? 1 : 0,
        sortOrder: 1,
      })
      .onDuplicateKeyUpdate({
        set: {
          title: BROWSE_SECTION_TITLE,
          content,
          isVisible: isVisible ? 1 : 0,
          sortOrder: 1,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
  })

  return {
    content: cloneBrowseContent(content),
    isVisible,
    persisted: true,
    updatedAt: savedAt,
  }
}
