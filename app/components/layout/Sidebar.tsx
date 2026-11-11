
"use client";

import { useEffect, useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HouseIcon,
  LayoutGridIcon,
  Layers3Icon,
  UserRoundIcon,
} from "@/lib/icons";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const PRIMARY_NAV: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Catalog", href: "/catalog" },
  { name: "Contact Us", href: "/contact" },
];

const ICONS: Record<
  string,
  ComponentType<{ className?: string; size?: number }>
> = {
  House: HouseIcon,
  LayoutGrid: LayoutGridIcon,
  Layers3: Layers3Icon,
  UserRound: UserRoundIcon,
};

const ICON_FOR_ITEM: Record<string, string> = {
  Home: "House",
  Catalog: "LayoutGrid",
  Services: "Layers3",
  "Contact Us": "UserRound",
};

function NavItem({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const Icon = ICONS[ICON_FOR_ITEM[item.name]];
  const isActive =
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(`${item.href}/`));

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={`
        flex w-full items-center gap-3 rounded-lg px-3 py-2.5
        text-sm font-medium transition-colors duration-150
        ${
          isActive
            ? "bg-[#F0F3F7] text-slate-900"
            : "text-slate-600 hover:bg-slate-100"
        }
      `}
    >
      {Icon && <Icon size={16} />}
      <span>{item.name}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  // Tutup sidebar setelah navigasi halaman.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Cegah halaman di belakang ikut scroll ketika menu mobile terbuka.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="spero-sidebar"
        className="
          fixed left-4 top-4 z-[60] flex h-10 w-10 items-center
          justify-center rounded-lg border border-slate-200
          bg-white text-slate-700 shadow-sm transition-colors
          hover:bg-slate-50 md:hidden
        "
      >
        <Menu size={21} />
      </button>

      {/* Mobile overlay */}
      <div
        aria-hidden="true"
        onClick={closeSidebar}
        className={`
          fixed inset-0 z-[70] bg-slate-950/40
          transition-opacity duration-300 md:hidden
          ${
            isOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        id="spero-sidebar"
        aria-label="Main sidebar"
        className={`
          fixed inset-y-0 left-0 z-[80]
          flex w-[230px] shrink-0 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo and mobile close button */}
        <div className="flex items-center justify-between px-5 pb-5 pt-2">
          <Link
            href="/"
            onClick={closeSidebar}
            aria-label="Spero homepage"
            className="block min-w-0"
          >
            <Image
              src="/logo/PRIMARY-LOGO-SPERO.png"
              alt="Spero Logo"
              width={150}
              height={50}
              priority
              className="h-auto w-full max-w-[150px] object-contain object-left"
            />
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close navigation menu"
            className="
              ml-2 flex h-9 w-9 shrink-0 items-center
              justify-center rounded-lg text-slate-500
              transition-colors hover:bg-slate-100
              md:hidden
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 space-y-2 overflow-y-auto px-5"
          aria-label="Primary navigation"
        >
          {PRIMARY_NAV.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              pathname={pathname}
              onNavigate={closeSidebar}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto px-5 pb-7">
          <p className="mt-4 text-[11px] text-slate-400">
            {"\u00A9"} 2025 Spero. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  );
}
