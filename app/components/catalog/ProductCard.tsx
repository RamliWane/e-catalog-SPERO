"use client"

import Link from "next/link"
import { ArrowRightIcon } from "@/lib/icons"

type ProductCardProps = {
  id: string
  slug: string
  name: string
  category: string
  description: string
  image?: string
  isSaved: boolean
  onToggleSave: (id: string) => void
}

export default function ProductCard({
  slug,
  name,
  category,
  description,
  image,
}: ProductCardProps) {
  return (
    <Link
      href={`/catalog/${slug}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[2/1] w-full overflow-hidden bg-slate-100">
        <img
          src={image ?? "/dummy-image-catalog.jpeg"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="w-fit max-w-full truncate rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-medium leading-none text-blue-600">
          {category}
        </span>

        <h3 className="mt-1 line-clamp-1 text-[15px] font-semibold leading-5 text-slate-900">
          {name}
        </h3>

        <p className="mt-1 line-clamp-2 text-[12px] leading-[18px] text-slate-500">
          {description}
        </p>

        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-900 transition-colors duration-150 group-hover:text-blue-600">
            View Details
            <ArrowRightIcon
              size={14}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  )
}
