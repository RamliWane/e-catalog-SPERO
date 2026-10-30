export default function CloudIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.2 16c.8-1.1 1.2-2.5 1-3.9 -.2-1.4-1-2.6-2.2-3.3C15.2 7.2 13 7 11 7c-1.3 0-2.5.4-3.5 1.2l-.1.1C6.5 8.7 5 9.9 5 11.5c0 1.6 1.3 2.9 2.9 2.9h2.2c1.3 0 2.5-.8 3-2 .8-1.7 2.8-2.7 4.7-2.7z" />
    </svg>
  );
}
