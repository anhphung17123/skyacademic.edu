import { useTranslation } from "react-i18next";
import { Book, FileText } from "lucide-react";

const FALLBACK_IMAGE_PREFIX =
  "https://images.unsplash.com/photo-154499795";

interface BookPreviewSectionProps {
  previewImages: string[];
  previewSectionRef: React.Ref<HTMLDivElement>;
  onOpenModal: (startIndex: number) => void;
}

export function BookPreviewSection({
  previewImages,
  previewSectionRef,
  onOpenModal,
}: BookPreviewSectionProps) {
  const { t } = useTranslation();
  const displayCount = Math.min(3, previewImages.length);
  const indices = Array.from({ length: displayCount }, (_, i) => i);

  if (previewImages.length === 0) return null;

  return (
    <div
      ref={previewSectionRef}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-600 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <Book className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {t("bookDetail.samplePages")}
            </h3>
          </div>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 rounded-full text-xs font-medium">
            {t("bookDetail.freeSample")}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {indices.map((pageIndex) => {
            const imageSrc =
              previewImages[pageIndex] ??
              `${FALLBACK_IMAGE_PREFIX}${pageIndex + 1}0-fa07a98d237f?w=300&h=400&fit=crop`;
            return (
              <div
                key={pageIndex}
                onClick={() => onOpenModal(pageIndex)}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <img
                  src={imageSrc}
                  alt={`Sample page ${pageIndex + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-2 py-1 bg-white/90 rounded-md text-xs font-medium text-gray-900">
                    Page {pageIndex + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => onOpenModal(0)}
          className="w-full mt-4 py-3 rounded-xl font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <FileText className="w-5 h-5" />
          {t("bookDetail.viewMorePages")}
        </button>
      </div>
    </div>
  );
}
