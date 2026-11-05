"use client"

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
    <section className="relative isolate grid min-w-0 overflow-hidden rounded-lg border border-[#DCE6F5] bg-gradient-to-br from-white via-[#F1F6FF] to-[#A8D1FF] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)]">
      <div className="relative z-10 flex min-w-0 flex-col items-start justify-center p-5 sm:p-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2463FF]">
            {service.number}
          </span>

          <span className="text-[10px] font-medium uppercase tracking-wide text-[#526786]">
            {service.title}
          </span>
        </div>

        <h3 className="text-xl font-bold leading-tight text-[#14213D]">
          {service.title}
        </h3>

        <p className="mt-2 text-[13px] leading-relaxed text-[#526786]">
          {service.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#DCE6F5] bg-white/90 px-3 py-1 text-[11px] font-medium text-[#526786]"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href="#"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#101B35] px-5 py-2 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[#2463FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Explore Service
          <ArrowRightIcon size={14} />
        </a>
      </div>

      <div className="relative min-w-0 overflow-hidden p-0 md:flex md:items-stretch md:py-0 md:pr-0">
        <img
          src="/asset-catalog-3.png"
          alt={`${service.title} illustration`}
          className="block h-full w-full object-cover object-center [mask-image:linear-gradient(to_right,transparent,black_35%)]"
        />
      </div>
    </section>
  )
}