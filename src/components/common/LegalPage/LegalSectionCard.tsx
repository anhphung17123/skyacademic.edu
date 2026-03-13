import type { LucideIcon } from "lucide-react";
import { clsx } from "clsx";

export interface LegalSectionCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  colorClasses: { bg: string; text: string; iconBg: string; border: string };
  highlight?: boolean;
  highlightContent?: string;
}

export const LegalSectionCard = ({
  id,
  icon: Icon,
  title,
  description,
  details,
  colorClasses,
  highlight,
  highlightContent,
}: LegalSectionCardProps) => (
  <div
    id={id}
    className={clsx(
      "bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 scroll-mt-24 transition-all hover:shadow-xl",
      highlight && `border-2 ${colorClasses.border}`
    )}
  >
    <div className="flex items-start gap-4 mb-6">
      <div
        className={clsx(
          "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-lg",
          colorClasses.iconBg
        )}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2.5">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>

    {highlight && highlightContent && (
      <div className="mb-5 p-3.5 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex items-center gap-2.5 border-2 border-amber-300/80 dark:border-amber-700/80 shadow-md">
        <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
          {highlightContent}
        </span>
      </div>
    )}

    <div className={clsx("p-4 rounded-xl border border-gray-100 dark:border-gray-700", colorClasses.bg)}>
      <ul className="space-y-2">
        {details.map((detail, i) => (
          <li key={i} className="flex items-start gap-3">
            <div
              className={clsx(
                "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                colorClasses.text.replace("text-", "bg-")
              )}
            />
            <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              {detail}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
