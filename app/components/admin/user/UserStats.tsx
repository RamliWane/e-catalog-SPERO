import { UserCheck, Users, UserX, type LucideIcon } from "lucide-react"
import { USER_SUMMARY } from "./user-data"

type UserSummaryItem = {
  label: string
  value: number
  icon: LucideIcon
  iconClassName: string
}

const SUMMARY_ITEMS: UserSummaryItem[] = [
  {
    label: "Total Users",
    value: USER_SUMMARY.total,
    icon: Users,
    iconClassName: "bg-[#F5F8FF] text-[#3978FF]",
  },
  {
    label: "Active Users",
    value: USER_SUMMARY.active,
    icon: UserCheck,
    iconClassName: "bg-[#EFF6FF] text-[#183B56]",
  },
  {
    label: "Inactive Users",
    value: USER_SUMMARY.inactive,
    icon: UserX,
    iconClassName: "bg-[#F1F5F9] text-[#526786]",
  },
]

export default function UserStats() {
  return (
    <section aria-labelledby="user-summary-heading">
      <h2 id="user-summary-heading" className="sr-only">
        User summary
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SUMMARY_ITEMS.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.label}
              className="rounded-xl border border-[#DDE7F8] bg-white p-5 shadow-[0_2px_8px_rgba(20,33,61,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-[#526786]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-[30px] font-bold leading-none tracking-tight text-[#14213D]">
                    {item.value}
                  </p>
                </div>

                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.iconClassName}`}
                >
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
