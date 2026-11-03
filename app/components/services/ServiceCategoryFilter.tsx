import {
  Layers3Icon,
  LayoutGridIcon,
  Code2Icon,
  CloudIcon,
  UserRoundIcon,
} from "@/lib/icons"

export type ServiceFilterCategory =
  | "All Services"
  | "Design"
  | "Development"
  | "Cloud & DevOps"
  | "Consulting"

const FILTER_ITEMS: ServiceFilterCategory[] = [
  "All Services",
  "Design",
  "Development",
  "Cloud & DevOps",
  "Consulting",
]

const FILTER_ICONS: Record<ServiceFilterCategory, React.ComponentType<{ className?: string; size?: number }>> = {
  "All Services": Layers3Icon,
  Design: LayoutGridIcon,
  Development: Code2Icon,
  "Cloud & DevOps": CloudIcon,
  Consulting: UserRoundIcon,
}

export default function ServiceCategoryFilter({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: ServiceFilterCategory
  setActiveCategory: (category: ServiceFilterCategory) => void
}) {
  return (
    <div className="flex flex-wrap gap-3 mt-[24px]">
      {FILTER_ITEMS.map((category) => {
        const Icon = FILTER_ICONS[category]
        const isActive = activeCategory === category
        return (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            aria-pressed={isActive}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 ${
              isActive
                ? "bg-[#101B35] text-white border-[#101B35]"
                : "bg-white text-[#14213D] border-[#E2EAF5] hover:bg-[#F5F7FA] hover:border-[#C7D2FE]"
            } ${
              isActive ? "focus-visible:ring-blue-600" : "focus-visible:ring-[#C7D2FE]"
            }`}
          >
            <Icon size={15} className={isActive ? "text-white" : "text-[#526786]"} />
            {category}
          </button>
        )
      })}
    </div>
  )
}
