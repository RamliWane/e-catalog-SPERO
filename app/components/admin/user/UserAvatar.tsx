import { getAvatarTone, getInitials } from "./user-data"

export default function UserAvatar({
  name,
  size = "md",
}: {
  name: string
  size?: "md" | "lg"
}) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${getAvatarTone(
        name,
      )} ${
        size === "lg"
          ? "h-14 w-14 text-[16px]"
          : "h-10 w-10 text-[12px]"
      }`}
    >
      {getInitials(name)}
    </span>
  )
}
