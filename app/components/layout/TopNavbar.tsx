function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default function TopNavbar() {
  return (
    <nav className="h-[70px] bg-white flex items-center justify-between px-[32px] shrink-0">
      <div className="flex items-center gap-3 min-w-0 w-full max-w-[440px]">
        <SearchIcon className="w-4 h-4 text-slate-400 shrink-0" />
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
          <SunIcon className="w-[17px] h-[17px]" />
        </button>
        <button
          type="button"
          className="bg-[#183B56] text-white text-sm font-medium px-[18px] py-[10px] rounded-full hover:bg-[#0f2a3e] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183B56] focus-visible:ring-offset-2 flex items-center gap-2"
        >
          Get in Touch
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </nav>
  )
}
