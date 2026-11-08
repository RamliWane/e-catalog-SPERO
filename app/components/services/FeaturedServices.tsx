
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const BENEFITS = [
  "Scalable & Flexible Architecture",
  "Expert Team & Ongoing Support",
  "Proven Track Record",
]

export default function FeaturedServices() {
  return (
    <section className="bg-white px-5 py-5 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1fr] lg:gap-10">
        {/* Image */}
        <div className="relative min-w-0">
          <div
            aria-hidden="true"
            className="absolute -left-3 -top-3 h-28 w-28 rounded-[35px] bg-[#DCE8FF] sm:-left-5 sm:-top-3 sm:h-36 sm:w-36"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-3 right-5 h-28 w-40 rounded-[40px] bg-[#E8F0FF] sm:-bottom-4 sm:right-8 sm:h-36 sm:w-52"
          />

          <div className="relative aspect-[1.48/1] overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
            <Image
              src="/asset-catalog-3.png"
              alt="Digital dashboard displayed on a laptop"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Client badge */}
          <div className="absolute bottom-4 left-3 flex items-center gap-3 rounded-xl border border-slate-100 bg-white/95 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-sm sm:bottom-5 sm:left-4">
            <div>
              <p className="text-[11px] font-semibold text-[#14213D] sm:text-xs">
                Trusted by 100+ Clients
              </p>

              <div className="mt-2 flex items-center">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="-ml-1.5 flex size-6 items-center justify-center rounded-full border-2 border-white bg-[#DCE8FF] text-[9px] font-semibold text-[#244675] first:ml-0"
                  >
                    {item}
                  </div>
                ))}

                <span className="ml-1 flex h-5 min-w-7 items-center justify-center rounded-full bg-[#E8F0FF] px-1 text-[8px] font-semibold text-blue-600">
                  +96
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 lg:pl-2">
          <span className="inline-block text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            Our Featured Services
          </span>

          <h2 className="mt-3 max-w-lg text-3xl font-bold leading-[1.12] tracking-tight text-[#14213D] sm:text-4xl">
            Solutions Built for
            <br className="hidden sm:block" /> Real Business Impact
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-[#526786] sm:text-[14px]">
            We deliver more than just technology. Our services are designed
            to solve real problems, improve efficiency, and drive growth.
          </p>

          <ul className="mt-5 space-y-2.5">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-2.5 text-xs font-medium text-[#405575] sm:text-[13px]"
              >
                <CheckCircle2
                  size={15}
                  strokeWidth={2.5}
                  className="shrink-0 fill-blue-500 text-white"
                  aria-hidden="true"
                />
                {benefit}
              </li>
            ))}
          </ul>

          <Link
            href="/services"
            className="group mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#14213D] px-5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#244675] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Learn More
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
