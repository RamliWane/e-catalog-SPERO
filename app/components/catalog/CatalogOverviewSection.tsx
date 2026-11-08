import Image from "next/image"
import {
  CalendarCheck,
  ChartColumn,
  Layers3,
  Monitor,
  Users,
  Zap,
} from "lucide-react"
import type { Product } from "@/lib/catalog-data"

type HighlightIcon = "analytics" | "automation" | "collaboration"

type OverviewHighlight = {
  title: string
  description: string
  icon: HighlightIcon
}

type OverviewContent = {
  headline: string
  description: string
  highlights: OverviewHighlight[]
  platform: string
  availability: string
}

const HIGHLIGHT_ICONS = {
  analytics: ChartColumn,
  automation: Zap,
  collaboration: Users,
}

const HIGHLIGHT_ICON_ORDER: HighlightIcon[] = [
  "analytics",
  "automation",
  "collaboration",
]

const PLATFORM_BY_CATEGORY: Record<string, string> = {
  "Web Development": "Web App",
  "Mobile App": "Mobile App",
  "Cloud & DevOps": "Cloud Platform",
  "UI/UX Design": "Design System",
  "Data & Analytics": "Analytics Platform",
  Others: "Custom Platform",
}

const REFERENCE_OVERVIEW: OverviewContent = {
  headline: "Built for better workflows",
  description:
    "Spero Dashboard helps you manage projects, track performance, and collaborate with your team — all in one place.",
  highlights: [
    {
      title: "Analytics",
      description: "Turn data into insights with powerful analytics.",
      icon: "analytics",
    },
    {
      title: "Automation",
      description: "Automate repetitive tasks and save time.",
      icon: "automation",
    },
    {
      title: "Collaboration",
      description: "Work together seamlessly with your team.",
      icon: "collaboration",
    },
  ],
  platform: "Web App",
  availability: "Custom deployment",
}

function getOverviewContent(product: Product): OverviewContent {
  if (product.slug === "spero-dashboard") {
    return REFERENCE_OVERVIEW
  }

  const highlights = product.capabilities
    .slice(0, 3)
    .map((capability, index) => ({
      title: capability,
      description: `${capability} is built into ${product.name} to support your ${product.category.toLowerCase()} workflow.`,
      icon: HIGHLIGHT_ICON_ORDER[index],
    }))

  return {
    headline: "Built for better workflows",
    description: `${product.name} brings ${product.capabilities
      .join(", ")
      .toLowerCase()} together in one focused ${product.category.toLowerCase()} experience.`,
    highlights,
    platform: PLATFORM_BY_CATEGORY[product.category] ?? "Custom Platform",
    availability: "Custom deployment",
  }
}

const TABS = ["Overview", "Features", "Gallery", "Tech Stack"]

export default function CatalogOverviewSection({ product }: { product: Product }) {
  const overview = getOverviewContent(product)

  return (
    <section
      aria-labelledby="overview-heading"
      className="mx-auto mt-10 max-w-6xl min-w-0"
    >
      <div className="overflow-x-auto border-b border-[#DDE7F8] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label={`${product.name} sections`}
          className="flex min-w-max gap-7 sm:gap-8"
        >
          {TABS.map((tab, index) => {
            const isActive = index === 0

            return (
              <button
                key={tab}
                type="button"
                role="tab"
                id={isActive ? "overview-tab" : undefined}
                aria-selected={isActive}
                aria-controls={isActive ? "overview-panel" : undefined}
                aria-disabled={!isActive}
                tabIndex={isActive ? 0 : -1}
                className={`relative shrink-0 pb-3 text-[12px] leading-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 sm:text-[13px] ${
                  isActive
                    ? "font-semibold text-[#14264A] after:absolute after:-left-0.5 after:-right-0.5 after:bottom-0 after:h-0.5 after:bg-[#3978FF]"
                    : "cursor-default font-medium text-[#4F6386]"
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      <div
        id="overview-panel"
        role="tabpanel"
        aria-labelledby="overview-tab"
        className="pt-6"
      >
        <h2
          id="overview-heading"
          className="text-[21px] font-bold leading-tight tracking-[-0.01em] text-[#14264A] sm:text-[23px]"
        >
          {overview.headline}
        </h2>

        <p className="mt-2 max-w-[560px] text-[12px] leading-[1.65] text-[#526786] sm:text-[12.5px]">
          {overview.description}
        </p>

        <div className="mt-6 grid max-w-[780px] grid-cols-1 gap-x-7 gap-y-4 sm:grid-cols-3">
          {overview.highlights.map((highlight) => {
            const Icon = HIGHLIGHT_ICONS[highlight.icon]

            return (
              <div key={highlight.title} className="flex min-w-0 items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-[#E8F0FF] text-[#3978FF]">
                  <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <h3 className="text-[11px] font-semibold leading-tight text-[#14264A]">
                    {highlight.title}
                  </h3>
                  <p className="mt-1 text-[10px] leading-[1.55] text-[#5F7392] sm:text-[10.5px]">
                    {highlight.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,2.75fr)_minmax(0,1fr)]">
          <div className="min-w-0 overflow-hidden rounded-[11px] border border-[#DDE7F8] bg-white">
            <Image
              src="/asset-catalog-3.png"
              alt={`${product.name} dashboard preview`}
              width={1672}
              height={941}
              sizes="(min-width: 1024px) 72vw, 100vw"
              className="block h-auto w-full object-cover object-center"
            />
          </div>

          <aside className="flex h-full min-w-0 flex-col rounded-[11px] border border-[#DDE7F8] bg-[#FAFBFF] p-5">
            <h3 className="text-[15px] font-semibold leading-tight text-[#14264A]">
              Project details
            </h3>

            <dl className="mt-7 flex flex-1 flex-col gap-6 xl:justify-evenly">
              <div className="flex items-start gap-3">
                <Monitor
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#526786]"
                />
                <div className="min-w-0">
                  <dt className="text-[10.5px] font-medium leading-tight text-[#4F6386]">
                    Platform
                  </dt>
                  <dd className="mt-1 text-[10.5px] leading-tight text-[#6A7E9C]">
                    {overview.platform}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Layers3
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#526786]"
                />
                <div className="min-w-0">
                  <dt className="text-[10.5px] font-medium leading-tight text-[#4F6386]">
                    Category
                  </dt>
                  <dd className="mt-1 text-[10.5px] leading-tight text-[#6A7E9C]">
                    {product.category}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarCheck
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#526786]"
                />
                <div className="min-w-0">
                  <dt className="text-[10.5px] font-medium leading-tight text-[#4F6386]">
                    Availability
                  </dt>
                  <dd className="mt-1 text-[10.5px] leading-tight text-[#6A7E9C]">
                    {overview.availability}
                  </dd>
                </div>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
