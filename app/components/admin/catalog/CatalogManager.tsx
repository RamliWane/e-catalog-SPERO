"use client"

import { useMemo, useState } from "react"
import { Boxes, ChevronLeft, ChevronRight } from "lucide-react"
import CatalogTable from "./CatalogTable"
import CatalogToolbar from "./CatalogToolbar"
import {
  getCatalogStatusLabel,
  type CatalogAdminCategory,
  type CatalogAdminItem,
  type CatalogStatusFilter,
} from "@/lib/catalog-admin"

const PAGE_SIZE = 8

type CatalogPaginationProps = {
  page: number
  totalPages: number
  totalItems: number
  startItem: number
  endItem: number
  onPageChange: (page: number) => void
}

function CatalogPagination({
  page,
  totalPages,
  totalItems,
  startItem,
  endItem,
  onPageChange,
}: CatalogPaginationProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-[#DDE7F8] px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
      <p className="text-[11px] text-[#526786]">
        Showing{" "}
        <span className="font-medium text-[#183B56]">
          {startItem}–{endItem}
        </span>{" "}
        of <span className="font-medium text-[#183B56]">{totalItems}</span>{" "}
        entries
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#DDE7F8] bg-white px-2.5 text-[11px] font-medium text-[#526786] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={14} aria-hidden="true" />
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              aria-label={`Go to page ${pageNumber}`}
              aria-current={pageNumber === page ? "page" : undefined}
              onClick={() => onPageChange(pageNumber)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 ${
                pageNumber === page
                  ? "bg-[#14213D] text-white"
                  : "border border-[#DDE7F8] bg-white text-[#526786] hover:bg-[#F8FAFC] hover:text-[#14213D]"
              }`}
            >
              {pageNumber}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#DDE7F8] bg-white px-2.5 text-[11px] font-medium text-[#526786] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default function CatalogManager({
  items,
  categories,
  onEdit,
  onDelete,
}: {
  items: CatalogAdminItem[]
  categories: CatalogAdminCategory[]
  onEdit: (item: CatalogAdminItem) => void
  onDelete: (item: CatalogAdminItem) => void
}) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<number | "all">("all")
  const [status, setStatus] = useState<CatalogStatusFilter>("All Status")
  const [page, setPage] = useState(1)

  const hasActiveFilters =
    search.trim() !== "" || category !== "all" || status !== "All Status"

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()

    return items.filter((item) => {
      const matchesCategory = category === "all" || item.categoryId === category
      const matchesStatus =
        status === "All Status" ||
        getCatalogStatusLabel(item.status) === status
      const matchesSearch =
        query === "" ||
        [item.name, item.shortDescription, item.category].some((value) =>
          value.toLowerCase().includes(query),
        )

      return matchesCategory && matchesStatus && matchesSearch
    })
  }, [category, items, search, status])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const visibleItems = filteredItems.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  )
  const startItem = filteredItems.length === 0 ? 0 : startIndex + 1
  const endItem = Math.min(startIndex + PAGE_SIZE, filteredItems.length)

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleCategoryChange(value: number | "all") {
    setCategory(value)
    setPage(1)
  }

  function handleStatusChange(value: CatalogStatusFilter) {
    setStatus(value)
    setPage(1)
  }

  function handleReset() {
    setSearch("")
    setCategory("all")
    setStatus("All Status")
    setPage(1)
  }

  return (
    <div className="space-y-4">
      <CatalogToolbar
        search={search}
        category={category}
        status={status}
        categories={categories}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
        onReset={handleReset}
      />

      <section
        aria-labelledby="catalog-table-heading"
        className="overflow-hidden rounded-xl border border-[#DDE7F8] bg-white shadow-[0_2px_8px_rgba(20,33,61,0.04)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#DDE7F8] px-4 py-4 sm:px-6">
          <h2
            id="catalog-table-heading"
            className="text-[16px] font-semibold tracking-tight text-[#14213D]"
          >
            Catalog List
          </h2>
          <span className="text-[11px] font-medium text-[#526786]">
            {filteredItems.length} items
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F5F8FF] text-[#3978FF]">
              <Boxes size={20} aria-hidden="true" />
            </span>
            <p className="mt-3 text-[13px] font-semibold text-[#14213D]">
              No catalog items found
            </p>
            <p className="mt-1 text-[12px] text-[#526786]">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <CatalogTable
            items={visibleItems}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}

        <CatalogPagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={filteredItems.length}
          startItem={startItem}
          endItem={endItem}
          onPageChange={setPage}
        />
      </section>
    </div>
  )
}
