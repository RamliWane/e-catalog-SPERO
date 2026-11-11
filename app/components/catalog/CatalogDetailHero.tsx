
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

          <span className="mt-5 inline-flex w-fit items-center rounded-md bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase text-[#142D56]">
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
            className="pointer-events-none absolute inset-0 -z-10 overflow-visible"
          >
            {/* Wide blue ambient glow */}
            <div className="absolute inset-[-25%] bg-[radial-gradient(ellipse_at_55%_50%,rgba(96,165,250,0.30)_0%,rgba(147,197,253,0.22)_35%,rgba(191,219,254,0.12)_55%,transparent_75%)] blur-[45px]" />

            {/* Strong blue glow behind the laptop */}
            <div className="absolute left-[5%] top-[5%] h-[85%] w-[95%] rounded-full bg-blue-400/25 blur-[90px]" />

            {/* Additional blue light on the left */}
            <div className="absolute left-[-10%] top-[15%] h-[70%] w-[65%] rounded-full bg-sky-300/25 blur-[85px]" />

            {/* Soft blue light underneath */}
            <div className="absolute bottom-[-15%] right-[-5%] h-[55%] w-[80%] rounded-full bg-blue-300/25 blur-[80px]" />
          </div>

          <Image
            src="/detail-catalog-image.webp"
            alt={`${product.name} product preview`}
            width={2076}
            height={1242}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="relative h-auto w-full max-w-[520px] object-contain drop-shadow-[0_20px_50px_rgba(20,45,86,0.1)] lg:max-w-[640px]"
          />
        </div>



      </div>
    </section>
  )
}
