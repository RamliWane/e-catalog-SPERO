
import {
  ChartColumn,
  Users,
  Zap,
} from "lucide-react"
import {
  getProductGallery,
  type Product,
} from "@/lib/catalog-data"
import KeyHighlights from "@/app/components/catalog/KeyHighlights"
import ProductGallery from "@/app/components/catalog/ProductGallery"

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
  }
}

const TABS = ["Overview", "Features", "Gallery", "Tech Stack"]

export default function CatalogOverviewSection({
  product,
}: {
  product: Product
}) {
  const gallery = getProductGallery(product)
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
        {/* Overview introduction */}
        <div>
          <h2
            id="overview-heading"
            className="text-[21px] font-bold leading-tight tracking-[-0.01em] text-[#14264A] sm:text-[23px]"
          >
            {overview.headline}
          </h2>

          <p className="mt-2 max-w-[700px] text-[12px] leading-[1.65] text-[#526786] sm:text-[13px]">
            {overview.description}
          </p>

          <div className="mt-6 grid max-w-[780px] grid-cols-1 gap-x-7 gap-y-4 sm:grid-cols-3">
            {overview.highlights.map((highlight) => {
              const Icon = HIGHLIGHT_ICONS[highlight.icon]

              return (
                <div
                  key={highlight.title}
                  className="flex min-w-0 items-start gap-3"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#E8F0FF] text-[#3978FF]">
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[12px] font-semibold leading-tight text-[#14264A]">
                      {highlight.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-[1.55] text-[#5F7392]">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Product Gallery + Key Highlights */}
        <div className="mt-8 grid min-w-0 items-start gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,0.92fr)]">
          <ProductGallery
            productName={product.name}
            images={gallery}
          />

          <KeyHighlights product={product} />
        </div>
      </div>
    </section>
  )
}
