import { Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { formatPrice } from "@/utils/currency";
import { clsx } from "clsx";
import { PaymentFloatButton } from "@/components/payment/PaymentFloatButton";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Award,
  HelpCircle,
  Globe,
  Users,
  CheckCircle2,
  Zap,
  Star,
  FileText,
} from "lucide-react";
import { Loading } from "@/components/common/Loading";
import { PageTransition } from "@/components/common/PageTransition";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { useCourseDetail } from "./hooks/useCourseDetail";
import { CourseHeader } from "./components/CourseHeader";
import { FreeVideosSection } from "./components/FreeVideosSection";
import { FAQSection } from "./components/FAQSection";
import { HomeworkSection } from "./components/HomeworkSection";
import { PaymentInfo } from "@/components/payment/PaymentInfo";
import { useTheme } from "@/contexts/theme-context";

export const CourseDetail = () => {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  const isLightMode = resolvedTheme === "light";
  const [activeTab, setActiveTab] = useState<
    "overview" | "instructor" | "homework" | "faq"
  >("overview");
  const {
    course,
    courseFreeVideos,
    isLoading,
    error,
  } = useCourseDetail();

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (!course) return <Navigate to="/" />;

  const currentLang = i18n.language;
  const tabs = [
    { id: "overview", label: t("courseDetail.tabOverview"), icon: BookOpen },
    { id: "instructor", label: t("courseDetail.tabInstructor"), icon: Award },
    { id: "homework", label: t("courseDetail.tabHomework"), icon: FileText },
    { id: "faq", label: t("courseDetail.tabFAQ"), icon: HelpCircle },
  ];

  const courseFeatures = [
    {
      icon: Globe,
      title: t("courseDetail.featureBilingual"),
      description: t("courseDetail.featureBilingualDesc"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: t("courseDetail.featureFlexible"),
      description: t("courseDetail.featureFlexibleDesc"),
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Award,
      title: t("courseDetail.featureExpert"),
      description: t("courseDetail.featureExpertDesc"),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: BookOpen,
      title: t("courseDetail.featureMaterials"),
      description: t("courseDetail.featureMaterialsDesc"),
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className={isLightMode 
          ? "relative bg-gradient-to-br from-primary-500 via-blue-500 to-secondary-500 overflow-hidden"
          : "relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 overflow-hidden"
        }>
          {/* Subtle Background Elements */}
          <div className="absolute inset-0">
            <div className={isLightMode 
              ? "absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl animate-pulse-soft"
              : "absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl animate-pulse-soft"
            } />
            <div
              className={isLightMode
                ? "absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-300/15 rounded-full blur-3xl animate-pulse-soft"
                : "absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-400/8 rounded-full blur-3xl animate-pulse-soft"
              }
              style={{ animationDelay: "1s" }}
            />
          </div>
          
          {/* Overlay for better text contrast - lighter in light mode */}
          <div className={isLightMode
            ? "absolute inset-0 bg-gradient-to-b from-black/15 via-black/8 to-black/5 pointer-events-none z-0"
            : "absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/10 pointer-events-none z-0"
          } />

          <Container>
            <div className="py-12 md:py-16 relative z-10">
              <Link
                to="/courses"
                className={isLightMode
                  ? "inline-flex items-center gap-2 text-white hover:text-white transition-colors mb-10 group font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                  : "inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-10 group drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                }
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">
                  {t("common.backToCourses")}
                </span>
              </Link>
              <CourseHeader course={course} error={error} />
            </div>
          </Container>

          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 60"
              className="w-full h-12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
                fill="currentColor"
                className="text-gray-50 dark:text-gray-900"
              />
            </svg>
          </div>
        </div>

        {/* Course Features */}
        <Section
          padding="none"
          background="transparent"
          className="relative -mt-8 z-10"
        >
          <div className="bg-white dark:bg-gray-900 pt-8 sm:pt-12 pb-0">
            <Container>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courseFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    >
                      {/* Background gradient on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />

                      {/* Icon container */}
                      <div
                        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Content */}
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Decorative corner */}
                      <div
                        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-500`}
                      />
                    </div>
                  );
                })}
              </div>
            </Container>
          </div>
        </Section>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-md">
          <Container>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setActiveTab(
                        tab.id as "overview" | "instructor" | "homework" | "faq"
                      )
                    }
                    className={`relative flex items-center gap-3 px-8 py-3 font-semibold transition-all duration-300 rounded-t-xl ${
                      isActive
                        ? "text-primary-600 dark:text-primary-400 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent"
                        : "text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <tab.icon
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isActive ? "scale-110" : ""
                      }`}
                    />
                    <span className="whitespace-nowrap">{tab.label}</span>
                    {isActive && (
                      <>
                        {/* Active indicator bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 rounded-t-full" />
                        {/* Active glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-primary-100/50 to-transparent dark:from-primary-900/10 dark:to-transparent rounded-t-xl -z-10" />
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </Container>
        </div>

        {/* Main Content */}
        <Section padding="lg" background="muted">
          <Container>
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Left Column - Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Overview Tab Content */}
                {activeTab === "overview" && (
                  <>
                    {/* Course Description */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                      {/* Decorative background */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/30 to-secondary-100/30 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-full blur-3xl -mr-32 -mt-32" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-xl transform hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-7 h-7" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                              {t("courseDetail.descriptionTitle")}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                              {t("courseDetail.descriptionSubtitle")}
                            </p>
                          </div>
                        </div>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                          <div className="bg-gradient-to-r from-primary-50/80 to-secondary-50/80 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-6 md:p-8 border-l-4 border-primary-600 dark:border-primary-400 shadow-lg">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line">
                              {currentLang === "vi" && course.descriptionVi
                                ? course.descriptionVi
                                : currentLang === "en" && course.descriptionEn
                                ? course.descriptionEn
                                : course.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* What You'll Get */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                      {/* Decorative background */}
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-100/30 to-emerald-100/30 dark:from-green-900/10 dark:to-emerald-900/10 rounded-full blur-3xl -ml-32 -mb-32" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl transform hover:scale-110 transition-transform duration-300">
                            <CheckCircle2 className="w-7 h-7" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                              {t("courseDetail.whatYouGet")}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                              {t("courseDetail.whatYouGetSubtitle")}
                            </p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                          {[
                            {
                              icon: BookOpen,
                              text: t("courseDetail.getMaterials"),
                            },
                            { icon: Users, text: t("courseDetail.getSupport") },
                            {
                              icon: Globe,
                              text: t("courseDetail.getBilingual"),
                            },
                            {
                              icon: Clock,
                              text: t("courseDetail.getFlexible"),
                            },
                          ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <div
                                key={idx}
                                className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-700/30 hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300 group border border-gray-200/50 dark:border-gray-600/50 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-lg"
                              >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                  <Icon className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 font-semibold text-base group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                                  {item.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    {/* Free Videos Section */}
                    {courseFreeVideos && courseFreeVideos.length > 0 && (
                      <FreeVideosSection courseFreeVideos={courseFreeVideos} />
                    )}
                  </>
                )}

                {/* Instructor Tab Content */}
                {activeTab === "instructor" && (
                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                    {/* Decorative background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/30 to-cyan-100/30 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-full blur-3xl -mr-32 -mt-32" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-xl transform hover:scale-110 transition-transform duration-300">
                          <Award className="w-7 h-7" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t("courseDetail.instructorTitle")}
                          </h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                            {t("courseDetail.instructorSubtitle")}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-8 border border-blue-100 dark:border-blue-800 shadow-inner">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                              {t("courseDetail.instructorName")}
                            </h3>
                            <p className="text-primary-600 dark:text-primary-400 font-bold mb-4 text-xl">
                              {t("courseDetail.instructorRole")}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                              {t("courseDetail.instructorDescription")}
                            </p>
                          </div>
                          <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-blue-200 dark:border-blue-700">
                            {[
                              {
                                icon: Award,
                                text: t("courseDetail.instructorBed"),
                              },
                              {
                                icon: Star,
                                text: t("courseDetail.instructorTesol"),
                              },
                              {
                                icon: CheckCircle2,
                                text: t("courseDetail.instructorIelts"),
                              },
                            ].map((item, idx) => {
                              const Icon = item.icon;
                              return (
                                <div
                                  key={idx}
                                  className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
                                >
                                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                                    {item.text}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Homework Tab Content */}
                {activeTab === "homework" && <HomeworkSection />}

                {/* FAQ Tab Content */}
                {activeTab === "faq" && <FAQSection />}
              </div>

              {/* Right Column - Registration & Payment */}
              <div className="space-y-6">
                <div className="lg:sticky lg:top-36 space-y-6">
                  {/* Price Display */}
                  {course.price > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                      <span className={clsx(
                        "text-3xl font-bold",
                        isLightMode
                          ? "text-gray-900"
                          : "text-white"
                      )}>
                        {formatPrice(course.price, course.currency || "USD")}
                      </span>
                    </div>
                  )}

                  {/* Free Course Info */}
                  {course.type === "free_youtube" && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {t("courseDetail.freeCourse")}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {t("courseDetail.freeCourseDesc")}
                        </p>
                      </div>
                      {course.youtubePlaylistUrl && (
                        <a
                          href={course.youtubePlaylistUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 dark:from-red-500 dark:to-red-600 hover:from-red-700 hover:to-red-600 dark:hover:from-red-400 dark:hover:to-red-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg dark:shadow-[0_8px_24px_-4px_rgba(239,68,68,0.4)] shadow-[0_4px_12px_-2px_rgba(220,38,38,0.3)] hover:shadow-xl dark:hover:shadow-[0_12px_32px_-4px_rgba(239,68,68,0.5)] hover:shadow-[0_8px_20px_-4px_rgba(220,38,38,0.4)] hover:scale-105 border border-red-500/20 dark:border-red-400/30 hover:border-red-500/30 dark:hover:border-red-400/50"
                        >
                          <BookOpen className="w-5 h-5" />
                          {t("courseDetail.watchOnYouTube")}
                        </a>
                      )}
                    </div>
                  )}

                  {/* Payment Info - Desktop only */}
                  <div className="hidden lg:block">
                    <PaymentInfo 
                      showQrCode={true} 
                      showContactInfo={true} 
                      isDonation={course.price === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      {/* Payment Float Button - Mobile/Tablet only */}
      <PaymentFloatButton isDonation={course.price === 0} />
    </PageTransition>
  );
};
