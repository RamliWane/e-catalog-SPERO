import { ArrowRightIcon } from "@/lib/icons"
import type { Service } from "@/lib/services-data"

type ServiceDetailPanelProps = {
  service: Service | null
}

export default function ServiceDetailPanel({
  service,
}: ServiceDetailPanelProps) {
  if (!service) {
    return null
  }

  return (
    <section className="relative overflow-hidden bg-white border border-[#DCE6F5] rounded-[14px] h-full flex">
      {/* Left: text content */}
      <div className="relative z-10 w-[55%] p-7 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-[10px]">
          <span className="text-[10px] font-semibold text-[#2463FF] uppercase tracking-widest">
            {service.number}
          </span>
          <span className="text-[10px] font-medium text-[#526786] uppercase">
            {service.title}
          </span>
        </div>
        <h3 className="text-[26px] font-bold leading-tight text-[#14213D] mb-[10px]">
          {service.title}
        </h3>
        <p className="text-[15px] text-[#526786] leading-relaxed mb-[16px] max-w-[380px]">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-[16px]">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full border border-[#E2EAF5] bg-white text-[11px] font-medium text-[#526786]"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full border border-[#2463FF] bg-[#2463FF] px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1"
        >
          Explore Service
          <ArrowRightIcon size={14} className="transition-transform duration-200 hover:translate-x-0.5" />
        </a>
      </div>

      {/* Right: image */}
      <div className="relative w-[45%] h-full flex items-center justify-center overflow-hidden">
        <img
          src="/asset-section-2.png"
          alt={`${service.title} illustration`}
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#101B35] to-transparent opacity-60 pointer-events-none" />
      </div>
    </section>
  )
}
