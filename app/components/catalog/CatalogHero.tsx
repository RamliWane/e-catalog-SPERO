"use client"

import { Code2, ArrowRight } from "lucide-react"

export default function CatalogHero() {
  return (
    <section className="relative overflow-hidden bg-white py-[60px] pb-[24px] px-[30px]">
      <div className="max-w-[620px]">
        <span className="uppercase text-sm font-medium tracking-[0.2em] text-slate-500">
          CATALOG
        </span>
        <h1 className="text-[56px] font-bold leading-tight text-slate-900 mt-[8px] tracking-tight">
          Explore Our Catalog
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-[600px] mt-[16px]">
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

      <div className="hidden lg:block absolute top-0 right-0 pointer-events-none w-full h-full">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-50/40 blur-[128px]" />
        <div className="absolute -bottom-32 -right-48 w-[360px] h-[360px] rounded-full bg-blue-100/60 blur-[96px]" />

        <div className="absolute top-48 right-48 w-24 h-24 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-lg rotate-6" />
        <div className="absolute top-64 right-64 w-20 h-20 bg-white/60 backdrop-blur-sm border border-slate-200/40 rounded-2xl shadow-md rotate-[-6deg]" />
        <div className="absolute top-80 right-20 w-24 h-24 bg-slate-900 rounded-2xl shadow-2xl rotate-3 flex items-center justify-center">
          <Code2 size={24} className="text-white" />
          <div className="absolute top-0 right-0 w-[14px] h-[14px] bg-blue-500 rounded-full border-2 border-white" />
        </div>
      </div>
    </section>
  )
}
