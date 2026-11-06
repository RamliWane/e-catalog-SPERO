//component/home/Hero.tsx


import type { ReactElement } from "react";

import {
  SearchIcon,
  Code2Icon,
  SmartphoneIcon,
  ShapesIcon,
  CloudIcon,
  ArrowRightIcon,
} from "@/lib/icons";

const POPULAR_TAGS = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Cloud Solutions",
];

const STATS = [
  { value: "200+", label: "Tech Solutions" },
  { value: "50+", label: "Trusted Partners" },
  { value: "10+", label: "Years of Experience" },
];

const SERVICE_CARDS = [
  {
    icon: Code2Icon,
    title: "Web Development",
    desc: "Modern, scalable, and high-performance web solutions.",
    top: "2%",
    left: "12%",
    rotate: -4,
    duration: "5s",
    delay: "0s",
    accent: "#DBEAFE",
    accentText: "#2563EB",
  },
  {
    icon: SmartphoneIcon,
    title: "Mobile App",
    desc: "iOS & Android apps that people love to use.",
    top: "-2%",
    right: "14%",
    rotate: 3,
    duration: "7s",
    delay: "0.2s",
    accent: "#D1FAE5",
    accentText: "#10B981",
  },
  {
    icon: ShapesIcon,
    title: "UI/UX Design",
    desc: "Designing intuitive experiences for real people.",
    bottom: "16%",
    left: "16%",
    rotate: -1,
    duration: "8s",
    delay: "0.4s",
    accent: "#FEE2E2",
    accentText: "#EF4444",
  },
  {
    icon: CloudIcon,
    title: "Cloud & DevOps",
    desc: "Build, deploy, and scale with confidence.",
    bottom: "4%",
    right: "16%",
    rotate: 2,
    duration: "6s",
    delay: "0.6s",
    accent: "#EDE9FE",
    accentText: "#7C3AED",
  },
];

type IconComponent = (props: {
  className?: string;
  size?: number;
}) => ReactElement;


function FloatingCard({
  icon: Icon,
  title,
  desc,
  top,
  right,
  bottom,
  left,
  rotate = 0,
  duration = "6s",
  delay = "0s",
  accent,
  accentText,
}: {
  icon: IconComponent;
  title: string;
  desc: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  rotate?: number;
  duration?: string;
  delay: string;
  accent: string;
  accentText: string;
}) {
  const accentColorClass =
    accentText === "#2563EB"
      ? "text-blue-600"
      : accentText === "#10B981"
        ? "text-emerald-600"
        : accentText === "#EF4444"
          ? "text-rose-600"
          : "text-purple-600";

  return (
    <div
      className="absolute z-10 w-[150px] sm:w-[175px]"
      style={{
        ...(top ? { top } : {}),
        ...(right ? { right } : {}),
        ...(bottom ? { bottom } : {}),
        ...(left ? { left } : {}),
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        className="animate-float rounded-lg border border-white/80
          border-b-slate-300/80 bg-white/90 p-3
          shadow-[0_8px_24px_rgba(30,64,175,0.10)]
          backdrop-blur-xl transition-shadow duration-300
          hover:shadow-[0_12px_30px_rgba(30,64,175,0.18)]"
        style={{
          animationDuration: duration,
          animationDelay: delay,
        }}
      >
        <div
          className="mb-2 flex h-4 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: accent }}
        >
          <Icon size={15} className={accentColorClass} />
        </div>

        <h4 className="text-[11px] font-semibold leading-tight text-slate-900">
          {title}
        </h4>

        <p className="mt-1 line-clamp-2 text-[9px] leading-[1.4] text-slate-500">
          {desc}
        </p>

        <div className="mt-2 flex items-center border-t border-slate-200 pt-1 text-slate-400">
          <ArrowRightIcon size={11} />
        </div>
      </div>
    </div>
  );
}


export default function Hero() {
  return (
    <section className="bg-white pt-15 pb-5 px-8 min-h-[520px] flex flex-col lg:flex-row gap-5 items-start">
      <div className="flex-1 min-w-0 max-w-[560px]">
        <span className="inline-block mb-[13px] text-[11px] font-medium text-slate-500 uppercase tracking-widest">
          SOFTWARE HOUSE & IT CONSULTANT
        </span>

        <h1 className="text-[48px] lg:text-[48px] font-semibold text-slate-900 leading-tight mb-[20px] max-w-[520px]">
          Your Trusted Partner for Digital Solutions
        </h1>

        <p className="text-[14px] text-slate-600 leading-relaxed mb-[28px] max-w-[460px]">
          Explore our curated catalog of software houses and IT consultants
          ready to build, scale, and transform your ideas into digital
          solutions.
        </p>

        <div className="flex items-center gap-3 bg-white border border-[#E5EAF0] rounded-full h-[52px] max-w-[540px] shrink-0">
          <SearchIcon size={14} className="text-slate-400 ml-3 shrink-0" />

          <input
            type="text"
            placeholder="Search services, technologies, or company..."
            className="flex-1 h-full bg-transparent border-none text-sm text-slate-900 placeholder-slate-400 focus:outline-none pr-3 pl-0 min-w-0"
          />

          <button
            type="button"
            className="w-[40px] h-[40px] rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#0f2a3e] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 mr-1"
            aria-label="Search"
          >
            <ArrowRightIcon size={12} />
          </button>
        </div>

        <div className="mt-[20px] items-center flex flex-wrap gap-3">
          <span className="text-[13px] font-medium text-slate-500 whitespace-nowrap">
            Popular search:
          </span>

          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className="text-[11px] font-medium text-slate-700 px-3 py-1 rounded-full border border-[#E5EAF0] bg-white hover:bg-[#F5F7FA] hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183B56] whitespace-nowrap shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>


      <div className="relative flex-1 min-w-0 w-full">
        <div className="relative mx-auto w-full max-w-[620px] h-[420px] lg:h-[460px] -mt-5">
          {/* Background 3D utama */}
          <img
            src="/new-hero-asset-2.png"
            alt="Spero digital solutions"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          />

          {/* Floating cards */}
          {SERVICE_CARDS.map((card) => (
            <FloatingCard key={card.title} {...card} />
          ))}
        </div>
      </div>

    </section>
  );
}
