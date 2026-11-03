"use client"

import { Code2, ArrowRight } from "lucide-react"

export default function CatalogHero() {
  return (
    <section className="relative overflow-hidden bg-white py-[50px] pb-[24px] px-[30px]">
      <div className="max-w-xl">
        <span className="inline-block text-[11px] font-medium text-slate-500 uppercase tracking-widest">
          CATALOG
        </span>
        <h1 className="text-[40px] font-bold leading-tight text-slate-900 mt-[8px] tracking-tight">
          Explore Our Catalog
        </h1>
        <p className="text-md text-slate-600 leading-relaxed max-w-[600px] mt-[10px]">
          Discover a curated collection of software, technologies, and solutions
          from our trusted partners and in-house products.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <input
            type="text"
            placeholder="Search catalog..."
            className="flex-1 h-[40px] bg-white border border-slate-200 rounded-full px-6 pr-[56px] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent"
          />
          <button
            type="button"
            className="w-[56px] h-[40px] rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            aria-label="Search"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 relative w-full h-auto">
        <img src="/main-asset-catalog.png" alt="Hero Image" className="w-full h-auto object-cover" />
      </div>
    </section>
  )
}
