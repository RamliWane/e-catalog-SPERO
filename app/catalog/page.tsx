import Sidebar from "@/app/components/layout/Sidebar"
import TopNavbar from "@/app/components/layout/TopNavbar"
import CatalogHero from "@/components/catalog/CatalogHero"
import ProductGrid from "@/components/catalog/ProductGrid"

export default function CatalogPage() {
  return (
    <div className="flex h-screen bg-white font-sans">
      <Sidebar />
      <div className="ml-[230px] flex-1 flex flex-col min-h-0">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto px-[30px]">
          <CatalogHero />
          <ProductGrid />
        </main>
      </div>
    </div>
  )
}
