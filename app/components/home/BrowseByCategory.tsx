import type { ReactElement } from "react";

import {
  MonitorIcon,
  SmartphoneIcon,
  WorkflowIcon,
  CloudIcon,
  ArrowRightIcon,
  Cube3DIcon,
} from "@/lib/icons";

const CATEGORIES = [
  {
    title: "Web Development",
    desc: "Custom websites, web apps, and e-commerce solutions.",
    count: "12+ companies",
    accent: "#DBEAFE",
    accentText: "#2563EB",
    icon: MonitorIcon,
  },
  {
    title: "Mobile App",
    desc: "iOS and Android apps, from MVP to enterprise.",
    count: "10+ companies",
    accent: "#D1FAE5",
    accentText: "#10B981",
    icon: SmartphoneIcon,
  },
  {
    title: "UI/UX Design",
    desc: "User-centered design for better experiences.",
    count: "8+ companies",
    accent: "#FEE2E2",
    accentText: "#EF4444",
    icon: WorkflowIcon,
  },
  {
    title: "Cloud & DevOps",
    desc: "Infrastructure, deployment, and system optimization.",
    count: "6+ companies",
    accent: "#EDE9FE",
    accentText: "#7C3AED",
    icon: CloudIcon,
  },
];

type IconComponent = (props: { className?: string; size?: number }) => ReactElement;

function CategoryCard({
  icon: Icon,
  title,
  desc,
  count,
  accent,
  accentText,
}: {
  icon: IconComponent;
  title: string;
  desc: string;
  count: string;
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
    <a
      href="#"
      className="group flex flex-col bg-white border border-[#E5EAF0] rounded-[11px] p-[14px] w-full min-w-0 transition-all duration-200 hover:border-slate-900 hover:-translate-y-[2px] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183B56] focus-visible:ring-offset-2"
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg mb-[10px]"
        style={{ backgroundColor: accent }}
      >
        <Icon size={12} className={accentColorClass} />
      </div>
      <h3 className="text-[11px] font-semibold text-slate-900 mb-[6px] leading-tight group-hover:text-[#183B56] transition-colors duration-200">
        {title}
      </h3>
      <p className="text-[9px] text-slate-500 mb-auto leading-[1.5]">{desc}</p>
      <div className="flex items-center gap-1.5 mt-[4px]">
        <span className="text-[9px] font-medium text-slate-400">{count}</span>
        <ArrowRightIcon
          size={10}
          className="text-slate-400 group-hover:text-slate-900 transition-all duration-200 group-hover:translate-x-0.5"
        />
      </div>
    </a>
  );
}

export default function BrowseByCategory() {
  return (
    <section className="bg-white py-[40px] px-[32px]">
      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 xl:grid-cols-[280px_repeat(4,minmax(130px,1fr))_250px] xl:gap-[16px] min-w-0">
        {/* Kolom teks kiri */}
        <div className="flex flex-col justify-center items-start min-w-0 sm:col-span-2 xl:col-span-1">
          <span className="inline-block mb-[12px] text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            BROWSE BY CATEGORY
          </span>
          <h2 className="text-[26px] font-semibold text-slate-900 leading-[1.15] mb-[12px]">
            Find the Right Solution for Your Business
          </h2>
          <p className="text-[12px] text-slate-600 leading-[1.6] mb-[16px]">
            Explore our catalog by category and discover the right expertise for
            your project.
          </p>
          <a
            href="#"
            className="text-[12px] underline font-medium text-[#183B56] flex items-center gap-1 hover:translate-x-1 transition-transform duration-200 focus-visible:outline-none focus-visible:underline"
          >
            View All Services
            <ArrowRightIcon size={10} />
          </a>
        </div>

        {/* Card kategori */}
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}

        {/* Card Featured */}
        <div className="min-w-0 sm:col-span-2 xl:col-span-1">
          <div className="relative overflow-hidden bg-[#183B56] text-white rounded-[11px] p-[18px] h-[178px] flex flex-col justify-between">
            <div className="relative z-10">
              <span className="inline-block mb-[10px] text-[10px] font-medium text-[#93C5FD] uppercase tracking-widest">
                Featured Solution
              </span>
              <h3 className="text-[16px] font-semibold leading-[1.2] mb-[10px]">
                Modern Web Platform for Growing Business
              </h3>
              <p className="text-[11px] text-[#CBD5E1] leading-[1.6] mb-[14px]">
                Scalable, secure, and built for long-term success.
              </p>
              <a
                href="#"
                className="text-[11px] font-medium text-white flex items-center gap-1 hover:translate-x-1 transition-transform duration-200 focus-visible:outline-none focus-visible:underline"
              >
                Explore Project
                <ArrowRightIcon size={10} />
              </a>
            </div>
            <div className="absolute right-[-6px] bottom-[-6px] opacity-40 pointer-events-none">
              <Cube3DIcon className="w-[56px] h-[56px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}