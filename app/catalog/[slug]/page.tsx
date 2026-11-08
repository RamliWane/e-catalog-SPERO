import { Suspense } from "react"
import { notFound } from "next/navigation"
import Sidebar from "@/app/components/layout/Sidebar"
import TopNavbar from "@/app/components/layout/TopNavbar"
import CatalogDetailHero from "@/app/components/catalog/CatalogDetailHero"
import CatalogOverviewSection from "@/app/components/catalog/CatalogOverviewSection"
import { getProductBySlug, PRODUCTS } from "@/lib/catalog-data"

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }))
}

async function CatalogItemDetail({
  params,
}: Pick<PageProps<"/catalog/[slug]">, "params">) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <CatalogDetailHero product={product} />
      <CatalogOverviewSection product={product} />
    </>
  )
}

export default function CatalogItemPage({
  params,
}: PageProps<"/catalog/[slug]">) {
  return (
    <div className="flex h-screen bg-white font-sans">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:ml-[230px]">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto px-5 py-8 sm:px-[30px] lg:py-10">
          <Suspense
            fallback={<p className="text-sm text-slate-500">Loading...</p>}
          >
            <CatalogItemDetail params={params} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
