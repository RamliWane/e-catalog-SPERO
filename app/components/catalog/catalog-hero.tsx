import { SearchIcon, ArrowRightIcon } from "@/lib/icons";

function AbstractVisual({ className }: { className?: string }) {
  return (
    <div
      className={`
        relative w-full h-[320px] rounded-[16px] bg-[#F5F7FA] overflow-hidden
        flex items-center justify-center
        ${className ?? ""}
      `}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef2ff_0%,#ffffff_100%)]" />
      <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] rounded-full bg-blue-100/60 blur-[40px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[240px] h-[240px] rounded-full bg-blue-100/40 blur-[50px]" />
      <div className="relative z-10 flex flex-col items-center gap-4 p-8">
        <div className="w-16 h-16 rounded-[12px] bg-white border border-[#E5EAF2] shadow-sm flex items-center justify-center">
          <SearchIcon size={24} className="text-blue-600" />
        </div>
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-[8px] shadow-sm ${
                i === 1 ? "bg-white border border-[#E5EAF2]" : "bg-blue-50 border border-blue-100"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CatalogHero() {
  return (
    <section className="bg-white py-[48px] px-[32px]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-[48px] items-start">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 px-3 py-[6px] rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
            CATALOG
          </span>
          <h1 className="text-[36px] lg:text-[44px] font-semibold text-slate-900 leading-tight">
            Explore Our Catalog
          </h1>
          <p className="text-[14px] text-slate-600 leading-relaxed max-w-[520px]">
            Discover a curated collection of software, technologies, and digital
            solutions from our trusted partners and in-house products.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <input
              type="text"
              placeholder="Search catalog..."
              className="flex-1 h-[44px] bg-white border border-[#E5EAF2] rounded-full px-5 pr-[44px] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent"
            />
            <button
              type="button"
              className="w-[44px] h-[44px] rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#0f2a3e] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-1"
              aria-label="Search"
            >
              <ArrowRightIcon size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[320px]">
          <AbstractVisual />
        </div>
      </div>
    </section>
  );
}
