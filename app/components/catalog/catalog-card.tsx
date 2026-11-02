import { BookmarkIcon, ArrowRightIcon } from "@/lib/icons";

type CatalogCardProps = {
  category: string;
  title: string;
  desc: string;
  image: React.ReactElement;
};

export default function CatalogCard({
  category,
  title,
  desc,
  image,
}: CatalogCardProps) {
  return (
    <article
      className="group relative flex flex-col bg-white border border-[#E5EAF2] rounded-[12px] overflow-hidden transition-all duration-200 hover:border-blue-600/50 hover:-translate-y-[3px] hover:shadow-lg hover:shadow-blue-50/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1"
    >
      <div className="relative w-full h-[220px] rounded-t-[12px] overflow-hidden bg-[#F5F7FA]">
        {image}
        <button
          type="button"
          className="absolute top-[16px] right-[16px] w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Bookmark"
        >
          <BookmarkIcon size={14} />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full bg-blue-50 text-blue-700 text-[10px] font-medium uppercase tracking-wider whitespace-nowrap">
          {category}
        </span>
        <h3 className="text-[15px] font-semibold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-[13px] text-slate-600 leading-relaxed line-clamp-2 flex-1">
          {desc}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#E5EAF2]/50">
          <a
            href="#"
            className="text-[13px] font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150 focus-visible:underline"
          >
            View Details
            <ArrowRightIcon size={12} className="ml-1" />
          </a>
        </div>
      </div>
    </article>
  );
}
