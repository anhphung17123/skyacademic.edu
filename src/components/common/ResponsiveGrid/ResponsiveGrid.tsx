import { type ReactNode, Children } from "react";
import { clsx } from "clsx";
import { HorizontalScroll } from "@/components/common/HorizontalScroll";

export interface ResponsiveGridProps {
  children: ReactNode;
  desktopColumns?: string;
  mobileItemWidth?: string;
  scrollStep?: number;
  showScrollControls?: boolean;
  className?: string;
  /** Optional wrapper class for each mobile item (e.g. w-[400px]) */
  mobileItemClassName?: string;
}

/**
 * Desktop: CSS grid. Mobile/tablet: horizontal scroll.
 * Use for featured sections (books, courses, videos).
 */
export const ResponsiveGrid = ({
  children,
  desktopColumns = "lg:grid-cols-4",
  mobileItemWidth = "w-[280px] sm:w-[320px]",
  scrollStep = 320,
  showScrollControls = true,
  className,
  mobileItemClassName,
}: ResponsiveGridProps) => {
  const items = Children.toArray(children);
  return (
    <>
      <div
        className={clsx(
          "hidden lg:grid gap-6",
          desktopColumns,
          className
        )}
      >
        {items}
      </div>
      <HorizontalScroll
        className="lg:hidden"
        showControls={showScrollControls}
        scrollStep={scrollStep}
      >
        <div className="w-4 md:w-6 flex-shrink-0" aria-hidden />
        {items.map((child, i) => (
          <div key={i} className={clsx("flex-shrink-0", mobileItemClassName || mobileItemWidth)}>
            {child}
          </div>
        ))}
      </HorizontalScroll>
    </>
  );
};
