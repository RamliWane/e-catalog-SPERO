export const CATALOG_CATEGORIES = [
  "All Categories",
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Cloud Solutions",
] as const

export const CATALOG_STATUSES = [
  "All Status",
  "Published",
  "Draft",
] as const

export type CatalogCategory = Exclude<
  (typeof CATALOG_CATEGORIES)[number],
  "All Categories"
>

export type CatalogStatus = Exclude<(typeof CATALOG_STATUSES)[number], "All Status">

export type CatalogCategoryFilter = (typeof CATALOG_CATEGORIES)[number]
export type CatalogStatusFilter = (typeof CATALOG_STATUSES)[number]

export type CatalogItem = {
  id: string
  name: string
  description: string
  category: CatalogCategory
  updatedAt: string
  status: CatalogStatus
  thumbnail: string
}

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "enterprise-web-platform",
    name: "Enterprise Web Platform",
    description: "A scalable platform for enterprise web experiences.",
    category: "Web Development",
    updatedAt: "Nov 08, 2026",
    status: "Published",
    thumbnail: "/main-home-asset.png",
  },
  {
    id: "mobile-application-development",
    name: "Mobile Application Development",
    description: "Native mobile products built for growth and performance.",
    category: "Mobile App",
    updatedAt: "Nov 07, 2026",
    status: "Published",
    thumbnail: "/asset-catalog-2.jpeg",
  },
  {
    id: "ui-ux-design-system",
    name: "UI/UX Design System",
    description: "A consistent design system for digital products.",
    category: "UI/UX Design",
    updatedAt: "Nov 06, 2026",
    status: "Published",
    thumbnail: "/asset-section-2.png",
  },
  {
    id: "cloud-infrastructure",
    name: "Cloud Infrastructure",
    description: "Reliable cloud architecture for growing teams.",
    category: "Cloud Solutions",
    updatedAt: "Nov 05, 2026",
    status: "Draft",
    thumbnail: "/asset-section-3.png",
  },
  {
    id: "e-commerce-solution",
    name: "E-Commerce Solution",
    description: "End-to-end online storefront and checkout experience.",
    category: "Web Development",
    updatedAt: "Nov 04, 2026",
    status: "Published",
    thumbnail: "/asset-catalog-3.png",
  },
  {
    id: "business-management-platform",
    name: "Business Management Platform",
    description: "Operational workflows unified in one platform.",
    category: "Web Development",
    updatedAt: "Nov 03, 2026",
    status: "Published",
    thumbnail: "/detail-catalog-image.webp",
  },
  {
    id: "api-integration-services",
    name: "API Integration Services",
    description: "Secure API connections across your product stack.",
    category: "Cloud Solutions",
    updatedAt: "Nov 02, 2026",
    status: "Published",
    thumbnail: "/main-asset-catalog.png",
  },
  {
    id: "digital-transformation-solution",
    name: "Digital Transformation Solution",
    description: "Modernize processes with connected digital tools.",
    category: "Cloud Solutions",
    updatedAt: "Nov 01, 2026",
    status: "Published",
    thumbnail: "/dummy-image-catalog.jpeg",
  },
  {
    id: "customer-portal-platform",
    name: "Customer Portal Platform",
    description: "Self-service portal for customers and partners.",
    category: "Web Development",
    updatedAt: "Oct 30, 2026",
    status: "Published",
    thumbnail: "/main-home-asset-2.png",
  },
  {
    id: "inventory-management-app",
    name: "Inventory Management App",
    description: "Real-time stock tracking in a mobile workspace.",
    category: "Mobile App",
    updatedAt: "Oct 29, 2026",
    status: "Draft",
    thumbnail: "/main-home-asset-3.png",
  },
  {
    id: "design-audit-ux-review",
    name: "Design Audit & UX Review",
    description: "Usability review with actionable design improvements.",
    category: "UI/UX Design",
    updatedAt: "Oct 28, 2026",
    status: "Published",
    thumbnail: "/aboutprocess-asset-home.jpeg",
  },
  {
    id: "cloud-migration-services",
    name: "Cloud Migration Services",
    description: "Move workloads to the cloud with minimal disruption.",
    category: "Cloud Solutions",
    updatedAt: "Oct 27, 2026",
    status: "Published",
    thumbnail: "/asset-section-2.png",
  },
  {
    id: "fintech-mobile-app",
    name: "Fintech Mobile App",
    description: "Secure mobile banking experiences for everyday users.",
    category: "Mobile App",
    updatedAt: "Oct 26, 2026",
    status: "Published",
    thumbnail: "/services-asset-1.png",
  },
  {
    id: "saas-dashboard-interface",
    name: "SaaS Dashboard Interface",
    description: "Clear, data-rich interfaces for SaaS products.",
    category: "UI/UX Design",
    updatedAt: "Oct 25, 2026",
    status: "Published",
    thumbnail: "/new-hero-asset.png",
  },
  {
    id: "serverless-api-platform",
    name: "Serverless API Platform",
    description: "Event-driven APIs without server maintenance.",
    category: "Cloud Solutions",
    updatedAt: "Oct 24, 2026",
    status: "Draft",
    thumbnail: "/new-hero-asset-2.png",
  },
  {
    id: "corporate-website-redesign",
    name: "Corporate Website Redesign",
    description: "A refined corporate site focused on conversion.",
    category: "Web Development",
    updatedAt: "Oct 23, 2026",
    status: "Published",
    thumbnail: "/main-home-asset.png",
  },
  {
    id: "logistics-tracking-app",
    name: "Logistics Tracking App",
    description: "Live shipment visibility for customers and teams.",
    category: "Mobile App",
    updatedAt: "Oct 22, 2026",
    status: "Published",
    thumbnail: "/asset-catalog-2.jpeg",
  },
  {
    id: "product-design-sprint",
    name: "Product Design Sprint",
    description: "A focused workshop to validate product direction.",
    category: "UI/UX Design",
    updatedAt: "Oct 21, 2026",
    status: "Draft",
    thumbnail: "/asset-section-3.png",
  },
  {
    id: "kubernetes-deployment-suite",
    name: "Kubernetes Deployment Suite",
    description: "Container orchestration for dependable deployments.",
    category: "Cloud Solutions",
    updatedAt: "Oct 20, 2026",
    status: "Published",
    thumbnail: "/asset-section-2.png",
  },
  {
    id: "headless-cms-integration",
    name: "Headless CMS Integration",
    description: "Structured content delivered across every channel.",
    category: "Web Development",
    updatedAt: "Oct 19, 2026",
    status: "Published",
    thumbnail: "/main-asset-catalog.png",
  },
  {
    id: "customer-loyalty-app",
    name: "Customer Loyalty App",
    description: "Reward repeat customers with a mobile loyalty app.",
    category: "Mobile App",
    updatedAt: "Oct 18, 2026",
    status: "Draft",
    thumbnail: "/asset-catalog-3.png",
  },
  {
    id: "component-library-system",
    name: "Component Library System",
    description: "Reusable UI foundations for faster product delivery.",
    category: "UI/UX Design",
    updatedAt: "Oct 17, 2026",
    status: "Published",
    thumbnail: "/detail-catalog-image.webp",
  },
  {
    id: "disaster-recovery-platform",
    name: "Disaster Recovery Platform",
    description: "Resilient recovery planning for critical systems.",
    category: "Cloud Solutions",
    updatedAt: "Oct 16, 2026",
    status: "Published",
    thumbnail: "/dummy-image-catalog.jpeg",
  },
  {
    id: "legacy-system-modernization",
    name: "Legacy System Modernization",
    description: "Upgrade legacy applications without losing momentum.",
    category: "Web Development",
    updatedAt: "Oct 15, 2026",
    status: "Draft",
    thumbnail: "/aboutprocess-asset-home.jpeg",
  },
]
