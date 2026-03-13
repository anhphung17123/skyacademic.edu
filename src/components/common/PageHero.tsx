import { ReactNode } from "react";
import { clsx } from "clsx";
import { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { StatCard } from "@/components/common/StatCard";
import { useTheme } from "@/contexts/theme-context";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: LucideIcon;
  gradient?: "primary" | "secondary" | "red" | "purple" | "page";
  stats?: Array<{ value: string; label: string }>;
  rightContent?: ReactNode;
  className?: string;
  showWave?: boolean;
}

const gradientClasses = {
  primary: {
    light: "from-primary-500 via-blue-500 to-secondary-500",
    dark: "from-primary-600 via-purple-600 to-secondary-600",
  },
  secondary: {
    light: "from-secondary-500 via-primary-500 to-blue-500",
    dark: "from-secondary-600 via-primary-600 to-purple-600",
  },
  red: {
    light: "from-red-500 via-red-400 to-orange-400",
    dark: "from-red-600 via-red-500 to-orange-500",
  },
  purple: {
    light: "from-purple-500 via-pink-500 to-red-500",
    dark: "from-purple-600 via-pink-600 to-red-600",
  },
  page: "", // Will use inline style with CSS variables
};

/**
 * Reusable page hero section component with responsive design
 */
export const PageHero = ({
  title,
  subtitle,
  badge,
  badgeIcon: BadgeIcon,
  gradient = "page",
  stats,
  rightContent,
  className,
  showWave = true,
}: PageHeroProps) => {
  const { resolvedTheme } = useTheme();
  const isLightMode = resolvedTheme === "light";
  const isPageGradient = gradient === "page";
  
  const gradientStyle = isPageGradient
    ? {
        background: `linear-gradient(to right, var(--page-accent-start) 0%, var(--page-primary) 50%, var(--page-secondary) 100%)`,
      }
    : undefined;

  const gradientClass = !isPageGradient
    ? gradientClasses[gradient][isLightMode ? "light" : "dark"]
    : "";

  // Determine layout based on props
  const hasStats = stats && stats.length > 0;
  const hasRightContent = !!rightContent;
  const useTwoColumn = hasStats || hasRightContent;
  const statsWithSubscribe = hasStats && hasRightContent;
  const statsOnly = hasStats && !hasRightContent;

  return (
    <div
      className={clsx(
        "relative overflow-hidden bg-gradient-to-br py-12 md:py-16 lg:py-20",
        gradientClass,
        className
      )}
      style={gradientStyle}
    >
      {/* Enhanced overlay for better text contrast - lighter in light mode, darker in dark mode */}
      <div className={clsx(
        "absolute inset-0 bg-gradient-to-b pointer-events-none z-0",
        isLightMode 
          ? "from-black/20 via-black/10 to-black/5" 
          : "from-black/40 via-black/25 to-black/10"
      )} />

      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl" />
      </div>

      <Container>
        <div className="relative z-10 w-full max-w-full overflow-hidden">
          {useTwoColumn ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-8 w-full">
              {/* Left Column: Badge, Title, Stats (if stats with subscribe) */}
              <div className={clsx(
                "space-y-4",
                statsWithSubscribe ? "text-center lg:text-left" : "text-center lg:text-left"
              )}>
                {/* Badge */}
                {badge && (
                  <div className={clsx(
                    "inline-flex items-center gap-2 rounded-full border backdrop-blur-md px-3 py-1.5 text-xs font-semibold backdrop-blur-md",
                    isLightMode
                      ? "border-white/40 bg-black/20 text-white shadow-md drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                      : "border-white/30 bg-black/30 text-white/95 shadow-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                  )}>
                    {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" />}
                    <span>{badge}</span>
                  </div>
                )}

                {/* Title */}
                <h1 className={clsx(
                  "text-3xl font-display font-bold leading-tight text-white md:text-4xl lg:text-5xl",
                  isLightMode
                    ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                    : "drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                )}>
                  {title}
                </h1>

                {/* Subtitle */}
                {subtitle && (
                  <p className={clsx(
                    "max-w-xl mx-auto text-base leading-relaxed md:text-lg text-center",
                    isLightMode
                      ? "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
                      : "text-white/95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                  )}>
                    {subtitle}
                  </p>
                )}

                {/* Stats below title (only when stats with subscribe) */}
                {statsWithSubscribe && stats && (
                  <div className="flex items-center justify-center gap-4 lg:justify-start pt-2">
                    {stats.map((stat, index) => (
                      <StatCard
                        key={index}
                        value={stat.value}
                        label={stat.label}
                        isLightMode={isLightMode}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Stats (if stats only) or Subscribe CTA (if rightContent) */}
              {statsOnly && stats && (
                <div className="flex items-center justify-center gap-4 lg:justify-end">
                  {stats.map((stat, index) => (
                    <StatCard
                      key={index}
                      value={stat.value}
                      label={stat.label}
                      isLightMode={isLightMode}
                    />
                  ))}
                </div>
              )}

              {rightContent && (
                <div className="flex items-center justify-center lg:justify-end">
                  {rightContent}
                </div>
              )}
            </div>
          ) : (
            // Single column layout (no stats, no rightContent)
            <div className="text-center space-y-4">
              {/* Badge */}
              {badge && (
                <div className={clsx(
                  "inline-flex items-center gap-2 rounded-full border backdrop-blur-md px-3 py-1.5 text-xs font-semibold backdrop-blur-md",
                  isLightMode
                    ? "border-white/40 bg-black/20 text-white shadow-md drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                    : "border-white/30 bg-black/30 text-white/95 shadow-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                )}>
                  {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" />}
                  <span>{badge}</span>
                </div>
              )}

              {/* Title */}
              <h1 className={clsx(
                "text-3xl font-display font-bold leading-tight text-white md:text-4xl lg:text-5xl",
                isLightMode
                  ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                  : "drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
              )}>
                {title}
              </h1>

              {/* Subtitle */}
              {subtitle && (
                <p className={clsx(
                  "max-w-xl mx-auto text-base leading-relaxed md:text-lg",
                  isLightMode
                    ? "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
                    : "text-white/95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                )}>
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* Wave separator */}
      {showWave && (
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-gray-50 dark:fill-slate-900"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
