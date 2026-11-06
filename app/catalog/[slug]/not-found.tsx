import Link from "next/link"

export default function CatalogItemNotFound() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold text-slate-900">Item not found</h1>

      <p className="mt-2 text-sm text-slate-500">
        The catalog item you are looking for does not exist.
      </p>

      <Link
        href="/catalog"
        className="mt-6 inline-flex text-sm font-medium text-slate-600 transition-colors duration-150 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        Back to Catalog
      </Link>
    </div>
  )
}
