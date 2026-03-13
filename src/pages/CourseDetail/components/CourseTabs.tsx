import { useTranslation } from "react-i18next";
import { BookOpen, Award, FileText, HelpCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import type { LucideIcon } from "lucide-react";

export type CourseTabId = "overview" | "instructor" | "homework" | "faq";

const TAB_IDS: CourseTabId[] = ["overview", "instructor", "homework", "faq"];

const TAB_CONFIG: Record<
  CourseTabId,
  { labelKey: string; icon: LucideIcon }
> = {
  overview: { labelKey: "courseDetail.tabOverview", icon: BookOpen },
  instructor: { labelKey: "courseDetail.tabInstructor", icon: Award },
  homework: { labelKey: "courseDetail.tabHomework", icon: FileText },
  faq: { labelKey: "courseDetail.tabFAQ", icon: HelpCircle },
};

interface CourseTabsProps {
  activeTab: CourseTabId;
  onTabChange: (tab: CourseTabId) => void;
}

export function CourseTabs({ activeTab, onTabChange }: CourseTabsProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-md">
      <Container>
        <div className="grid grid-cols-2 sm:flex sm:flex-nowrap gap-2 py-2">
          {TAB_IDS.map((tabId) => {
            const isActive = activeTab === tabId;
            const { labelKey, icon: Icon } = TAB_CONFIG[tabId];
            return (
              <button
                key={tabId}
                onClick={() => onTabChange(tabId)}
                className={`relative flex items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto px-4 sm:px-8 py-3 font-semibold transition-all duration-300 rounded-t-xl ${
                  isActive
                    ? "text-primary-600 dark:text-primary-400 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent"
                    : "text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    isActive ? "scale-110" : ""
                  }`}
                />
                <span className="whitespace-nowrap truncate">{t(labelKey)}</span>
                {isActive && (
                  <>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 rounded-t-full" />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-100/50 to-transparent dark:from-primary-900/10 dark:to-transparent rounded-t-xl -z-10" />
                  </>
                )}
              </button>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
