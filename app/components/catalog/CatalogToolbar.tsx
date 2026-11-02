"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import type { Category } from "@/lib/catalog-data"
import {
  CATEGORIES,
  CATEGORY_ICONS,
} from "@/lib/catalog-data"

type SortValue = "Featured" | "Newest" | "Name (A-Z)"

export default function CatalogToolbar({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
}: {
  activeCategory: Category
  setActiveCategory: (category: Category) => void
  sortBy: SortValue
  setSortBy: (value: SortValue) => void
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const nonAllCategories = CATEGORIES.filter((c) => c !== "All") as Exclude<
    Category,
    "All"
  >[]

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-[17px]">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveCategory("All")}
          aria-pressed={activeCategory === "All"}
          className={`rounded-full h-8 px-5 text-[12px] font-medium border transition-colors duration-150 ${
            activeCategory === "All"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          All
        </button>
        {nonAllCategories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat]
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`flex items-center gap-2 rounded-full h-8 px-4 text-[12px] font-medium border transition-colors duration-150 ${
                activeCategory === cat
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Icon
                size={16}
                className={activeCategory === cat ? "text-white" : "text-slate-500"}
              />
              {cat}
            </button>
          )
        })}
      </div>

      <div className="relative inline-block w-full lg:w-auto">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white h-10 px-4 text-sm text-slate-800 w-full lg:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <span>Sort by: {sortBy}</span>
          <ChevronDown size={16} className="text-slate-400 ml-1" />
        </button>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg py-2 z-50"
          >
            {["Featured", "Newest", "Name (A-Z)"].map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSortBy(option as SortValue)
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:bg-slate-100"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
