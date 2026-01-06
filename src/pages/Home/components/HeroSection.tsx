import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Star,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { useEffect, useState } from "react";
import { freeVideoApi } from "@/services/api/free-video-service";
import { FreeVideoDto } from "@/types/api";
import { YouTubeThumbnail } from "@/components/common/YouTubeThumbnail";
import { clsx } from "clsx";

export const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const isLightMode = resolvedTheme === "light";
  const [featuredVideo, setFeaturedVideo] = useState<FreeVideoDto | null>(null);
  const currentLang = i18n.language;

  const highlights = [
    t("hero.highlight1"),
    t("hero.highlight2"),
    t("hero.highlight3"),
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchFeaturedVideo = async () => {
      try {
        const videos = await freeVideoApi.fetchVideos();
        if (isMounted && videos.length > 0) {
          // Get the first video as featured video
          setFeaturedVideo(videos[0]);
        }
      } catch {
        // Fail silently
      }
    };

    void fetchFeaturedVideo();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleVideoClick = () => {
    if (!featuredVideo) return;
    
    if (featuredVideo.youtube_url) {
      // Open YouTube video in new tab
      window.open(featuredVideo.youtube_url, "_blank", "noopener,noreferrer");
    } else {
      // Navigate to free videos page
      navigate(`/free-videos?video=${featuredVideo.id}`);
    }
  };

  const getVideoTitle = () => {
    if (!featuredVideo) return "";
    return currentLang === "vi"
      ? featuredVideo.title_vi || featuredVideo.title
      : featuredVideo.title_en || featuredVideo.title;
  };

  return (
    <section
      className={`relative min-h-[70vh] flex items-center overflow-hidden ${
        isLightMode
          ? "bg-gradient-to-br from-white via-gray-50/50 to-white"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      }`}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {isLightMode ? (
          <>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]" />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </>
        )}
      </div>

      <div className="container-custom relative z-10 py-20 lg:py-28">
        <div className={clsx(
          "grid gap-10 lg:gap-16 items-center",
          featuredVideo ? "lg:grid-cols-2" : "lg:grid-cols-1 lg:max-w-4xl lg:mx-auto"
        )}>
          {/* Left Content */}
          <div className={clsx(
            "text-center space-y-6",
            featuredVideo ? "lg:text-left" : "lg:text-center"
          )}>
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium mb-4 ${
                isLightMode
                  ? "bg-primary-50/80 backdrop-blur-sm border border-primary-200/50 text-primary-700 shadow-sm"
                  : "bg-primary-500/10 backdrop-blur-sm border border-primary-500/20 text-primary-300"
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isLightMode ? "bg-primary-500" : "bg-primary-400"
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    isLightMode ? "bg-primary-600" : "bg-primary-500"
                  }`}
                ></span>
              </span>
              {t("hero.badge")}
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h1
                className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight ${
                  isLightMode ? "text-gray-800" : "text-gray-100"
                }`}
              >
                {t("hero.title")}
              </h1>
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight bg-clip-text text-transparent ${
                  isLightMode
                    ? "bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600"
                    : "bg-gradient-to-r from-primary-400 via-primary-300 to-secondary-400"
                }`}
              >
                {t("hero.titleHighlight")}
              </h2>
            </div>

            {/* Subtitle */}
            <p
              className={`text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed ${
                isLightMode ? "text-gray-600" : "text-gray-300"
              }`}
            >
              {t("hero.subtitle")}
            </p>

            {/* Highlights */}
            <div className={clsx(
              "flex flex-wrap gap-3 pt-2",
              featuredVideo ? "justify-center lg:justify-start" : "justify-center"
            )}>
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isLightMode
                      ? "bg-white/90 backdrop-blur-sm border border-gray-300/80 text-gray-800 shadow-sm"
                      : "bg-white/10 backdrop-blur-sm border border-white/20 text-gray-200 shadow-sm"
                  }`}
                >
                  <CheckCircle
                    className={`w-4 h-4 flex-shrink-0 ${
                      isLightMode ? "text-primary-600" : "text-primary-400"
                    }`}
                  />
                  <span className="font-semibold text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={clsx(
              "flex flex-col sm:flex-row gap-3 pt-3",
              featuredVideo ? "justify-center lg:justify-start" : "justify-center"
            )}>
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-600 hover:from-primary-700 hover:to-primary-600 dark:hover:from-primary-400 dark:hover:to-primary-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg dark:shadow-[0_8px_24px_-4px_rgba(59,130,246,0.4)] shadow-[0_4px_12px_-2px_rgba(37,99,235,0.3)] hover:shadow-xl dark:hover:shadow-[0_12px_32px_-4px_rgba(59,130,246,0.5)] hover:shadow-[0_8px_20px_-4px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 border border-primary-500/20 dark:border-primary-400/30 hover:border-primary-500/30 dark:hover:border-primary-400/50"
              >
                <span>{t("hero.cta")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://www.youtube.com/@tienganhsky"
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center justify-center gap-2.5 border-2 font-semibold px-6 py-3 rounded-xl transition-all duration-300 ${
                  isLightMode
                    ? "bg-white hover:bg-gray-50 border-gray-300 text-gray-800 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    : "bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-md hover:border-white/40 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:shadow-white/10"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    isLightMode
                      ? "bg-primary-100 group-hover:bg-primary-200"
                      : "bg-white/10 group-hover:bg-white/20"
                  } transition-colors`}
                >
                  <Play
                    className={`w-4 h-4 ml-0.5 ${
                      isLightMode ? "text-primary-600" : "text-white"
                    }`}
                  />
                </div>
                <span>
                  {t("hero.secondaryCta")}
                </span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className={clsx(
              "flex flex-wrap items-center gap-5 pt-6",
              featuredVideo ? "justify-center lg:justify-start" : "justify-center"
            )}>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-1 justify-center lg:justify-start mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p
                  className={`text-xs font-medium ${
                    isLightMode ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {t("hero.trustedByLearners")}
                </p>
              </div>
              <div
                className={`w-px h-10 ${
                  isLightMode ? "bg-gray-300" : "bg-gray-700"
                }`}
              />
              <div className="text-center lg:text-left">
                <p
                  className={`text-xl font-bold ${
                    isLightMode ? "text-gray-800" : "text-gray-100"
                  }`}
                >
                  {t("hero.highlight1")}
                </p>
                <p
                  className={`text-xs ${
                    isLightMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {t("hero.activeStudents")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Visual - Only show if video exists */}
          {featuredVideo && (
            <div className="relative hidden lg:block">
              {/* Main Card */}
              <div
                className={`relative rounded-2xl p-6 border-2 shadow-xl backdrop-blur-sm ${
                  isLightMode
                    ? "bg-white/90 border-gray-200/50 shadow-gray-200/50"
                    : "bg-slate-800/90 border-slate-700/50 shadow-slate-900/50"
                }`}
              >
                {/* Video Preview */}
                {featuredVideo.youtube_url && (
                  <div
                    className="relative aspect-video rounded-xl overflow-hidden mb-5 group cursor-pointer"
                    onClick={handleVideoClick}
                  >
                    <YouTubeThumbnail
                      url={featuredVideo.youtube_url}
                      alt={getVideoTitle()}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        isLightMode
                          ? "from-gray-900/60 via-gray-900/20 to-transparent"
                          : "from-slate-900/80 via-slate-900/20 to-transparent"
                      }`}
                    />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 ${
                          isLightMode
                            ? "bg-white/95 backdrop-blur-sm"
                            : "bg-white/90 backdrop-blur-sm"
                        }`}
                      >
                        <Play className="w-6 h-6 text-primary-600 ml-1" />
                      </div>
                    </div>

                    {/* Live Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      {t("hero.liveClass")}
                    </div>
                  </div>
                )}

                {/* Course Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <a
                      className={`text-base font-bold line-clamp-2 ${
                        isLightMode ? "text-gray-800" : "text-gray-100"
                      }`}
                      href={`/free-videos?video=${featuredVideo.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getVideoTitle()}
                    </a>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 flex-shrink-0 ml-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span
                        className={`text-sm font-bold ${
                          isLightMode ? "text-gray-900" : "text-white"
                        }`}
                      >
                        4.9
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-6 text-sm ${
                      isLightMode ? "text-gray-600" : "text-slate-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg ${
                          isLightMode ? "bg-primary-50" : "bg-primary-500/10"
                        }`}
                      >
                        <Users
                          className={`w-4 h-4 ${
                            isLightMode ? "text-primary-600" : "text-primary-400"
                          }`}
                        />
                      </div>
                      <span className="font-medium">
                        50+ {t("hero.students")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg ${
                          isLightMode ? "bg-secondary-50" : "bg-secondary-500/10"
                        }`}
                      >
                        <Award
                          className={`w-4 h-4 ${
                            isLightMode
                              ? "text-secondary-600"
                              : "text-secondary-400"
                          }`}
                        />
                      </div>
                      <span className="font-medium">
                        {t("hero.certificate")}
                      </span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span
                        className={`font-medium ${
                          isLightMode ? "text-gray-700" : "text-slate-300"
                        }`}
                      >
                        {t("hero.courseProgress")}
                      </span>
                      <span
                        className={`font-bold text-lg ${
                          isLightMode ? "text-primary-600" : "text-primary-400"
                        }`}
                      >
                        85%
                      </span>
                    </div>
                    <div
                      className={`h-3 rounded-full overflow-hidden ${
                        isLightMode ? "bg-gray-200" : "bg-slate-700"
                      }`}
                    >
                      <div className="h-full w-[85%] bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 rounded-full shadow-lg shadow-primary-500/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div
                className={`absolute -bottom-6 -left-6 rounded-xl p-4 shadow-xl backdrop-blur-sm border-2 ${
                  isLightMode
                    ? "bg-white border-gray-200/50 shadow-gray-300/50"
                    : "bg-slate-800/95 border-slate-700/50 shadow-slate-900/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isLightMode ? "bg-primary-100" : "bg-primary-500/20"
                    }`}
                  >
                    <Users
                      className={`w-5 h-5 ${
                        isLightMode ? "text-primary-600" : "text-primary-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-lg font-bold ${
                        isLightMode ? "text-gray-800" : "text-gray-100"
                      }`}
                    >
                      {t("hero.highlight1")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
