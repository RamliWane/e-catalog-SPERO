import {
  Boxes,
  Cpu,
  Lightbulb,
  Plus,
  Wrench,
  type LucideIcon,
} from "lucide-react"

type QuickAction = {
  label: string
  icon: LucideIcon
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: "Add New Catalog", icon: Boxes },
  { label: "Add New Service", icon: Wrench },
  { label: "Add New Technology", icon: Cpu },
  { label: "Add New Solution", icon: Lightbulb },
]

export default function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-heading">
      <h2
        id="quick-actions-heading"
        className="text-[16px] font-semibold tracking-tight text-[#14213D]"
      >
        Quick Actions
      </h2>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon

          return (
            <button
              key={action.label}
              type="button"
              className="group flex min-h-[64px] items-center gap-3 rounded-xl border border-[#DDE7F8] bg-white p-4 text-left shadow-[0_2px_8px_rgba(20,33,61,0.03)] transition-colors hover:border-[#3978FF]/40 hover:bg-[#F8FAFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5F8FF] text-[#3978FF]">
                <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1 text-[12px] font-semibold text-[#14213D] sm:text-[13px]">
                {action.label}
              </span>

              <Plus
                size={15}
                aria-hidden="true"
                className="shrink-0 text-[#A3B3CA] transition-colors group-hover:text-[#3978FF]"
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}
