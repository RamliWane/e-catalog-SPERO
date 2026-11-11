import Image from "next/image";
import type { ReactElement } from "react";

import {
  MonitorIcon,
  SmartphoneIcon,
  WorkflowIcon,
  CloudIcon,
  ArrowRightIcon,
} from "@/lib/icons";
import type { BrowseContent, BrowseIconKey } from "@/lib/home-browse-data";

type IconComponent = (props: { className?: string; size?: number }) => ReactElement;

const CATEGORY_STYLES: Record<
  BrowseIconKey,
  {
    icon: IconComponent;
    accent: string;
    accentClass: string;
  }
> = {
  web: {
    icon: MonitorIcon,
    accent: "#DBEAFE",
    accentClass: "text-blue-600",
  },
  mobile: {
    icon: SmartphoneIcon,
    accent: "#D1FAE5",
    accentClass: "text-emerald-600",
  },
  design: {
    icon: WorkflowIcon,
    accent: "#FEE2E2",
    accentClass: "text-rose-600",
  },
  cloud: {
    icon: CloudIcon,
    accent: "#EDE9FE",
    accentClass: "text-purple-600",
  },
};

function CategoryCard({
  iconKey,
  title,
  desc,
  count,
}: {
  iconKey: BrowseIconKey;
  title: string;
  desc: string;
  count: string;
}) {
  const style = CATEGORY_STYLES[iconKey];
  const Icon = style.icon;

  return (
    <a
      href="#"
      className="group flex flex-col bg-white border border-[#E5EAF0] rounded-[11px] p-[14px] w-full min-w-0 transition-all duration-200 hover:border-slate-900 hover:-translate-y-[2px] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183B56] focus-visible:ring-offset-2"
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg mb-[10px]"
        style={{ backgroundColor: style.accent }}
      >
        <Icon size={12} className={style.accentClass} />
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

export default function BrowseByCategory({ content }: { content: BrowseContent }) {
  const featured = content.featuredSolution;

  return (
    <section className="bg-white py-10 -mt-5 px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-[280px_repeat(4,minmax(130px,1fr))_250px] xl:gap-4 min-w-0">
        <div className="flex flex-col justify-center items-start min-w-0 sm:col-span-2 xl:col-span-1">
          <span className="inline-block mb-[12px] text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            {content.eyebrow}
          </span>
          <h2 className="text-[26px] font-semibold text-slate-900 leading-[1.15] mb-[12px]">
            {content.heading}
          </h2>
          <p className="text-[12px] text-slate-600 leading-[1.6] mb-[16px]">
            {content.description}
          </p>
          <a
            href="#"
            className="text-[12px] underline font-medium text-[#183B56] flex items-center gap-1 hover:translate-x-1 transition-transform duration-200 focus-visible:outline-none focus-visible:underline"
          >
            {content.linkLabel}
            <ArrowRightIcon size={10} />
          </a>
        </div>

        {content.categories.map((category) => (
          <CategoryCard
            key={category.id}
            iconKey={category.iconKey}
            title={category.title}
            desc={category.description}
            count={category.count}
          />
        ))}

        <div className="min-w-0 sm:col-span-2 xl:col-span-1">
          <div className="relative overflow-hidden bg-[#162032] text-white rounded-[16px] p-[20px] h-[200px] flex flex-col">
            <div className="relative z-10 w-[90%]">
              <span className="inline-block mb-[10px] text-[10px] font-medium text-gray-200">
                {featured.label}
              </span>
              <h3 className="text-[17px] font-bold leading-[1.2] mb-[10px]">
                {featured.title}
              </h3>
              <p className="text-[11px] text-[#CBD5E1] leading-[1.2]">
                {featured.description}
              </p>
              <a
                href="#"
                className="text-[11px] pt-10 font-medium text-white flex items-center gap-1.5 hover:translate-x-1 transition-transform duration-200 focus-visible:outline-none focus-visible:underline"
              >
                {featured.buttonLabel}
                <ArrowRightIcon size={11} />
              </a>
            </div>
            <div className="absolute right-0 h-full w-[55%] flex items-center justify-center overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(max-width: 1280px) 55vw, 250px"
                className="object-contain opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
