import { clsx } from "clsx";

export interface CardSkeletonProps {
  variant?: "book" | "course" | "video";
  className?: string;
}

const variantClasses = {
  book: "aspect-[3/4]",
  course: "aspect-video",
  video: "aspect-video",
} as const;

/**
 * Reusable card skeleton for loading states (books, courses, videos).
 */
export const CardSkeleton = ({
  variant = "course",
  className,
}: CardSkeletonProps) => (
  <div
    className={clsx(
      "bg-white dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse",
      className
    )}
  >
    <div
      className={clsx(
        "bg-gray-200 dark:bg-gray-700",
        variantClasses[variant]
      )}
    />
    <div className="p-5 space-y-4">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  </div>
);
