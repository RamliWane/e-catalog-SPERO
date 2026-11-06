"use client"

const CLIENT_LOGOS = [
  { src: "/logo/astra-logo.png", alt: "Astra" },
  { src: "/logo/kominfo-logo.png", alt: "Kominfo" },
  { src: "/logo/logo-atlantis-plus.png", alt: "Atlantis Plus" },
  { src: "/logo/logo-blu-speed.png", alt: "Blu Speed" },
  { src: "/logo/logo-kamenparekraf.png", alt: "Kamenparekraf" },
  { src: "/logo/logo-kapalapi.png", alt: "Kapal Api" },
  { src: "/logo/logo-one-lito.jpeg", alt: "One Lito" },
  { src: "/logo/logo-pelni.png", alt: "Pelni" },
  { src: "/logo/logo-telkom.png", alt: "Telkom" },
  { src: "/logo/logo-win-shop.png", alt: "Win Shop" },
]

export default function ClientLogoMarquee() {
  return (
    <section className="bg-white py-[40px] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-[30px]">
        <div className="relative w-full overflow-hidden">
          {/* w-max: track selebar kontennya, supaya translateX(-50%) pas satu set */}
          <div className="flex w-max animate-marquee">
            {[0, 1].map((group) => (
              <div
                key={group}
                aria-hidden={group === 1 || undefined}
                // pr = gap, supaya lebar satu set persis sama dengan periode loop
                className="flex shrink-0 items-center gap-[32px] pr-[32px]"
              >
                {CLIENT_LOGOS.map((logo) => (
                  <img
                    key={`${group}-${logo.src}`}
                    src={logo.src}
                    alt={group === 0 ? logo.alt : ""}
                    className="h-12 w-auto shrink-0 object-contain"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}