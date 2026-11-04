"use client"

import { useState } from "react"
import type { ServiceFilterCategory } from "./ServiceCategoryFilter"
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
    <section className="bg-white py-10 px-2">
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-4 flex flex-col gap-4 min-w-0">
          {filteredServices.map((service) => (
            <ServiceListItem
              key={service.id}
              service={service}
              isActive={service.id === activeId}
              onSelect={setActiveId}
            />
          ))}
        </div>

        <div className="lg:col-span-8 flex flex-col h-full">
          <ServiceDetailPanel service={activeService} />
        </div>
      </div>
    </section>
  )
}
