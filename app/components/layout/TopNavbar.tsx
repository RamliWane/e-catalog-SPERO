import { SearchIcon, SunIcon, ArrowRightIcon } from "@/lib/icons";

export default function TopNavbar() {
  return (
    <nav className="h-[70px] bg-white flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-3 min-w-0 w-full max-w-[440px]">
        <SearchIcon size={12} className="text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search for services, solutions, or technologies..."
          className="flex-1 h-10 bg-white border border-[#E5EAF0] rounded-full px-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none min-w-0"
        />
        <div className="text-[11px] font-medium text-slate-400 ml-2 shrink-0">
          ⌘ K
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          aria-label="Toggle theme"
          className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-1"
        >
          <SunIcon size={14} />
        </button>
        <button
          type="button"
          className="bg-[#183B56] text-white text-sm font-medium px-[18px] py-[10px] rounded-full hover:bg-[#0f2a3e] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183B56] focus-visible:ring-offset-2 flex items-center gap-2"
        >
          Get in Touch
          <ArrowRightIcon size={12} />
        </button>
      </div>
    </nav>
  );
}
