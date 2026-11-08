import { ArrowRight, MapPin } from "lucide-react"
import { OFFICE_MAPS_URL } from "./contact-data"

function MapIllustration() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,#DCEBFF_0%,transparent_58%)]" />

      <svg
        viewBox="0 0 760 240"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern
            id="contact-map-grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M36 0H0V36"
              fill="none"
              stroke="#DCE8F6"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="760" height="240" fill="#EDF3FB" />
        <rect
          width="760"
          height="240"
          fill="url(#contact-map-grid)"
          opacity="0.65"
        />

        <g fill="#E3ECF8" stroke="#D7E4F3" strokeWidth="2">
          <rect x="420" y="24" width="120" height="54" rx="8" />
          <rect x="570" y="22" width="100" height="72" rx="8" />
          <rect x="438" y="112" width="90" height="48" rx="8" />
          <rect x="552" y="124" width="136" height="82" rx="8" />
          <rect x="330" y="150" width="82" height="58" rx="8" />
          <rect x="230" y="36" width="104" height="48" rx="8" />
          <rect x="86" y="132" width="92" height="64" rx="8" />
          <rect x="42" y="28" width="126" height="70" rx="8" />
        </g>

        <g fill="none" strokeLinecap="round">
          <path
            d="M0 96C120 96 184 118 280 126S420 118 760 74"
            stroke="#FFFFFF"
            strokeWidth="22"
          />
          <path
            d="M360 0C382 70 402 98 410 240"
            stroke="#FFFFFF"
            strokeWidth="18"
          />
          <path
            d="M0 190C150 168 250 206 420 196S610 172 760 190"
            stroke="#FFFFFF"
            strokeWidth="16"
          />
          <path
            d="M180 0C170 80 190 170 200 240"
            stroke="#FFFFFF"
            strokeWidth="12"
          />

          <path
            d="M0 96C120 96 184 118 280 126S420 118 760 74"
            stroke="#D6E5F6"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <path
            d="M360 0C382 70 402 98 410 240"
            stroke="#D6E5F6"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
        </g>

        <path
          d="M210 210C280 198 340 160 398 150S500 116 532 92"
          fill="none"
          stroke="#93C5FD"
          strokeWidth="4"
          strokeDasharray="8 8"
          strokeLinecap="round"
        />

        <text
          x="248"
          y="120"
          fill="#93A4BE"
          fontSize="9"
          fontWeight="600"
          letterSpacing="1.6"
          transform="rotate(-4 248 120)"
        >
          JL. SUDIRMAN
        </text>

        <text
          x="552"
          y="215"
          fill="#A6B5C9"
          fontSize="9"
          fontWeight="600"
          letterSpacing="2"
        >
          JAKARTA
        </text>

        <g transform="translate(520 78)">
          <circle r="30" fill="#3B82F6" opacity="0.12" />
          <circle r="18" fill="#3B82F6" opacity="0.18" />
          <path
            d="M0 -15c-8.3 0-15 6.6-15 14.8 0 10.8 15 25.2 15 25.2s15-14.4 15-25.2C15-8.4 8.3-15 0-15Z"
            fill="#14264B"
          />
          <circle cy="-1" r="5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  )
}

export default function LocationMap() {
  return (
    <section
      aria-labelledby="location-map-heading"
      className="relative mt-5 overflow-hidden rounded-[24px] border border-[#E5EBF5] bg-[#F4F7FD] xl:mt-6"
    >
      <div className="grid min-h-[200px] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative z-10 flex flex-col items-start justify-center p-5 sm:p-7 lg:p-8">
          <p className="inline-block text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            Our Location
          </p>

          <h2
            id="location-map-heading"
            className="mt-2.5 text-[24px] font-bold leading-[1.12] tracking-[-0.02em] text-[#14264B] sm:text-[28px]"
          >
            Find Us on Map
          </h2>

          <p className="mt-2 max-w-[320px] text-[12px] leading-[1.6] text-[#64748B] sm:text-[13px]">
            Easily find our office location on Google Maps.
          </p>

          <a
            href={OFFICE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-[#BFD3F2] bg-white px-4 text-[12px] font-semibold text-[#14264B] transition-colors duration-200 hover:border-[#93B4E8] hover:bg-[#F8FAFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 sm:w-auto"
          >
            <MapPin size={14} strokeWidth={1.9} aria-hidden="true" />
            View on Google Maps
            <ArrowRight
              size={14}
              strokeWidth={1.9}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div className="relative min-h-[180px] overflow-hidden md:min-h-0">
          <MapIllustration />
        </div>
      </div>
    </section>
  )
}
