"use client"

import { useState } from "react"
import type { ServiceFilterCategory } from "@/app/components/services/ServiceCategoryFilter"
import { SERVICES } from "@/lib/services-data"
import ServiceListItem from "@/app/components/services/ServiceListItem"
import ServiceDetailPanel from "@/app/components/services/ServiceDetailPanel"

export default function ServiceExplorer({
  activeCategory,
}: {
  activeCategory: ServiceFilterCategory
}) {
  const [activeId, setActiveId] = useState("1")
  const activeService = SERVICES.find((s) => s.id === activeId) ?? null

  const filteredServices =
    activeCategory === "All Services"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory)

  return (
    <section className="bg-white py-[40px] px-[30px]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[40px] items-start">
        {/* Left column: service list */}
        <div className="lg:col-span-4 flex flex-col gap-[8px] min-w-0">
          {filteredServices.map((service) => (
            <ServiceListItem
              key={service.id}
              service={service}
              isActive={service.id === activeId}
              onSelect={setActiveId}
            />
          ))}
        </div>

        {/* Right column: detail panel */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <ServiceDetailPanel service={activeService} />
        </div>
      </div>
    </section>
  )
}
