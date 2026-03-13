import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import type { TableOfContentsItem } from "@/types/book";

interface BookTableOfContentsProps {
  items: TableOfContentsItem[];
}

export function BookTableOfContents({ items }: BookTableOfContentsProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t("bookDetail.tableOfContents")}
          </h3>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {items.length > 0 ? (
            items.map((item, idx) => {
              if (item.type === "title") {
                return (
                  <div
                    key={idx}
                    className="py-2 px-3 text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide"
                  >
                    {item.text}
                  </div>
                );
              }
              if (item.type === "chapter") {
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 mt-3 first:mt-0"
                  >
                    <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.chapterNumber}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {item.text}
                    </span>
                  </div>
                );
              }
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 py-1.5 px-3 pl-12 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {item.text}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-300">
              {t("bookDetail.noTableOfContents")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
