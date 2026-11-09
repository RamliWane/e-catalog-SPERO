import { Boxes, Cpu, Layers3, Lightbulb, type LucideIcon } from "lucide-react"

type DashboardStat = {
  label: string
  value: number
  icon: LucideIcon
}

const STATS: DashboardStat[] = [
  { label: "Total Catalog", value: 24, icon: Boxes },
  { label: "Total Services", value: 8, icon: Layers3 },
  { label: "Total Technologies", value: 12, icon: Cpu },
  { label: "Total Solutions", value: 6, icon: Lightbulb },
]

export default function DashboardStats() {
  return (
    <section aria-labelledby="dashboard-stats-heading">
      <h2 id="dashboard-stats-heading" className="sr-only">
        Content statistics
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon

          return (
            <article
              key={stat.label}
              className="rounded-xl border border-[#DDE7F8] bg-white p-5 shadow-[0_2px_8px_rgba(20,33,61,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-[#526786]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-[32px] font-bold leading-none tracking-tight text-[#14213D]">
                    {stat.value}
                  </p>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F5F8FF] text-[#3978FF]">
                  <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
