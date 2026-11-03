"use client"

import { ArrowRight } from "lucide-react"

export default function CatalogHero() {
  return (
    <section className="bg-white px-8 pt-8 pb-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">

        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
            Catalog
          </span>

          <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight text-slate-900">
            Explore Our Catalog
          </h1>

          <p className="mt-2 max-w-xl leading-relaxed text-slate-600">
            Discover a curated collection of software, technologies, and
            solutions from our trusted partners and in-house products.
          </p>

          <form className="mt-5 flex max-w-xl items-center gap-3">
            <input
              type="search"
              placeholder="Search catalog..."
              className="h-11 min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              aria-label="Search catalog"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

       
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <img
            src="/main-asset-catalog.png"
            alt="Software catalog illustration"
            className="block max-h-72 w-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}