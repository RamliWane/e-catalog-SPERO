import { asc, eq } from "drizzle-orm"
import { cacheLife, cacheTag } from "next/cache"
import { catalogCategories, catalogItems } from "@/drizzle/schema"
import {
  CATALOG_CATEGORY_DEFS,
  CATALOG_CATEGORY_IMAGE_FALLBACK,
  catalogSlugify,
  DEFAULT_CATALOG_IMAGE,
  formatCatalogDate,
  type CatalogAdminCategory,
  type CatalogAdminItem,
  type CatalogCategoryName,
  type CatalogMutationInput,
  type CatalogStatusValue,
} from "@/lib/catalog-admin"
import {
  getProductBySlug,
  slugify,
  type Category,
  type Product,
} from "@/lib/catalog-data"

export const CATALOG_CACHE_TAG = "catalog"

type CatalogRow = {
  id: number
  name: string
  slug: string
  shortDescription: string | null
  description: string | null
  imageUrl: string | null
  status: "draft" | "published" | "archived"
  isFeatured: number
  sortOrder: number
  createdAt: string
  updatedAt: string
  categoryId: number | null
  categoryName: string | null
}

const CATEGORY_NAMES = new Set<string>(
  CATALOG_CATEGORY_DEFS.map((category) => category.name),
)

const DEFAULT_CAPABILITIES: Record<CatalogCategoryName, string[]> = {
  "Web Development": ["Web-based", "Scalable", "Business-ready"],
  "Mobile App": ["Mobile", "Responsive", "User-focused"],
  "Cloud & DevOps": ["Cloud", "Reliable", "Scalable"],
  "UI/UX Design": ["User-centered", "Consistent", "Product-ready"],
  "Data & Analytics": ["Data-driven", "Actionable", "Insightful"],
  Others: ["Reliable", "Flexible", "Business-ready"],
}

const catalogSelection = {
  id: catalogItems.id,
  name: catalogItems.name,
  slug: catalogItems.slug,
  shortDescription: catalogItems.shortDescription,
  description: catalogItems.description,
  imageUrl: catalogItems.imageUrl,
  status: catalogItems.status,
  isFeatured: catalogItems.isFeatured,
  sortOrder: catalogItems.sortOrder,
  createdAt: catalogItems.createdAt,
  updatedAt: catalogItems.updatedAt,
  categoryId: catalogItems.categoryId,
  categoryName: catalogCategories.name,
}

function asCategory(value: string | null): Exclude<Category, "All"> {
  return value && CATEGORY_NAMES.has(value)
    ? (value as Exclude<Category, "All">)
    : "Others"
}

function mapAdminItem(row: CatalogRow): CatalogAdminItem {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    shortDescription: row.shortDescription ?? row.description ?? "",
    description: row.description ?? "",
    categoryId: row.categoryId,
    category: row.categoryName ?? "Others",
    status: row.status,
    isFeatured: row.isFeatured === 1,
    sortOrder: row.sortOrder,
    imageUrl: row.imageUrl ?? DEFAULT_CATALOG_IMAGE,
    updatedAt: formatCatalogDate(row.updatedAt),
  }
}

function toIsoDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toISOString()
}

function mapProduct(row: CatalogRow): Product {
  const category = asCategory(row.categoryName)
  const legacy = getProductBySlug(row.slug)

  return {
    id: String(row.id),
    slug: row.slug,
    name: row.name,
    category,
    description: row.description ?? row.shortDescription ?? "",
    shortDescription: row.shortDescription ?? undefined,
    capabilities: legacy?.capabilities ?? DEFAULT_CAPABILITIES[category],
    image: row.imageUrl ?? legacy?.image ?? DEFAULT_CATALOG_IMAGE,
    gallery: legacy?.gallery,
    highlights: legacy?.highlights,
    featuredOrder:
      row.sortOrder + (row.isFeatured === 1 ? 0 : 100000),
    createdAt: toIsoDate(row.createdAt),
  }
}

async function getDb() {
  if (!process.env.DATABASE_URL) {
    return null
  }

  const { db } = await import("@/lib/db")
  return db
}

