import Sidebar from "@/app/components/layout/Sidebar"
import TopNavbar from "@/app/components/layout/TopNavbar"
import CatalogHero from "@/app/components/catalog/CatalogHero"
import ProductGrid from "@/app/components/catalog/ProductGrid"
import { getPublishedCatalogProducts } from "@/lib/catalog-db"
import { PRODUCTS } from "@/lib/catalog-data"

export default async function CatalogPage() {
  const databaseProducts = await getPublishedCatalogProducts()
  const products = databaseProducts.length > 0 ? databaseProducts : PRODUCTS

  return (
    <div className="flex h-screen bg-white font-sans">
      <Sidebar />
      <div className="ml-[230px] flex min-h-0 flex-1 flex-col">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto px-[30px]">
          <CatalogHero />
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  )
}
