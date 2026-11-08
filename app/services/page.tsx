"use client"

import { useState } from "react"
import Sidebar from "@/app/components/layout/Sidebar"
import TopNavbar from "@/app/components/layout/TopNavbar"
import ServicesHero from "@/app/components/services/ServicesHero"
import ServiceCategoryFilter from "@/app/components/services/ServiceCategoryFilter"
import ServiceExplorer from "@/app/components/services/ServiceExplorer"
import HowWeCanHelp from "@/app/components/services/HowWeCanHelp"
import type { ServiceFilterCategory } from "@/app/components/services/ServiceCategoryFilter"
import FeaturedServices from "../components/services/FeaturedServices"
import BottomCTA from "../components/home/BottomCTA"


export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<ServiceFilterCategory>(
    "All Services"
  )

  return (
    <div className="flex h-screen bg-white font-sans">
      <Sidebar />
      <div className="ml-[230px] flex-1 flex flex-col min-h-0">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto px-[30px]">
          <ServicesHero />
          {/* <ServiceCategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          /> */}
          <ServiceExplorer
            activeCategory={activeCategory}
          />
          <FeaturedServices />
          <HowWeCanHelp />
          <BottomCTA />
        </main>
      </div>
    </div>
  )
}
