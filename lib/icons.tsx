type IconProps = {
  className?: string;
  size?: number;
};

function applySize(size?: number): string {
  if (!size) return "";
  return `w-[${size}px] h-[${size}px]`;
}

export function HouseIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function LayoutGridIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="21" />
    </svg>
  );
}

export function Layers3Icon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function Code2Icon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function LightbulbIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path d="M9 12h6a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3z" />
      <path d="M9 21v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function UserRoundIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function StarIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function ZapIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <polyline points="18 6 12 12 6 18" />
      <polyline points="12 18 6 6" />
    </svg>
  );
}

export function BookmarkIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function ArrowRightIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function CubeIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <polygon
        points="48,12 84,40 48,68 12,40"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <polygon
        points="84,40 84,76 48,68"
        fill="#bfdbfe"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <polygon
        points="12,40 12,76 48,68"
        fill="#93c5fd"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <line x1="48" y1="12" x2="48" y2="68" stroke="#3b82f6" strokeWidth="2" />
    </svg>
  );
}

export function SearchIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

export function SunIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

export function SmartphoneIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <rect width="7" height="12" x="8.5" y="2" rx="1" ry="1" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function ShapesIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 0 0 8.49m8.48-8.49a6 6 0 0 0 0 8.49m0-8.49a6 6 0 0 1 0 8.49" />
      <path d="M5 5l.01.01M17 17l.01.01" />
    </svg>
  );
}

export function CloudIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path d="M18.2 16c.8-1.1 1.2-2.5 1-3.9 -.2-1.4-1-2.6-2.2-3.3C15.2 7.2 13 7 11 7c-1.3 0-2.5.4-3.5 1.2l-.1.1C6.5 8.7 5 9.9 5 11.5c0 1.6 1.3 2.9 2.9 2.9h2.2c1.3 0 2.5-.8 3-2 .8-1.7 2.8-2.7 4.7-2.7z" />
    </svg>
  );
}

export function MonitorIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function WorkflowIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" ry="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" ry="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" ry="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" ry="1" />
      <path d="M10.5 3v14M3 10.5h14" />
    </svg>
  );
}

export function FilterIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <polyline points="4 18 14 6 24 18" />
      <line x1="10" y1="13" x2="14" y2="13" />
      <line x1="10" y1="9" x2="14" y2="9" />
    </svg>
  );
}

export function ChevronDownIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function CalendarIcon({ className, size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${applySize(size)} ${className ?? ""}`}
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