export async function ensureCatalogCategories(): Promise<void> {
  const db = await getDb()
  if (!db) return

  const existing = await db
    .select({ slug: catalogCategories.slug })
    .from(catalogCategories)
  const existingSlugs = new Set(existing.map((category) => category.slug))

  const missing = CATALOG_CATEGORY_DEFS.filter(
    (category) => !existingSlugs.has(category.slug),
  )

  if (missing.length === 0) return

  await db.insert(catalogCategories).values(
    missing.map((category) => ({
      name: category.name,
      slug: category.slug,
      description: `${category.name} catalog category.`,
      isActive: 1,
      sortOrder:
        CATALOG_CATEGORY_DEFS.findIndex((entry) => entry.slug === category.slug) +
        1,
    })),
  )
}

export async function getCatalogAdminData(): Promise<{
  items: CatalogAdminItem[]
  categories: CatalogAdminCategory[]
}> {
  "use cache"
  cacheTag(CATALOG_CACHE_TAG)
  cacheLife("minutes")

  const db = await getDb()
  if (!db) return { items: [], categories: [] }

  try {
    const [categories, rows] = await Promise.all([
      db
        .select({
          id: catalogCategories.id,
          name: catalogCategories.name,
          slug: catalogCategories.slug,
        })
        .from(catalogCategories)
        .where(eq(catalogCategories.isActive, 1))
        .orderBy(asc(catalogCategories.sortOrder), asc(catalogCategories.name)),
      db
        .select(catalogSelection)
        .from(catalogItems)
        .leftJoin(
          catalogCategories,
          eq(catalogItems.categoryId, catalogCategories.id),
        )
        .orderBy(
          asc(catalogItems.sortOrder),
          asc(catalogItems.name),
          asc(catalogItems.id),
        ),
    ])

    return {
      categories,
      items: rows.map(mapAdminItem),
    }
  } catch {
    return { items: [], categories: [] }
  }
}

export async function getPublishedCatalogProducts(): Promise<Product[]> {
  "use cache"
  cacheTag(CATALOG_CACHE_TAG)
  cacheLife("minutes")

  const db = await getDb()
  if (!db) return []

  try {
    const rows = await db
      .select(catalogSelection)
      .from(catalogItems)
      .leftJoin(
        catalogCategories,
        eq(catalogItems.categoryId, catalogCategories.id),
      )
      .where(eq(catalogItems.status, "published"))
      .orderBy(
        asc(catalogItems.sortOrder),
        asc(catalogItems.name),
        asc(catalogItems.id),
      )

    return rows.map(mapProduct)
  } catch {
    return []
  }
}

export async function getPublishedCatalogProductBySlug(
  slug: string,
): Promise<Product | null> {
  "use cache"
  cacheTag(CATALOG_CACHE_TAG)
  cacheLife("minutes")

  const db = await getDb()
  if (!db) return null

  try {
    const [row] = await db
      .select(catalogSelection)
      .from(catalogItems)
      .leftJoin(
        catalogCategories,
        eq(catalogItems.categoryId, catalogCategories.id),
      )
      .where(eq(catalogItems.slug, slug))
      .limit(1)

    if (!row || row.status !== "published") {
      return null
    }

    return mapProduct(row)
  } catch {
    return null
  }
}

async function getUniqueSlug(base: string): Promise<string> {
  const db = await getDb()
  if (!db) throw new Error("Database is not configured.")

  const root = base || `catalog-${Date.now()}`

  for (let attempt = 1; attempt <= 100; attempt += 1) {
    const candidate = attempt === 1 ? root : `${root}-${attempt}`
    const [existing] = await db
      .select({ id: catalogItems.id })
      .from(catalogItems)
      .where(eq(catalogItems.slug, candidate))
      .limit(1)

    if (!existing) return candidate
  }

  throw new Error("A unique catalog slug could not be generated.")
}

