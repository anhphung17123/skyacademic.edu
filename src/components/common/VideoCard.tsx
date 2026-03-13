import { Play } from "lucide-react";
import { YouTubeThumbnail } from "@/components/common/YouTubeThumbnail";
import type { FreeVideoDto } from "@/types/api";

const DEFAULT_THUMBNAIL =
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400";

interface VideoCardProps {
  video: FreeVideoDto;
  currentLang: string;
  onClick: (video: FreeVideoDto) => void;
  /** Optional wrapper class (e.g. for horizontal scroll item width) */
  className?: string;
}

export function VideoCard({
  video,
  currentLang,
  onClick,
  className,
}: VideoCardProps) {
  const title =
    currentLang === "vi" ? video.title_vi || video.title : video.title_en || video.title;
  const category =
    currentLang === "vi" && video.category_vi
      ? video.category_vi
      : video.category;

  return (
    <div
      role="button"
      tabIndex={0}
      className={`group cursor-pointer ${className ?? ""}`}
      onClick={() => onClick(video)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(video);
        }
      }}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
        {video.youtube_url ? (
          <YouTubeThumbnail
            url={video.youtube_url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            fallbackUrl={DEFAULT_THUMBNAIL}
          />
        ) : (
          <img
            src={DEFAULT_THUMBNAIL}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
            <Play className="w-6 h-6 text-primary-600 ml-1" />
          </div>
        </div>
        {category && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded">
            {category}
          </div>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
        {title}
      </h3>
    </div>
  );
}
