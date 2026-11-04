import { ArrowRightIcon } from "@/lib/icons"
import type { Service } from "@/lib/services-data"

type ServiceListItemProps = {
  service: Service
  isActive: boolean
  onSelect: (id: string) => void
}

export default function ServiceListItem({
  service,
  isActive,
  onSelect,
}: ServiceListItemProps) {
  return (
    <button
      onClick={() => onSelect(service.id)}
      className={`flex items-center justify-between w-full px-4 py-2 rounded-[10px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2463FF] focus-visible:ring-offset-1 ${
        isActive
          ? "bg-gradient-to-r from-[#E0E7FF] to-[#F0F9FF] border-l-3 border-l-[#2463FF] text-[#2463FF]"
          : "bg-transparent border-b border-slate-100 text-slate-900 hover:bg-[#F5F7FA]"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="w-[24px] text-[15px] font-semibold text-slate-500">
          {service.number}
        </span>
        <span className="text-[15px] font-medium leading-tight truncate">
          {service.title}
        </span>
      </div>
      <ArrowRightIcon size={14} className="text-slate-400 group-hover:text-[#2463FF] transition-colors duration-200 shrink-0" />
    </button>
  )
}
