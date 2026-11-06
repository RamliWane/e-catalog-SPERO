"use client"

const CLIENT_LOGOS = [
  { src: "/logo/astra-logo.png", alt: "Astra" },
  { src: "/logo/kominfo-logo.png", alt: "Kominfo" },
  { src: "/logo/logo-atlantis-plus.png", alt: "Atlantis Plus" },
  { src: "/logo/logo-blu-speed.png", alt: "Blu Speed" },
  { src: "/logo/logo-kamenparekraf.png", alt: "Kamenparekraf" },
  { src: "/logo/logo-kapalapi.png", alt: "Kapal Api" },
  { src: "/logo/logo-one-lito.jpeg", alt: "One Lito" },
  { src: "/logo/logo-pelni.webp", alt: "Pelni" },
  { src: "/logo/logo-telkom.png", alt: "Telkom" },
  { src: "/logo/logo-win-shop.png", alt: "Win Shop" },
]

export default function ClientLogoMarquee() {
  return (
    <section className="bg-white py-[40px] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-[30px]">
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center gap-[40px] animate-[marquee_30s_linear_infinite]">
            {CLIENT_LOGOS.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height="auto"
                className="object-contain"
              />
            ))}
          </div>
        </div>
        <div className="relative w-full overflow-hidden mt-[-1px]">
          <div className="flex items-center gap-[40px] animate-[marquee_30s_linear_infinite]">
            {CLIENT_LOGOS.map((logo) => (
              <img
                key={logo.src + "-2"}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height="auto"
                className="object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
