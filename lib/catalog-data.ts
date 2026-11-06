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

export type Product = {
  id: string
  slug: string
  name: string
  category: Category
  description: string
  image?: string
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
    featuredOrder: 1,
    createdAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Finora Mobile App",
    category: "Mobile App",
    description: "Personal finance app to help you manage your money better.",
    featuredOrder: 2,
    createdAt: "2025-02-10T00:00:00Z",
  },
  {
    id: "3",
    name: "Nova Cloud",
    category: "Cloud & DevOps",
    description: "Cloud infrastructure and deployment solution for modern businesses.",
    featuredOrder: 3,
    createdAt: "2025-03-05T00:00:00Z",
  },
  {
    id: "4",
    name: "Aurora Design System",
    category: "UI/UX Design",
    description: "A complete design system for building beautiful products.",
    featuredOrder: 4,
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Insight Pro",
    category: "Data & Analytics",
    description: "Turn your data into actionable insights with ease.",
    featuredOrder: 5,
    createdAt: "2025-05-20T00:00:00Z",
  },
  {
    id: "6",
    name: "NextGen Website",
    category: "Web Development",
    description: "A high-performance website for your growing business.",
    featuredOrder: 6,
    createdAt: "2025-06-10T00:00:00Z",
  },
  {
    id: "7",
    name: "API Gateway",
    category: "Others",
    description: "A reliable API gateway for seamless integrations.",
    featuredOrder: 7,
    createdAt: "2025-07-01T00:00:00Z",
  },
  {
    id: "8",
    name: "DevOps Toolkit",
    category: "Cloud & DevOps",
    description: "Streamline your development and deployment workflow.",
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

export const CATEGORY_ICONS: Record<Exclude<Category, "All">, ComponentType<{ className?: string; size?: number }>> = {
  "Web Development": Globe,
  "Mobile App": Smartphone,
  "Cloud & DevOps": Cloud,
  "UI/UX Design": PenLine,
  "Data & Analytics": ChartColumn,
  Others: Ellipsis,
}
