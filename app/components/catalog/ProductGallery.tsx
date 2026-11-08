"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ProductGalleryImage } from "@/lib/catalog-data"

type ProductGalleryProps = {
  productName: string
  images: ProductGalleryImage[]
}

export default function ProductGallery({
  productName,
  images,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images.length) {
    return (
      <section
        aria-labelledby="product-gallery-heading"
        className="min-w-0 rounded-[15px] border border-[#DCE6F5] bg-white p-4 sm:p-5"
      >
        <h2
          id="product-gallery-heading"
          className="text-[18px] font-semibold leading-tight text-[#14213D] sm:text-[20px]"
        >
          Product Gallery
        </h2>
        <p className="mt-1.5 text-[12px] leading-[1.6] text-[#526786] sm:text-[13px]">
          Explore different views of the {productName} interface.
        </p>
        <div className="mt-5 flex aspect-[16/9] items-center justify-center rounded-[11px] border border-[#DCE6F5] bg-[#F3F7FF] text-[12px] text-[#526786]">
          No screenshots available.
        </div>
      </section>
    )
  }

  const activeIndex = Math.min(selectedIndex, images.length - 1)
  const activeImage = images[activeIndex]
  const hasMultipleImages = images.length > 1

  function goTo(index: number) {
    setSelectedIndex((index + images.length) % images.length)
  }

  return (
    <section
      aria-labelledby="product-gallery-heading"
      className="min-w-0 rounded-[15px] border border-[#DCE6F5] bg-white p-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2
            id="product-gallery-heading"
            className="text-[18px] font-semibold leading-tight text-[#14213D] sm:text-[20px]"
          >
            Product Gallery
          </h2>
          <p className="mt-1.5 text-[12px] leading-[1.6] text-[#526786] sm:text-[13px]">
            Explore different views of the {productName} interface.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={!hasMultipleImages}
            aria-label="Show previous gallery image"
            className="inline-flex size-9 items-center justify-center rounded-full border border-[#DCE6F5] bg-white text-[#14213D] transition-colors hover:border-[#B8CCF5] hover:bg-[#F3F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 sm:size-10"
          >
            <ChevronLeft size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>

          <span
            aria-live="polite"
            className="min-w-[42px] text-center text-[11px] font-medium tabular-nums text-[#526786] sm:text-[12px]"
          >
            {activeIndex + 1} / {images.length}
          </span>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={!hasMultipleImages}
            aria-label="Show next gallery image"
            className="inline-flex size-9 items-center justify-center rounded-full border border-[#DCE6F5] bg-white text-[#14213D] transition-colors hover:border-[#B8CCF5] hover:bg-[#F3F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 sm:size-10"
          >
            <ChevronRight size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-[11px] border border-[#DCE6F5] bg-[#F3F7FF]">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="(min-width: 1280px) 52vw, (min-width: 768px) 80vw, 100vw"
          className="object-contain p-2 sm:p-3"
        />
      </div>

      <div aria-live="polite" className="mt-3 min-w-0">
        <h3 className="text-[13px] font-semibold leading-tight text-[#14213D] sm:text-[14px]">
          {activeImage.title}
        </h3>
        <p className="mt-1 text-[11.5px] leading-[1.55] text-[#526786] sm:text-[12px]">
          {activeImage.description}
        </p>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((image, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${image.title}`}
              aria-pressed={isActive}
              className={`relative aspect-[16/10] min-w-[64px] flex-1 overflow-hidden rounded-[8px] border-2 bg-[#F3F7FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 ${
                isActive
                  ? "border-[#3978FF]"
                  : "border-[#DCE6F5] hover:border-[#B8CCF5]"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="120px"
                className="object-cover object-top"
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}
