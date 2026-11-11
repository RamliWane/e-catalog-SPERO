export type BrowseIconKey = "web" | "mobile" | "design" | "cloud"

export type BrowseCategoryContent = {
  id: string
  iconKey: BrowseIconKey
  title: string
  description: string
  count: string
}

export type FeaturedSolutionContent = {
  label: string
  title: string
  description: string
  buttonLabel: string
  image: string
  imageAlt: string
}

export type BrowseContent = {
  eyebrow: string
  heading: string
  description: string
  linkLabel: string
  categories: BrowseCategoryContent[]
  featuredSolution: FeaturedSolutionContent
}

export type BrowseAssetOption = {
  label: string
  value: string
}

export const BROWSE_ICON_KEYS: BrowseIconKey[] = ["web", "mobile", "design", "cloud"]

export const BROWSE_FEATURED_IMAGE_OPTIONS: BrowseAssetOption[] = [
  { label: "Featured solution (current)", value: "/asset-section-3.png" },
  { label: "Section visual 2", value: "/asset-section-2.png" },
  { label: "Home visual 2", value: "/main-home-asset-2.png" },
  { label: "Home visual 3", value: "/main-home-asset-3.png" },
  { label: "Services visual", value: "/services-asset-1.png" },
]

export const DEFAULT_BROWSE_CONTENT: BrowseContent = {
  eyebrow: "BROWSE BY CATEGORY",
  heading: "Find the Right Solution for Your Business",
  description:
    "Explore our catalog by category and discover the right expertise for your project.",
  linkLabel: "View All Services",
  categories: [
    { id: "web-development", iconKey: "web", title: "Web Development", description: "Custom websites, web apps, and e-commerce solutions.", count: "12+ companies" },
    { id: "mobile-app", iconKey: "mobile", title: "Mobile App", description: "iOS and Android apps, from MVP to enterprise.", count: "10+ companies" },
    { id: "ui-ux-design", iconKey: "design", title: "UI/UX Design", description: "User-centered design for better experiences.", count: "8+ companies" },
    { id: "cloud-devops", iconKey: "cloud", title: "Cloud & DevOps", description: "Infrastructure, deployment, and system optimization.", count: "6+ companies" },
  ],

  featuredSolution: {
    label: "Featured Solution",
    title: "Modern Web Platform for Growing Business",
    description: "Scalable, secure, and built for long-term success.",
    buttonLabel: "Explore Project",
    image: "/asset-section-3.png",
    imageAlt: "Featured solution glass cube",
  },
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function readText(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback
}

function readTrimmed(value: unknown, fallback: string) {
  return readText(value, fallback).trim()
}

function isBrowseIconKey(value: unknown): value is BrowseIconKey {
  return (
    typeof value === "string" &&
    BROWSE_ICON_KEYS.includes(value as BrowseIconKey)
  )
}

function isAllowedImage(value: unknown) {
  return (
    typeof value === "string" &&
    BROWSE_FEATURED_IMAGE_OPTIONS.some((option) => option.value === value)
  )
}

export function cloneBrowseContent(content: BrowseContent): BrowseContent {
  return {
    ...content,
    categories: content.categories.map((category) => ({ ...category })),
    featuredSolution: { ...content.featuredSolution },
  }
}

function normalizeCategories(value: unknown): BrowseCategoryContent[] {
  const defaults = DEFAULT_BROWSE_CONTENT.categories

  if (!Array.isArray(value)) {
    return defaults.map((category) => ({ ...category }))
  }

  return defaults.map((fallback, index) => {
    const item = value[index]

    if (!isRecord(item)) {
      return { ...fallback }
    }

    return {
      id: readTrimmed(item.id, fallback.id) || fallback.id,
      iconKey: isBrowseIconKey(item.iconKey) ? item.iconKey : fallback.iconKey,
      title: readTrimmed(item.title, fallback.title) || fallback.title,
      description:
        readTrimmed(item.description, fallback.description) ||
        fallback.description,
      count: readTrimmed(item.count, fallback.count) || fallback.count,
    }
  })
}

export function normalizeBrowseContent(value: unknown): BrowseContent {
  const defaults = cloneBrowseContent(DEFAULT_BROWSE_CONTENT)

  if (!isRecord(value)) {
    return defaults
  }

  const featured = isRecord(value.featuredSolution) ? value.featuredSolution : {}
  const fallback = defaults.featuredSolution

  return {
    eyebrow: readTrimmed(value.eyebrow, defaults.eyebrow),
    heading: readTrimmed(value.heading, defaults.heading),
    description: readTrimmed(value.description, defaults.description),
    linkLabel: readTrimmed(value.linkLabel, defaults.linkLabel),
    categories: normalizeCategories(value.categories),
    featuredSolution: {
      label: readTrimmed(featured.label, fallback.label),
      title: readTrimmed(featured.title, fallback.title),
      description: readTrimmed(featured.description, fallback.description),
      buttonLabel: readTrimmed(featured.buttonLabel, fallback.buttonLabel),
      image: isAllowedImage(featured.image)
        ? (featured.image as string)
        : fallback.image,
      imageAlt: readTrimmed(featured.imageAlt, fallback.imageAlt),
    },
  }
}

type BrowseValidationResult =
  | { ok: true; content: BrowseContent; isVisible: boolean }
  | { ok: false; errors: string[] }

function validateRequiredText(
  record: Record<string, unknown>,
  key: string,
  label: string,
  maxLength: number,
  errors: string[],
) {
  const value = record[key]

  if (typeof value !== "string" || !value.trim()) {
    errors.push(`${label} is required.`)
    return
  }

  if (value.trim().length > maxLength) {
    errors.push(`${label} must be ${maxLength} characters or fewer.`)
  }
}

function validateCategories(value: unknown, errors: string[]) {
  if (
    !Array.isArray(value) ||
    value.length !== DEFAULT_BROWSE_CONTENT.categories.length
  ) {
    errors.push("Browse categories must contain exactly four items.")
    return
  }

  const ids = new Set<string>()

  value.forEach((item, index) => {
    if (!isRecord(item)) {
      errors.push(`Category ${index + 1} is invalid.`)
      return
    }

    const id = typeof item.id === "string" ? item.id.trim() : ""

    if (!id) {
      errors.push(`Category ${index + 1} is missing an id.`)
    } else if (ids.has(id)) {
      errors.push(`Category ${index + 1} has a duplicate id.`)
    } else {
      ids.add(id)
    }

    if (!isBrowseIconKey(item.iconKey)) {
      errors.push(`Category ${index + 1} has an invalid icon.`)
    }

    validateRequiredText(item, "title", `Category ${index + 1} title`, 100, errors)
    validateRequiredText(item, "description", `Category ${index + 1} description`, 400, errors)
    validateRequiredText(item, "count", `Category ${index + 1} supporting label`, 80, errors)
  })
}

export function validateBrowseEditorInput(
  value: unknown,
): BrowseValidationResult {
  const errors: string[] = []

  if (!isRecord(value) || !isRecord(value.content)) {
    return { ok: false, errors: ["Browse data is missing."] }
  }

  if (typeof value.isVisible !== "boolean") {
    errors.push("Browse visibility must be true or false.")
  }

  const content = value.content

  validateRequiredText(content, "eyebrow", "Eyebrow text", 120, errors)
  validateRequiredText(content, "heading", "Section heading", 200, errors)
  validateRequiredText(content, "description", "Section description", 1000, errors)
  validateRequiredText(content, "linkLabel", "Link label", 80, errors)

  validateCategories(content.categories, errors)

  if (!isRecord(content.featuredSolution)) {
    errors.push("Featured solution data is missing.")
  } else {
    const featured = content.featuredSolution
    const fields = [
      ["label", "Featured solution label", 120],
      ["title", "Featured solution title", 200],
      ["description", "Featured solution description", 500],
      ["buttonLabel", "Featured solution button label", 80],
      ["imageAlt", "Featured solution image alt text", 300],
    ] as const

    fields.forEach(([key, label, maxLength]) =>
      validateRequiredText(featured, key, label, maxLength, errors),
    )

    if (!isAllowedImage(featured.image)) {
      errors.push("Select a valid Browse featured solution asset.")
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors: Array.from(new Set(errors)) }
  }

  return {
    ok: true,
    content: normalizeBrowseContent(content),
    isVisible: value.isVisible as boolean,
  }
}
