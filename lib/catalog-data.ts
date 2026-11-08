import type { ComponentType } from "react"
import {
  Globe,
  Smartphone,
  Cloud,
  PenLine,
  ChartColumn,
  Ellipsis,
} from "lucide-react"

export type Category =
  | "All"
  | "Web Development"
  | "Mobile App"
  | "Cloud & DevOps"
  | "UI/UX Design"
  | "Data & Analytics"
  | "Others"

export type SortOption = "Featured" | "Newest" | "Name (A-Z)"

export type ProductHighlight = {
  title: string
  description: string
  icon: "analytics" | "automation" | "collaboration" | "security"
}

export type ProductGalleryImage = {
  src: string
  alt: string
  title: string
  description: string
}

export type Product = {
  id: string
  slug: string
  name: string
  category: Category
  description: string
  capabilities: string[]
  image?: string
  gallery?: ProductGalleryImage[]
  highlights?: ProductHighlight[]
  featuredOrder: number
  createdAt: string
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const CATEGORIES: Category[] = [
  "All",
  "Web Development",
  "Mobile App",
  "Cloud & DevOps",
  "UI/UX Design",
  "Data & Analytics",
  "Others",
]

const PRODUCT_RECORDS: Omit<Product, "slug">[] = [
  {
    id: "1",
    name: "Spero Dashboard",
    category: "Web Development",
    description: "A modern and scalable dashboard solution for your business needs.",
    capabilities: ["Web-based", "Scalable", "Business-ready"],
    gallery: [
      {
        src: "/detail-catalog-image.webp",
        alt: "Spero Dashboard workspace overview",
        title: "Dashboard Overview",
        description:
          "A focused view of the Spero Dashboard workspace and its primary navigation.",
      },
      {
        src: "/asset-catalog-3.png",
        alt: "Spero website experience preview",
        title: "Website Experience",
        description:
          "A responsive marketing page shaped by the Spero visual system.",
      },
      {
        src: "/asset-catalog-2.jpeg",
        alt: "Spero brand experience preview",
        title: "Brand Experience",
        description:
          "A polished agency layout that carries the catalog's design language.",
      },
      {
        src: "/dummy-image-catalog.jpeg",
        alt: "Spero automation workspace preview",
        title: "Automation Workspace",
        description:
          "A workflow-focused interface for organizing sales automation.",
      },
    ],
    highlights: [
      {
        title: "Real-time Analytics",
        description:
          "Monitor performance and turn live data into clear, actionable insights.",
        icon: "analytics",
      },
      {
        title: "Workflow Automation",
        description:
          "Automate repetitive tasks so your team can focus on higher-value work.",
        icon: "automation",
      },
      {
        title: "Team Collaboration",
        description:
          "Keep projects, updates, and conversations connected in one shared space.",
        icon: "collaboration",
      },
      {
        title: "Enterprise-Ready",
        description:
          "Built to stay reliable, secure, and scalable as your business grows.",
        icon: "security",
      },
    ],
    featuredOrder: 1,
    createdAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Finora Mobile App",
    category: "Mobile App",
    description: "Personal finance app to help you manage your money better.",
    capabilities: ["Mobile", "Finance", "Money management"],
    featuredOrder: 2,
    createdAt: "2025-02-10T00:00:00Z",
  },
  {
    id: "3",
    name: "Nova Cloud",
    category: "Cloud & DevOps",
    description: "Cloud infrastructure and deployment solution for modern businesses.",
    capabilities: ["Cloud", "Infrastructure", "Deployment"],
    featuredOrder: 3,
    createdAt: "2025-03-05T00:00:00Z",
  },
  {
    id: "4",
    name: "Aurora Design System",
    category: "UI/UX Design",
    description: "A complete design system for building beautiful products.",
    capabilities: ["Design system", "UI/UX", "Product design"],
    featuredOrder: 4,
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Insight Pro",
    category: "Data & Analytics",
    description: "Turn your data into actionable insights with ease.",
    capabilities: ["Data", "Analytics", "Actionable insights"],
    featuredOrder: 5,
    createdAt: "2025-05-20T00:00:00Z",
  },
  {
    id: "6",
    name: "NextGen Website",
    category: "Web Development",
    description: "A high-performance website for your growing business.",
    capabilities: ["Web-based", "High-performance", "Business-ready"],
    featuredOrder: 6,
    createdAt: "2025-06-10T00:00:00Z",
  },
  {
    id: "7",
    name: "API Gateway",
    category: "Others",
    description: "A reliable API gateway for seamless integrations.",
    capabilities: ["API", "Reliable", "Integrations"],
    featuredOrder: 7,
    createdAt: "2025-07-01T00:00:00Z",
  },
  {
    id: "8",
    name: "DevOps Toolkit",
    category: "Cloud & DevOps",
    description: "Streamline your development and deployment workflow.",
    capabilities: ["DevOps", "Development", "Deployment"],
    featuredOrder: 8,
    createdAt: "2025-08-05T00:00:00Z",
  },
]

export const PRODUCTS: Product[] = PRODUCT_RECORDS.map((product) => ({
  ...product,
  slug: slugify(product.name),
}))

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug)
}

export function getProductGallery(product: Product): ProductGalleryImage[] {
  if (product.gallery?.length) {
    return product.gallery
  }

  return [
    {
      src: "/detail-catalog-image.webp",
      alt: `${product.name} interface preview`,
      title: "Interface Overview",
      description: `A closer look at the ${product.name} interface and its key workspaces.`,
    },
  ]
}

function inferHighlightIcon(title: string): ProductHighlight["icon"] {
  const value = title.toLowerCase()

  if (
    value.includes("analytic") ||
    value.includes("data") ||
    value.includes("insight") ||
    value.includes("chart")
  ) {
    return "analytics"
  }

  if (
    value.includes("automat") ||
    value.includes("workflow") ||
    value.includes("devops")
  ) {
    return "automation"
  }

  if (
    value.includes("collab") ||
    value.includes("team") ||
    value.includes("user")
  ) {
    return "collaboration"
  }

  if (
    value.includes("security") ||
    value.includes("scalable") ||
    value.includes("enterprise")
  ) {
    return "security"
  }

  return "analytics"
}

export function getProductHighlights(product: Product): ProductHighlight[] {
  if (product.highlights?.length) {
    return product.highlights
  }

  return product.capabilities.slice(0, 4).map((capability) => ({
    title: capability,
    description: `${capability} is built into ${product.name} to support a smoother ${product.category.toLowerCase()} workflow.`,
    icon: inferHighlightIcon(capability),
  }))
}

export const CATEGORY_ICONS: Record<Exclude<Category, "All">, ComponentType<{ className?: string; size?: number }>> = {
  "Web Development": Globe,
  "Mobile App": Smartphone,
  "Cloud & DevOps": Cloud,
  "UI/UX Design": PenLine,
  "Data & Analytics": ChartColumn,
  Others: Ellipsis,
}
