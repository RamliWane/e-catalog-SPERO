import Sidebar from "@/app/components/layout/Sidebar";
import TopNavbar from "@/app/components/layout/TopNavbar";
import CatalogHero from "@/app/components/catalog/catalog-hero";
import CategoryFilter from "@/app/components/catalog/category-filter";
import CatalogGrid from "@/app/components/catalog/catalog-grid";

export default function CatalogPage() {
  return (
    <div className="flex h-screen bg-white font-sans">
      <Sidebar />
      <div className="ml-[230px] flex-1 flex flex-col min-h-0">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto">
          <CatalogHero />
          <CategoryFilter />
          <CatalogGrid />
        </main>
      </div>
    </div>
  );
}
