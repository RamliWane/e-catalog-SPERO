export type HeroIconKey = "web" | "mobile" | "design" | "cloud"

export type HeroTag = {
  id: string
  label: string
}

export type HeroFloatingCard = {
  id: string
  iconKey: HeroIconKey
  title: string
  description: string
  visible: boolean
  top?: string
  right?: string
  bottom?: string
  left?: string
  rotate: number
  duration: string
  delay: string
  accent: string
  accentText: string
}

export type HeroContent = {
  eyebrow: string
  heading: string
  description: string
  searchPlaceholder: string
  searchButtonLabel: string
  visualImage: string
  visualImageAlt: string
  showVisual: boolean
  showPopularTags: boolean
  showFloatingCards: boolean
  popularTags: HeroTag[]
  floatingCards: HeroFloatingCard[]
}

export type HeroVisualOption = {
  label: string
  value: string
}

export const HERO_VISUAL_OPTIONS: HeroVisualOption[] = [
  { label: "Fix Asset Home", value: "/fix-asset-hero-home.png" },
  { label: "Featured solution visual", value: "/asset-section-3.png" },
]

export const DEFAULT_HERO_TAGS: HeroTag[] = [
  { id: "hero-tag-web-development", label: "Web Development" },
  { id: "hero-tag-mobile-app", label: "Mobile App" },
  { id: "hero-tag-ui-ux-design", label: "UI/UX Design" },
  { id: "hero-tag-cloud-solutions", label: "Cloud Solutions" },
]

export const DEFAULT_HERO_FLOATING_CARDS: HeroFloatingCard[] = [
  {
    id: "hero-card-web-development",
    iconKey: "web",
    title: "Web Development",
    description: "Modern, scalable, and high-performance web solutions.",
    visible: true,
    top: "2%",
    left: "12%",
    rotate: -4,
    duration: "5s",
    delay: "0s",
    accent: "#DBEAFE",
    accentText: "#2563EB",
  },
  {
    id: "hero-card-mobile-app",
    iconKey: "mobile",
    title: "Mobile App",
    description: "iOS & Android apps that people love to use.",
    visible: true,
    top: "-2%",
    right: "14%",
    rotate: 3,
    duration: "7s",
    delay: "0.2s",
    accent: "#D1FAE5",
    accentText: "#10B981",
  },
  {
    id: "hero-card-ui-ux-design",
    iconKey: "design",
    title: "UI/UX Design",
    description: "Designing intuitive experiences for real people.",
    visible: true,
    bottom: "16%",
    left: "16%",
    rotate: -1,
    duration: "8s",
    delay: "0.4s",
    accent: "#FEE2E2",
    accentText: "#EF4444",
  },
  {
    id: "hero-card-cloud-devops",
    iconKey: "cloud",
    title: "Cloud & DevOps",
    description: "Build, deploy, and scale with confidence.",
    visible: true,
    bottom: "4%",
    right: "16%",
    rotate: 2,
    duration: "6s",
    delay: "0.6s",
    accent: "#EDE9FE",
    accentText: "#7C3AED",
  },
]

export const DEFAULT_HERO_CONTENT: HeroContent = {
  eyebrow: "SOFTWARE HOUSE & IT CONSULTANT",
  heading: "Your Trusted Partner for Digital Solutions",
  description:
    "Explore our curated catalog of software houses and IT consultants ready to build, scale, and transform your ideas into digital solutions.",
  searchPlaceholder: "Search services, technologies, or company...",
  searchButtonLabel: "Search",
  visualImage: "/fix-asset-hero-home.png",
  visualImageAlt: "Spero digital solutions",
  showVisual: true,
  showPopularTags: true,
  showFloatingCards: true,
  popularTags: DEFAULT_HERO_TAGS,
  floatingCards: DEFAULT_HERO_FLOATING_CARDS,
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function readText(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback
}

function readBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback
}

export function cloneHeroContent(content: HeroContent): HeroContent {
  return {
    ...content,
    popularTags: content.popularTags.map((tag) => ({ ...tag })),
    floatingCards: content.floatingCards.map((card) => ({ ...card })),
  }
}

