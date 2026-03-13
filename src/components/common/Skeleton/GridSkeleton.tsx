import { cloneElement, type ReactElement } from "react";
import { clsx } from "clsx";
import { HorizontalScroll } from "@/components/common/HorizontalScroll";

export interface GridSkeletonProps {
  count?: number;
  itemWidth?: string;
  desktopColumns?: string;
  className?: string;
  /** Single skeleton element (e.g. CardSkeleton); cloned for each slot. */
  children: ReactElement;
}

/**
 * Desktop: grid of skeleton cards. Mobile: horizontal scroll of same skeletons.
 */
export const GridSkeleton = ({
  count = 4,
  itemWidth = "w-[280px] sm:w-[320px]",
  desktopColumns = "lg:grid-cols-4",
  className,
  children,
}: GridSkeletonProps) => (
  <>
    <div
      className={clsx(
        "hidden lg:grid gap-6",
        desktopColumns,
        className
      )}
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{cloneElement(children, { key: i })}</div>
      ))}
    </div>
    <HorizontalScroll className="lg:hidden" isIconShown={false}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={clsx("flex-shrink-0", itemWidth)}>
          {cloneElement(children, { key: i })}
        </div>
      ))}
    </HorizontalScroll>
  </>
);
