import { FilterIcon, ChevronDownIcon } from "@/lib/icons";

type FilterItem = {
  label: string;
  count?: number;
};

const CATEGORIES: FilterItem[] = [
  { label: "All", count: 24 },
  { label: "Web Development", count: 8 },
  { label: "Mobile App", count: 6 },
  { label: "Cloud & DevOps", count: 4 },
  { label: "UI/UX Design", count: 3 },
  { label: "Data & Analytics", count: 2 },
  { label: "Others", count: 1 },
];

export default function CategoryFilter() {
  return (
    <section className="bg-white px-[32px] pb-[40px] pt-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[16px]">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-4 lg:pb-0">
            <span className="flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-[8px] rounded-full bg-slate-900 text-white text-[12px] font-medium whitespace-nowrap">
              All
            </span>
            {CATEGORIES.slice(1).map((cat) => (
              <a
                key={cat.label}
                href="#"
                className="flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-[8px] rounded-full border border-[#E5EAF2] bg-white text-slate-600 text-[12px] font-medium whitespace-nowrap hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent"
              >
                {cat.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-[10px] rounded-full border border-[#E5EAF2] bg-white text-slate-600 text-[12px] font-medium hover:bg-slate-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent">
              <FilterIcon size={14} className="text-slate-400" />
              Sort by: Featured
              <ChevronDownIcon size={14} className="text-slate-400 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