async function getAdminItemById(id: number): Promise<CatalogAdminItem> {
  const db = await getDb()
  if (!db) throw new Error("Database is not configured.")

  const [row] = await db
    .select(catalogSelection)
    .from(catalogItems)
    .leftJoin(
      catalogCategories,
      eq(catalogItems.categoryId, catalogCategories.id),
    )
    .where(eq(catalogItems.id, id))
    .limit(1)

  if (!row) throw new Error("Catalog item not found.")
  return mapAdminItem(row)
}

export async function createCatalogItemRecord(
  input: CatalogMutationInput,
): Promise<CatalogAdminItem> {
  const db = await getDb()
  if (!db) throw new Error("Database is not configured.")

  await ensureCatalogCategories()

  const slug = await getUniqueSlug(catalogSlugify(input.name))

  const [result] = await db.insert(catalogItems).values({
    categoryId: input.categoryId,
    name: input.name,
    slug,
    shortDescription: input.shortDescription,
    description: input.description,
    imageUrl: input.imageUrl,
    status: input.status,
    isFeatured: input.isFeatured ? 1 : 0,
    sortOrder: input.sortOrder,
  })

  return getAdminItemById(result.insertId)
}

export async function updateCatalogItemRecord(
  input: CatalogMutationInput & { id: number },
): Promise<CatalogAdminItem> {
  const db = await getDb()
  if (!db) throw new Error("Database is not configured.")

  await ensureCatalogCategories()

  const [result] = await db
    .update(catalogItems)
    .set({
      categoryId: input.categoryId,
      name: input.name,
      shortDescription: input.shortDescription,
      description: input.description,
      imageUrl: input.imageUrl,
      status: input.status,
      isFeatured: input.isFeatured ? 1 : 0,
      sortOrder: input.sortOrder,
    })
    .where(eq(catalogItems.id, input.id))

  if (result.affectedRows === 0) {
    throw new Error("Catalog item not found.")
  }

  return getAdminItemById(input.id)
}

export async function deleteCatalogItemRecord(id: number): Promise<void> {
  const db = await getDb()
  if (!db) throw new Error("Database is not configured.")

  const [result] = await db
    .delete(catalogItems)
    .where(eq(catalogItems.id, id))

  if (result.affectedRows === 0) {
    throw new Error("Catalog item not found.")
  }
}

function toMysqlDateTime(value: string): string | undefined {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString().slice(0, 19).replace("T", " ")
}

export async function seedCatalogDefaults(): Promise<{
  categories: number
  items: number
}> {
  const db = await getDb()
  if (!db) throw new Error("Database is not configured.")

  await ensureCatalogCategories()

  const [existingItem] = await db
    .select({ id: catalogItems.id })
    .from(catalogItems)
    .limit(1)

  if (existingItem) {
    return { categories: CATALOG_CATEGORY_DEFS.length, items: 0 }
  }

  const categories = await db
    .select({
      id: catalogCategories.id,
      slug: catalogCategories.slug,
    })
    .from(catalogCategories)

  const categoryBySlug = new Map(
    categories.map((category) => [category.slug, category.id]),
  )

  const { PRODUCTS } = await import("@/lib/catalog-data")

  const values = PRODUCTS.map((product, index) => {
    const categoryName = product.category as CatalogCategoryName
    const categoryId =
      categoryBySlug.get(catalogSlugify(categoryName)) ??
      categoryBySlug.get("others") ??
      null

    return {
      categoryId,
      name: product.name,
      slug: product.slug || slugify(product.name),
      shortDescription: product.description,
      description: product.description,
      imageUrl:
        product.image ??
        CATALOG_CATEGORY_IMAGE_FALLBACK[categoryName] ??
        DEFAULT_CATALOG_IMAGE,
      status: "published" as const,
      isFeatured: index < 3 ? 1 : 0,
      sortOrder: product.featuredOrder,
      createdAt: toMysqlDateTime(product.createdAt),
    }
  })

  if (values.length > 0) {
    await db.insert(catalogItems).values(values)
  }

  return { categories: CATALOG_CATEGORY_DEFS.length, items: values.length }
}

export type { CatalogStatusValue }