export function createHeroTagId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `hero-tag-${crypto.randomUUID()}`
  }

  return `hero-tag-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function normalizeHeroTags(value: unknown): HeroTag[] {
  if (!Array.isArray(value)) {
    return DEFAULT_HERO_TAGS.map((tag) => ({ ...tag }))
  }

  const tags: HeroTag[] = []
  const ids = new Set<string>()
  const labels = new Set<string>()

  value.slice(0, 20).forEach((item, index) => {
    let id = `hero-tag-${index}`
    let label = ""

    if (typeof item === "string") {
      label = item
    } else if (isRecord(item)) {
      if (typeof item.id === "string" && item.id.trim()) {
        id = item.id.trim()
      }
      if (typeof item.label === "string") {
        label = item.label
      }
    }

    const trimmedLabel = label.trim()
    if (!trimmedLabel) {
      return
    }

    const labelKey = trimmedLabel.toLowerCase()
    if (labels.has(labelKey)) {
      return
    }

    if (ids.has(id)) {
      id = `hero-tag-${index}-${ids.size + 1}`
    }

    ids.add(id)
    labels.add(labelKey)
    tags.push({ id, label: trimmedLabel })
  })

  return tags
}

function normalizeHeroCards(value: unknown): HeroFloatingCard[] {
  if (!Array.isArray(value)) {
    return DEFAULT_HERO_FLOATING_CARDS.map((card) => ({ ...card }))
  }

  return DEFAULT_HERO_FLOATING_CARDS.map((fallback, index) => {
    const item = value[index]

    if (!isRecord(item)) {
      return { ...fallback }
    }

    return {
      ...fallback,
      title: readText(item.title, fallback.title).trim(),
      description: readText(item.description, fallback.description).trim(),
      visible: readBoolean(item.visible, fallback.visible),
    }
  })
}

export function normalizeHeroContent(value: unknown): HeroContent {
  const defaults = cloneHeroContent(DEFAULT_HERO_CONTENT)

  if (!isRecord(value)) {
    return defaults
  }

  const visualImage =
    typeof value.visualImage === "string" &&
    HERO_VISUAL_OPTIONS.some((option) => option.value === value.visualImage)
      ? value.visualImage
      : defaults.visualImage

  return {
    eyebrow: readText(value.eyebrow, defaults.eyebrow).trim(),
    heading: readText(value.heading, defaults.heading).trim(),
    description: readText(value.description, defaults.description).trim(),
    searchPlaceholder: readText(
      value.searchPlaceholder,
      defaults.searchPlaceholder,
    ).trim(),
    searchButtonLabel: readText(
      value.searchButtonLabel,
      defaults.searchButtonLabel,
    ).trim(),
    visualImage,
    visualImageAlt: readText(
      value.visualImageAlt,
      defaults.visualImageAlt,
    ).trim(),
    showVisual: readBoolean(value.showVisual, defaults.showVisual),
    showPopularTags: readBoolean(
      value.showPopularTags,
      defaults.showPopularTags,
    ),
    showFloatingCards: readBoolean(
      value.showFloatingCards,
      defaults.showFloatingCards,
    ),
    popularTags: normalizeHeroTags(value.popularTags),
    floatingCards: normalizeHeroCards(value.floatingCards),
  }
}

type HeroValidationResult =
  | { ok: true; content: HeroContent; isVisible: boolean }
  | { ok: false; errors: string[] }

function validateOptionalText(
  record: Record<string, unknown>,
  key: string,
  label: string,
  maxLength: number,
  errors: string[],
) {
  const value = record[key]

  if (value === undefined) {
    return
  }

  if (typeof value !== "string") {
    errors.push(`${label} must be text.`)
    return
  }

  if (value.trim().length > maxLength) {
    errors.push(`${label} must be ${maxLength} characters or fewer.`)
  }
}

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

export function validateHeroEditorInput(value: unknown): HeroValidationResult {
  const errors: string[] = []

  if (!isRecord(value) || !isRecord(value.content)) {
    return { ok: false, errors: ["Hero data is missing."] }
  }

  if (typeof value.isVisible !== "boolean") {
    errors.push("Hero visibility must be true or false.")
  }

  const content = value.content

  validateOptionalText(content, "eyebrow", "Eyebrow text", 200, errors)
  validateRequiredText(content, "heading", "Main heading", 300, errors)
  validateOptionalText(content, "description", "Description", 2000, errors)
  validateRequiredText(
    content,
    "searchPlaceholder",
    "Search placeholder",
    300,
    errors,
  )
  validateRequiredText(
    content,
    "searchButtonLabel",
    "Search button label",
    80,
    errors,
  )
  validateRequiredText(
    content,
    "visualImageAlt",
    "Visual image alt text",
    300,
    errors,
  )

  if (
    typeof content.visualImage !== "string" ||
    !HERO_VISUAL_OPTIONS.some((option) => option.value === content.visualImage)
  ) {
    errors.push("Select a valid Hero visual asset.")
  }

  for (const [key, label] of [
    ["showVisual", "Visual visibility"],
    ["showPopularTags", "Popular search tag visibility"],
    ["showFloatingCards", "Floating card visibility"],
  ] as const) {
    if (typeof content[key] !== "boolean") {
      errors.push(`${label} must be true or false.`)
    }
  }

  if (!Array.isArray(content.popularTags)) {
    errors.push("Popular search tags must be a list.")
  } else {
    if (content.popularTags.length > 20) {
      errors.push("Popular search tags cannot contain more than 20 items.")
    }

    const ids = new Set<string>()
    const labels = new Set<string>()

    content.popularTags.forEach((item, index) => {
      if (!isRecord(item)) {
        errors.push(`Popular search tag ${index + 1} is invalid.`)
        return
      }

      const id = typeof item.id === "string" ? item.id.trim() : ""
      const label = typeof item.label === "string" ? item.label.trim() : ""

      if (!id) {
        errors.push(`Popular search tag ${index + 1} is missing an id.`)
      } else if (ids.has(id)) {
        errors.push(`Popular search tag ${index + 1} has a duplicate id.`)
      } else {
        ids.add(id)
      }

      if (!label) {
        errors.push("Popular search tag labels cannot be empty.")
      } else if (labels.has(label.toLowerCase())) {
        errors.push(`Popular search tag "${label}" is duplicated.`)
      } else {
        labels.add(label.toLowerCase())
      }

      if (label.length > 80) {
        errors.push(
          `Popular search tag "${label}" must be 80 characters or fewer.`,
        )
      }
    })
  }

  if (
    !Array.isArray(content.floatingCards) ||
    content.floatingCards.length !== DEFAULT_HERO_FLOATING_CARDS.length
  ) {
    errors.push("Hero floating cards must contain exactly four items.")
  } else {
    content.floatingCards.forEach((item, index) => {
      if (!isRecord(item)) {
        errors.push(`Floating card ${index + 1} is invalid.`)
        return
      }

      const title = typeof item.title === "string" ? item.title.trim() : ""
      const description =
        typeof item.description === "string" ? item.description.trim() : ""

      if (!title) {
        errors.push(`Floating card ${index + 1} title is required.`)
      } else if (title.length > 100) {
        errors.push(
          `Floating card ${index + 1} title must be 100 characters or fewer.`,
        )
      }

      if (description.length > 300) {
        errors.push(
          `Floating card ${index + 1} description must be 300 characters or fewer.`,
        )
      }

      if (typeof item.visible !== "boolean") {
        errors.push(
          `Floating card ${index + 1} visibility must be true or false.`,
        )
      }
    })
  }

  if (errors.length > 0) {
    return { ok: false, errors: Array.from(new Set(errors)) }
  }

  return {
    ok: true,
    content: normalizeHeroContent(content),
    isVisible: value.isVisible as boolean,
  }
}
