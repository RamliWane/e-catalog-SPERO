import { ChartColumn, ShieldCheck, Sparkles, Users, Zap } from "lucide-react"
import {
  getProductHighlights,
  type Product,
} from "@/lib/catalog-data"

const HIGHLIGHT_ICONS = {
  analytics: ChartColumn,
  automation: Zap,
  collaboration: Users,
  security: ShieldCheck,
} as const

export default function KeyHighlights({ product }: { product: Product }) {
  const highlights = getProductHighlights(product)
  const intro =
    product.slug === "spero-dashboard"
      ? "Everything you need to manage your projects and grow your business."
      : `Everything you need to get more from ${product.name}.`

  return (
    <aside className="min-w-0 self-start rounded-[15px] border border-[#DCE6F5] bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <Sparkles
          size={18}
          strokeWidth={1.8}
          aria-hidden="true"
          className="shrink-0 text-[#3978FF]"
        />
        <h2 className="text-[18px] font-semibold leading-tight text-[#14213D] sm:text-[20px]">
          Key Highlights
        </h2>
      </div>

      <p className="mt-2.5 text-[12px] leading-[1.6] text-[#526786] sm:text-[13px]">
        {intro}
      </p>

      <div className="mt-5 h-px bg-[#DCE6F5]" />

      <ul className="mt-5 space-y-5">
        {highlights.map((highlight) => {
          const Icon = HIGHLIGHT_ICONS[highlight.icon]

          return (
            <li key={highlight.title} className="flex min-w-0 items-start gap-3.5">
              <span className="flex size-[52px] shrink-0 items-center justify-center rounded-[15px] bg-[#EAF1FF] text-[#3978FF] sm:size-[56px]">
                <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
              </span>

              <div className="min-w-0 pt-0.5">
                <h3 className="text-[14px] font-semibold leading-tight text-[#14213D]">
                  {highlight.title}
                </h3>
                <p className="mt-1.5 text-[12px] leading-[1.55] text-[#526786]">
                  {highlight.description}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
