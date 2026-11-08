import Image from "next/image"
import { Check } from "lucide-react"
import {
  getProductGallery,
  type Product,
} from "@/lib/catalog-data"

const SPERO_ABOUT = {
  heading: "A powerful dashboard for modern teams",
  description:
    "Spero Dashboard is designed to help businesses work smarter, with real-time insights, automated workflows, and seamless collaboration tools.",
  benefits: [
    "Boost productivity",
    "Make data-driven decisions",
    "Scale with confidence",
  ],
}

const HEADLINES_BY_CATEGORY: Record<string, string> = {
  "Web Development": "A fast, scalable foundation for modern digital teams",
  "Mobile App": "A mobile experience designed around everyday use",
  "Cloud & DevOps": "Cloud infrastructure built to keep modern teams moving",
  "UI/UX Design": "A design system built for consistent product experiences",
  "Data & Analytics": "A clearer way to turn everyday data into decisions",
  Others: "A dependable solution built for modern workflows",
}

const ABOUT_IMAGE_BY_SLUG: Record<string, { src: string; alt: string }> = {
  "spero-dashboard": {
    src: "/asset-catalog-3.png",
    alt: "Spero team collaborating in a bright workspace",
  },
}

function getAboutContent(product: Product) {
  if (product.slug === "spero-dashboard") {
    return SPERO_ABOUT
  }

  return {
    heading:
      HEADLINES_BY_CATEGORY[product.category] ??
      `A closer look at ${product.name}`,
    description: product.description,
    benefits: product.capabilities.slice(0, 3),
  }
}

function getAboutImage(product: Product) {
  const override = ABOUT_IMAGE_BY_SLUG[product.slug]

  if (override) {
    return override
  }

  const [image] = getProductGallery(product)

  return {
    src: image.src,
    alt: `${product.name} product preview`,
  }
}

export default function AboutProductSection({ product }: { product: Product }) {
  const about = getAboutContent(product)
  const image = getAboutImage(product)

  return (
    <section
      aria-labelledby="about-product-heading"
      className="relative isolate mt-10 overflow-hidden pb-8 sm:mt-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-20 -z-10 size-[340px] rounded-full bg-[radial-gradient(circle,#EAF2FF_0%,rgba(234,242,255,0)_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-64 w-[120%] -translate-x-1/2 rounded-[50%] bg-[#F3F7FF]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-44 w-2/3 bg-gradient-to-t from-[#F3F7FF]/80 to-transparent"
      />

      <div className="relative z-10 grid min-w-0 grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)] md:gap-8 xl:gap-10">
        <div className="min-w-0">
          
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            About Our Product
          </p>

          <h2
            id="about-product-heading"
            className="mt-3 text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-[#14264A] sm:text-[30px] md:text-[28px] xl:text-[32px]"
          >
            {about.heading}
          </h2>

          <p className="mt-3 text-[13px] leading-[1.65] text-[#526786] sm:text-[14px]">
            {about.description}
          </p>

          <ul className="mt-5 space-y-2.5">
            {about.benefits.map((benefit) => (
              <li key={benefit} className="flex min-w-0 items-center gap-2.5">
                <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#3978FF] text-white">
                  <Check
                    size={11}
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                </span>

                <span className="text-[13px] font-medium leading-tight text-[#14264A]">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-w-0">
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[14px] border border-[#DCE6F5]/70 bg-[#F3F7FF]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1280px) 49vw, (min-width: 768px) 55vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
