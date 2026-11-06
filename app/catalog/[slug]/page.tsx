import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import Sidebar from "@/app/components/layout/Sidebar"
import TopNavbar from "@/app/components/layout/TopNavbar"
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
    <div className="mx-auto max-w-3xl">
      <Link
        href="/catalog"
        className="text-sm font-medium text-slate-600 transition-colors duration-150 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        Back to Catalog
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-slate-900">
        {product.name}
      </h1>

      <p className="mt-2 text-sm text-slate-500">Slug: {product.slug}</p>
    </div>
  )
}

export default function CatalogItemPage({
  params,
}: PageProps<"/catalog/[slug]">) {
  return (
    <div className="flex h-screen bg-white font-sans">
      <Sidebar />
      <div className="ml-[230px] flex-1 flex flex-col min-h-0">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto px-[30px] py-10">
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
