import CatalogCard from "./catalog-card";
import {
  DashboardImage,
  MobileAppImage,
  CloudImage,
  DesignSystemImage,
  AnalyticsImage,
  WebsiteImage,
  APIGatewayImage,
  DevOpsImage,
} from "./catalog-images";

const CATALOG_DATA = [
  {
    category: "Web Development",
    title: "Spero Dashboard",
    desc: "A modern and scalable dashboard solution for your business needs.",
    image: <DashboardImage />,
  },
  {
    category: "Mobile App",
    title: "Finora Mobile App",
    desc: "A personal finance application designed to simplify financial management.",
    image: <MobileAppImage />,
  },
  {
    category: "Cloud & DevOps",
    title: "Nova Cloud",
    desc: "Cloud infrastructure and deployment solutions for modern businesses.",
    image: <CloudImage />,
  },
  {
    category: "UI/UX Design",
    title: "Aurora Design System",
    desc: "A comprehensive design system for building consistent digital experiences.",
    image: <DesignSystemImage />,
  },
  {
    category: "Data & Analytics",
    title: "Insight Pro",
    desc: "Transform complex data into actionable business insights.",
    image: <AnalyticsImage />,
  },
  {
    category: "Web Development",
    title: "NextGen Website",
    desc: "High-performance websites built for growing businesses.",
    image: <WebsiteImage />,
  },
  {
    category: "Others",
    title: "API Gateway",
    desc: "Reliable API infrastructure for seamless integrations.",
    image: <APIGatewayImage />,
  },
  {
    category: "Cloud & DevOps",
    title: "DevOps Toolkit",
    desc: "Streamline development and deployment workflows.",
    image: <DevOpsImage />,
  },
];

export default function CatalogGrid() {
  return (
    <section className="bg-white py-[64px] px-[32px]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[28px]">
          {CATALOG_DATA.map((item, i) => (
            <CatalogCard
              key={i}
              category={item.category}
              title={item.title}
              desc={item.desc}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
