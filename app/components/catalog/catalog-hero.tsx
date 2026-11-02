import { SearchIcon, ArrowRightIcon } from "@/lib/icons";

function TechnologyVisual({ className }: { className?: string }) {
  return (
    <div
      className={`
        relative w-full h-[420px] rounded-[20px] bg-[#F5F7FA] overflow-hidden
        flex items-center justify-center
        ${className ?? ""}
      `}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef2ff_0%,#ffffff_100%)]" />
      <div className="absolute top-1/6 left-1/6 w-[280px] h-[280px] rounded-full bg-blue-100/60 blur-[64px]" />
      <div className="absolute bottom-1/6 right-1/6 w-[320px] h-[320px] rounded-full bg-blue-100/40 blur-[80px]" />
      <div className="relative z-10 flex flex-col items-center gap-8 p-12 w-full h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-xl bg-white border border-[#E5EAF2] shadow-sm flex items-center justify-center">
            <SearchIcon size={28} className="text-blue-600" />
          </div>
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-16 h-16 rounded-xl shadow-sm ${
                  i === 1 ? "bg-white border border-[#E5EAF2]" : "bg-blue-50 border border-blue-100"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-full h-[200px] rounded-xl bg-[#E5EAF2] border border-[#CFD8E2] relative overflow-hidden">
          <rect x="0" y="0" width="100%" height="100%" fill="#E5EAF2" />
          <rect x="40" y="40" width="120" height="8" fill="#C7D2FE" rx="4" />
          <rect x="40" y="64" width="96" height="8" fill="#C7D2FE" rx="4" />
          <rect x="40" y="88" width="120" height="8" fill="#C7D2FE" rx="4" />
          <rect x="200" y="40" width="200" height="120" fill="#DBEAFE" rx="8" />
          <rect x="200" y="176" width="200" height="80" fill="#D7E4FF" rx="8" />
          <rect x="440" y="40" width="200" height="160" fill="#DBEAFE" rx="8" />
          <rect x="40" y="160" width="120" height="60" fill="#C7D2FE" rx="8" />
        </div>
      </div>
    </div>
  );
}

export default function CatalogHero() {
  return (
    <section className="bg-white py-[80px] px-[32px]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-[64px] items-start">
        <div className="flex flex-col gap-8">
          <span className="inline-flex items-center gap-2 px-4 py-[8px] rounded-full bg-blue-50 text-blue-700 text-[12px] font-semibold uppercase tracking-widest whitespace-nowrap">
            CATALOG
          </span>
          <h1 className="text-[48px] lg:text-[56px] font-semibold text-slate-900 leading-tight">
            Explore Our Catalog
          </h1>
          <p className="text-[17px] text-slate-600 leading-relaxed max-w-[560px]">
            Discover a curated collection of software, technologies, and digital
            solutions from our trusted partners and in-house products.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <input
              type="text"
              placeholder="Search catalog..."
              className="flex-1 h-[56px] bg-white border border-[#E5EAF2] rounded-full px-6 pr-[56px] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent"
            />
            <button
              type="button"
              className="w-[56px] h-[56px] rounded-full bg-[#183B56] text-white flex items-center justify-center hover:bg-[#0f2a3e] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183B56] focus-visible:ring-offset-1"
              aria-label="Search"
            >
              <ArrowRightIcon size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[420px]">
          <TechnologyVisual />
        </div>
      </div>
    </section>
  );
}
