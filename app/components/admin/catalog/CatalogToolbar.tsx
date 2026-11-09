import { ChevronDown, RotateCcw, Search } from "lucide-react"
import {
  CATALOG_CATEGORIES,
  CATALOG_STATUSES,
  type CatalogCategoryFilter,
  type CatalogStatusFilter,
} from "./catalog-data"

type CatalogToolbarProps = {
  search: string
  category: CatalogCategoryFilter
  status: CatalogStatusFilter
  hasActiveFilters: boolean
  onSearchChange: (value: string) => void
  onCategoryChange: (value: CatalogCategoryFilter) => void
  onStatusChange: (value: CatalogStatusFilter) => void
  onReset: () => void
}

const fieldClassName =
  "h-10 w-full rounded-lg border border-[#DDE7F8] bg-white text-[12px] text-[#14213D] transition-colors focus:border-[#3978FF] focus:outline-none focus:ring-2 focus:ring-[#3978FF]/20"

export default function CatalogToolbar({
  search,
  category,
  status,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onReset,
}: CatalogToolbarProps) {
  return (
    <section
      aria-label="Catalog search and filters"
      className="rounded-xl border border-[#DDE7F8] bg-white p-4 shadow-[0_2px_8px_rgba(20,33,61,0.04)]"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_190px_160px_auto]">
        <div className="relative sm:col-span-2 xl:col-span-1">
          <label htmlFor="catalog-search" className="sr-only">
            Search catalog
          </label>
          <Search
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8CA8]"
          />
          <input
            id="catalog-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search catalog..."
            className={`${fieldClassName} pl-9 pr-3 placeholder:text-[#8A9AB5]`}
          />
        </div>

        <div className="relative">
          <label htmlFor="catalog-category" className="sr-only">
            Filter by category
          </label>
          <select
            id="catalog-category"
            value={category}
            onChange={(event) =>
              onCategoryChange(event.target.value as CatalogCategoryFilter)
            }
            className={`${fieldClassName} appearance-none px-3 pr-9`}
          >
            {CATALOG_CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8CA8]"
          />
        </div>

        <div className="relative">
          <label htmlFor="catalog-status" className="sr-only">
            Filter by status
          </label>
          <select
            id="catalog-status"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as CatalogStatusFilter)
            }
            className={`${fieldClassName} appearance-none px-3 pr-9`}
          >
            {CATALOG_STATUSES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8CA8]"
          />
        </div>

        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE7F8] bg-white px-3 text-[12px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2 xl:col-span-1"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Reset Filter
        </button>
      </div>
    </section>
  )
}
