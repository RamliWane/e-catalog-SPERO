import type { ReactElement } from "react"

import {
  ArrowRightIcon,
  CloudIcon,
  Code2Icon,
  SearchIcon,
  ShapesIcon,
  SmartphoneIcon,
} from "@/lib/icons"
import {
  DEFAULT_HERO_CONTENT,
  type HeroContent,
  type HeroFloatingCard,
  type HeroIconKey,
} from "@/lib/home-hero-data"

type IconComponent = (props: {
  className?: string
  size?: number
}) => ReactElement

const CARD_ICONS: Record<HeroIconKey, IconComponent> = {
  web: Code2Icon,
  mobile: SmartphoneIcon,
  design: ShapesIcon,
  cloud: CloudIcon,
}

function FloatingCard({ card }: { card: HeroFloatingCard }) {
  const Icon = CARD_ICONS[card.iconKey]
  const accentColorClass =
    card.accentText === "#2563EB"
      ? "text-blue-600"
      : card.accentText === "#10B981"
        ? "text-emerald-600"
        : card.accentText === "#EF4444"
          ? "text-rose-600"
          : "text-purple-600"

  return (
    <div
      className="absolute z-10 w-[150px] sm:w-[175px]"
      style={{
        ...(card.top ? { top: card.top } : {}),
        ...(card.right ? { right: card.right } : {}),
        ...(card.bottom ? { bottom: card.bottom } : {}),
        ...(card.left ? { left: card.left } : {}),
        transform: `rotate(${card.rotate}deg)`,
      }}
    >
      <div
        className="animate-float rounded-lg border border-white/80
          border-b-slate-300/80 bg-white/90 p-3
          shadow-[0_8px_24px_rgba(30,64,175,0.10)]
          backdrop-blur-xl transition-shadow duration-300
          hover:shadow-[0_12px_30px_rgba(30,64,175,0.18)]"
        style={{
          animationDuration: card.duration,
          animationDelay: card.delay,
        }}
      >
        <div
          className="mb-2 flex h-4 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: card.accent }}
        >
          <Icon size={15} className={accentColorClass} />
        </div>

        <h4 className="text-[11px] font-semibold leading-tight text-slate-900">
          {card.title}
        </h4>

        <p className="mt-1 line-clamp-2 text-[9px] leading-[1.4] text-slate-500">
          {card.description}
        </p>

      </div>
    </div>
  )
}

export default function Hero({
  content = DEFAULT_HERO_CONTENT,
}: {
  content?: HeroContent
}) {
  const visibleCards = content.floatingCards.filter((card) => card.visible)

  return (
    <section className="bg-white pt-15 pb-5 px-8 min-h-[520px] flex flex-col lg:flex-row gap-5 items-start">
      <div className="flex-1 min-w-0 max-w-[560px]">
        {content.eyebrow.trim() ? (
          <span className="inline-block mb-[13px] text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            {content.eyebrow}
          </span>
        ) : null}

        <h1 className="text-[48px] lg:text-[48px] font-semibold text-slate-900 leading-tight mb-[20px] max-w-[520px]">
          {content.heading}
        </h1>

        {content.description.trim() ? (
          <p className="text-[14px] text-slate-600 leading-relaxed mb-[28px] max-w-[460px]">
            {content.description}
          </p>
        ) : null}

        <div className="flex items-center gap-3 bg-white border border-[#E5EAF0] rounded-full h-[52px] max-w-[540px] shrink-0">
          <SearchIcon size={14} className="text-slate-400 ml-3 shrink-0" />

          <input
            type="text"
            placeholder={content.searchPlaceholder}
            className="flex-1 h-full bg-transparent border-none text-sm text-slate-900 placeholder-slate-400 focus:outline-none pr-3 pl-0 min-w-0"
          />

          <button
            type="button"
            className="w-[40px] h-[40px] rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#0f2a3e] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 mr-1"
            aria-label={content.searchButtonLabel}
          >
            <ArrowRightIcon size={12} />
          </button>
        </div>

        {content.showPopularTags && content.popularTags.length > 0 ? (
          <div className="mt-[20px] items-center flex flex-wrap gap-3">
            <span className="text-[13px] font-medium text-slate-500 whitespace-nowrap">
              Popular search:
            </span>

            {content.popularTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className="text-[11px] font-medium text-slate-700 px-3 py-1 rounded-full border border-[#E5EAF0] bg-white hover:bg-[#F5F7FA] hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183B56] whitespace-nowrap shrink-0"
              >
                {tag.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {content.showVisual ? (
        <div className="relative flex-1 min-w-0 w-full">
          <div className="relative mx-auto w-full max-w-[620px] h-[420px] lg:h-[460px] -mt-5">
            <img
              src={content.visualImage}
              alt={content.visualImageAlt}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            />

            {content.showFloatingCards
              ? visibleCards.map((card) => (
                  <FloatingCard key={card.id} card={card} />
                ))
              : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}
