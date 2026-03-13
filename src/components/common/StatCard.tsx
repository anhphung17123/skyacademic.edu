import { clsx } from "clsx";

export interface StatCardProps {
  value: string;
  label: string;
  isLightMode: boolean;
  className?: string;
}

/**
 * Single stat block for PageHero (value + label with theme-aware styling).
 */
export const StatCard = ({
  value,
  label,
  isLightMode,
  className,
}: StatCardProps) => (
  <div
    className={clsx(
      "text-center rounded-xl border backdrop-blur-md px-4 py-3 shadow-lg",
      isLightMode
        ? "border-white/50 bg-black/20"
        : "border-white/40 bg-black/40",
      className
    )}
  >
    <div
      className={clsx(
        "text-xl font-bold text-white",
        isLightMode
          ? "drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
          : "drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
      )}
    >
      {value}
    </div>
    <div
      className={clsx(
        "text-xs font-semibold",
        isLightMode
          ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
          : "text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
      )}
    >
      {label}
    </div>
  </div>
);
