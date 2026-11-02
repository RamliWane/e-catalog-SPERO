"use client"

import { ArrowRight, Bookmark, ImageOff } from "lucide-react"

type ProductCardProps = {
  id: string
  name: string
  category: string
  description: string
  image?: string
  isSaved: boolean
  onToggleSave: (id: string) => void
}

export default function ProductCard({
  id,
  name,
  category,
  description,
  image,
  isSaved,
  onToggleSave,
}: ProductCardProps) {
  return (
    <article
      className="group relative flex flex-col bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
    >
      <div className="relative w-full h-[130px] rounded-t-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-slate-400">
            <ImageOff size={24} />
            <span className="mt-2 text-xs">Gambar belum tersedia</span>
          </div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            onToggleSave(id)
          }}
          aria-label={`Save ${name}`}
          aria-pressed={isSaved}
          className={`absolute top-[16px] right-[16px] w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
            isSaved ? "text-slate-900" : "text-slate-500"
          }`}
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600 uppercase">
          {category}
        </span>
        <h3 className="mt-[12px] text-lg font-semibold text-slate-900 leading-tight">
          {name}
        </h3>
        <p className="mt-[6px] text-sm text-slate-500 leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-200/50">
          <a
            href="#"
            className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors duration-150 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            View Details
            <ArrowRight
              size={14}
              className={`transition-transform duration-150 hover:translate-x-0.5`}
            />
          </a>
        </div>
      </div>
    </article>
  )
}
