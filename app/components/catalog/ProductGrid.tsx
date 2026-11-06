"use client"

import { useMemo, useState } from "react"
import type { Category } from "@/lib/catalog-data"
import { PRODUCTS } from "@/lib/catalog-data"
import CatalogToolbar from "@/app/components/catalog/CatalogToolbar"
import ProductCard from "@/app/components/catalog/ProductCard"

type SortValue = "Featured" | "Newest" | "Name (A-Z)"

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [sortBy, setSortBy] = useState<SortValue>("Featured")
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  const filteredAndSorted = useMemo(() => {
    let result = PRODUCTS.filter(
      (p) => activeCategory === "All" || p.category === activeCategory
    )

    result = [...result].sort((a, b) => {
      if (sortBy === "Featured") {
        return a.featuredOrder - b.featuredOrder
      }
      if (sortBy === "Newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return a.name.localeCompare(b.name)
    })

    return result
  }, [activeCategory, sortBy])

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className="bg-white px-[30px]">
      <CatalogToolbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6 pb-10"
      >
        {filteredAndSorted.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-slate-500">
              No products found in this category.
            </p>
          </div>
        ) : (
          filteredAndSorted.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              category={product.category}
              description={product.description}
              image={product.image}
              isSaved={savedIds.has(product.id)}
              onToggleSave={toggleSave}
            />
          ))
        )}
      </div>
    </section>
  )
}
