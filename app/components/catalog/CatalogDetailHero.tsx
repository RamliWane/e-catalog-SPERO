
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ExternalLink,
  Monitor,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react"
import type { Product } from "@/lib/catalog-data"

const CAPABILITY_ICONS = [Monitor, ShieldCheck, SlidersHorizontal]

export default function CatalogDetailHero({
  product,
}: {
  product: Product
}) {
  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-400 sm:text-xs">
              <li>
                <Link
                  href="/catalog"
                  className="transition-colors duration-150 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  Catalog
                </Link>
              </li>

              <li aria-hidden="true" className="text-slate-300">
                /
              </li>

              <li className="text-slate-400">
                {product.category}
              </li>

              <li aria-hidden="true" className="text-slate-300">
                /
              </li>

              <li>
                <span
                  aria-current="page"
                  className="font-medium text-slate-700"
                >
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>

          <span className="mt-5 inline-flex w-fit items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600">
            {product.category}
          </span>

          <h1 className="mt-4 text-[36px] font-semibold leading-[1.07] tracking-[-0.02em] text-[#14213D] sm:text-[44px] lg:text-[52px]">
            {product.name}
          </h1>

          <p className="mt-4 max-w-[520px] text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-[26px]">
            {product.description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#142D56] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0F2344] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#142D56] focus-visible:ring-offset-2"
            >
              Request a Demo
              <ArrowRight
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            <button
              type="button"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-[#142D56] transition-colors duration-200 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#142D56] focus-visible:ring-offset-2"
            >
              Visit Live Preview
              <ExternalLink
                size={15}
                strokeWidth={1.8}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* Product Capabilities */}
          <ul className="mt-7 flex flex-wrap items-center gap-2.5">
            {product.capabilities.map((label, index) => {
              const Icon =
                CAPABILITY_ICONS[index % CAPABILITY_ICONS.length]

              return (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-3.5 py-1.5 text-[11px] font-medium text-slate-600"
                >
                  <Icon
                    size={13}
                    aria-hidden="true"
                    className="text-black"
                  />
                  {label}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Product Image */}
        <div className="relative isolate flex items-center justify-center lg:justify-end">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(191,219,254,0.55),rgba(239,246,255,0.2)_48%,transparent_72%)] blur-2xl" />

            <div className="absolute right-[8%] top-[6%] size-24 rounded-full bg-blue-300/20 blur-3xl" />
          </div>

          <Image
            src="/detail-catalog-image.webp"
            alt={`${product.name} product preview`}
            width={2076}
            height={1242}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="h-auto w-full max-w-[520px] object-contain drop-shadow-[0_20px_50px_rgba(20,45,86,0.1)] lg:max-w-[640px]"
          />
        </div>
      </div>
    </section>
  )
}
