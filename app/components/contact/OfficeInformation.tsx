import Image from "next/image"
import { ArrowRight, Clock, MapPin, Navigation } from "lucide-react"
import {
  OFFICE_ADDRESS,
  OFFICE_HOURS,
  OFFICE_HOURS_DETAIL,
  OFFICE_IMAGE_SRC,
  OFFICE_MAPS_URL,
  OFFICE_NAME,
} from "./contact-data"

export default function OfficeInformation() {
  return (
    <aside
      aria-labelledby="office-heading"
      className="flex h-full flex-col rounded-[24px] border border-[#E5EBF5] bg-[#F4F7FD] p-5 sm:p-7 lg:p-8"
    >
      <p className="inline-block text-[11px] font-medium text-slate-500 uppercase tracking-widest">
        Our Office
      </p>

      <h2
        id="office-heading"
        className="mt-3 text-[26px] font-bold leading-[1.12] tracking-[-0.02em] text-[#14264B] sm:text-[30px]"
      >
        Visit Our Office
      </h2>

      <p className="mt-3 max-w-[420px] text-[13px] leading-[1.65] text-[#64748B]">
        Our team is always here at our office in Jakarta. Feel free to drop by
        anytime.
      </p>

      <div className="relative mt-5 min-h-[200px] flex-1 overflow-hidden rounded-xl border border-white/80 bg-[#E8EFFA]">
        <Image
          src={OFFICE_IMAGE_SRC}
          alt="Spero team working together at the office"
          fill
          sizes="(min-width: 1280px) 36vw, (min-width: 768px) 40vw, 100vw"
          className="object-cover object-center"
        />
      </div>

      <ul className="mt-5 divide-y divide-[#DDE7F8]">
        <li className="flex gap-3 py-3.5 first:pt-0">
          <MapPin
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[#14264B]"
          />

          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#14264B]">
              {OFFICE_NAME}
            </p>
            <p className="mt-0.5 text-[12px] leading-[1.55] text-[#64748B]">
              {OFFICE_ADDRESS}
            </p>
          </div>
        </li>

        <li className="flex gap-3 py-3.5">
          <Clock
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[#14264B]"
          />

          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#14264B]">
              {OFFICE_HOURS}
            </p>
            <p className="mt-0.5 text-[12px] leading-[1.55] text-[#64748B]">
              {OFFICE_HOURS_DETAIL}
            </p>
          </div>
        </li>

        <li className="flex gap-3 py-3.5 last:pb-0">
          <Navigation
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[#14264B]"
          />

          <div className="min-w-0">
            <a
              href={OFFICE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#14264B] transition-colors duration-150 hover:text-[#3B82F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2"
            >
              Get Directions
              <ArrowRight
                size={14}
                strokeWidth={1.9}
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </li>
      </ul>
    </aside>
  )
}
