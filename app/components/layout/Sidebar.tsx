interface NavItem {
  name: string
  active?: boolean
}

const PRIMARY_NAV: NavItem[] = [
  { name: "Home", active: true },
  { name: "Catalog" },
  { name: "Services" },
  { name: "Technologies" },
  { name: "Solutions" },
  { name: "About" },
]

const QUICK_ACCESS: NavItem[] = [
  { name: "Popular" },
  { name: "New Releases" },
  { name: "Saved" },
]

function HouseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function LayoutGridIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="21" />
    </svg>
  )
}

function Layers3Icon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function Code2Icon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function LightbulbIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 12h6a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3z" />
      <path d="M9 21v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function UserRoundIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="18 6 12 12 6 18" />
      <polyline points="12 18 6 6" />
    </svg>
  )
}

function BookmarkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

import type { ReactElement } from "react"

const ICONS: Record<string, () => ReactElement> = {
  House: HouseIcon,
  LayoutGrid: LayoutGridIcon,
  Layers3: Layers3Icon,
  Code2: Code2Icon,
  Lightbulb: LightbulbIcon,
  UserRound: UserRoundIcon,
  Star: StarIcon,
  Zap: ZapIcon,
  Bookmark: BookmarkIcon,
}

const ICON_FOR_ITEM: Record<string, string> = {
  Home: "House",
  Catalog: "LayoutGrid",
  Services: "Layers3",
  Technologies: "Code2",
  Solutions: "Lightbulb",
  About: "UserRound",
  Popular: "Star",
  "New Releases": "Zap",
  Saved: "Bookmark",
}

function CubeIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <polygon
        points="48,12 84,40 48,68 12,40"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <polygon
        points="84,40 84,76 48,68"
        fill="#bfdbfe"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <polygon
        points="12,40 12,76 48,68"
        fill="#93c5fd"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <line x1="48" y1="12" x2="48" y2="68" stroke="#3b82f6" strokeWidth="2" />
    </svg>
  )
}

function NavItem({ name, active }: NavItem) {
  const Icon = ICONS[ICON_FOR_ITEM[name]]
  return (
    <a
      href="#"
      className={`
        flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
        transition-colors duration-150
        ${active ? "bg-[#F0F3F7] text-slate-900" : "text-slate-600 hover:bg-slate-100"}
      `}
      aria-current={active ? "page" : undefined}
    >
      <Icon />
      <span>{name}</span>
    </a>
  )
}

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-[230px] flex flex-col border-r border-slate-200 bg-white shrink-0">
      <div className="px-[28px] pt-[28px] pb-[32px]">
        <h2 className="text-[24px] font-semibold text-slate-900">Spero</h2>
      </div>

      <nav className="flex-1 px-5 space-y-2" aria-label="Primary navigation">
        {PRIMARY_NAV.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
      </nav>

      <div className="px-5">
        <div className="border-t border-slate-200 my-[20px]" />
        <h3 className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-3">
          Quick Access
        </h3>
        <nav className="space-y-2" aria-label="Quick access">
          {QUICK_ACCESS.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </nav>
      </div>

      <div className="mt-auto px-5 pb-[28px]">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="mb-4 flex items-center justify-center">
            <CubeIcon />
          </div>
          <h3 className="text-sm font-medium text-slate-900 mb-2">
            Need a custom solution?
          </h3>
          <p className="text-xs text-slate-500 mb-4">{`Let's build something together.`}</p>
          <button
            className="w-full bg-slate-900 text-white text-xs font-medium py-2 px-4 rounded-full flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Contact Us
            <ArrowRightIcon />
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mt-4">
          {"\u00A9"} 2025 Spero. All rights reserved.
        </p>
      </div>
    </aside>
  )
}
