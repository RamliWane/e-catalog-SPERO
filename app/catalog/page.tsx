import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import CatalogHero from "../components/catalog/catalog-hero";
import CategoryFilter from "../components/catalog/category-filter";
import CatalogGrid from "../components/catalog/catalog-grid";

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
