
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
    top: "8%",
    left: "12%",
    rotate: -2,
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
  rotate,
  duration,
  delay,
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
      className={`absolute flex flex-col bg-white/90 backdrop-blur-sm border-b border-gray-500 rounded-md p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-[4px] hover:border-[#2563EA]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183B56] focus-visible:ring-offset-1 ${
        delay ? "animate-float" : ""
      }`}
      style={{
        ...(top ? { top } : {}),
        ...(right ? { right } : {}),
        ...(bottom ? { bottom } : {}),
        ...(left ? { left } : {}),
        ...(rotate !== undefined ? { transform: `rotate(${rotate}deg)` } : {}),
        animationDelay: delay,
        animationDuration: duration || "6s",
      }}
    >
      <div
        className="flex items-center justify-center w-9 h-9 rounded-lg mb-2"
        style={{ backgroundColor: accent }}
      >
        <Icon size={12} className={accentColorClass} />
      </div>

      <h4 className="text-[11px] font-medium text-slate-900 leading-tight">
        {title}
      </h4>

      <p className="text-[9px] text-slate-500 leading-tight line-clamp-2 max-w-[150px]">
        {desc}
      </p>

      <div className="mt-2 w-full h-[1px] bg-[#E5EAF0] flex items-end">
        <ArrowRightIcon size={10} className="text-slate-400" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-white pt-15 pb-5 px-8 min-h-[520px] flex flex-col lg:flex-row gap-5 items-start">
      {/* Left Content */}
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

        {/* Search */}
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

        {/* Popular Search */}
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

        {/* Statistics */}
        {/* 
        <div className="mt-[32px] flex gap-[30px]">
          {STATS.map((stat) => (
            <div key={stat.value} className="flex items-center gap-2">
              <span className="text-[20px] font-semibold text-slate-900 leading-none">
                {stat.value}
              </span>
              <span className="text-[11px] text-slate-500 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        */}
      </div>

      {/* Right Hero Image */}
      <div className="flex-1 relative w-full h-full min-w-0">
        <img
          src="/main-home-asset-3.png"
          alt="Hero Image"
          className="w-full h-full object-cover"
        />

        {SERVICE_CARDS.map((card, index) => (
          <FloatingCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
