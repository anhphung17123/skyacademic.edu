import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useCallback, useMemo } from "react";
import { useTheme } from "@/contexts/theme-context";
import { PaymentFloatButton } from "@/components/payment/PaymentFloatButton";
import { Loading } from "@/components/common/Loading";
import { PageTransition } from "@/components/common/PageTransition";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ShareLinkToast } from "@/components/common/ShareLinkToast";
import { useCourseDetail } from "./hooks/useCourseDetail";
import { useShare } from "@/hooks";
import { CourseDetailHero } from "./components/CourseDetailHero";
import { CourseFeatures } from "./components/CourseFeatures";
import { CourseTabs, type CourseTabId } from "./components/CourseTabs";
import { CourseOverviewTab } from "./components/CourseOverviewTab";
import { CourseInstructorTab } from "./components/CourseInstructorTab";
import { CoursePricingSidebar } from "./components/CoursePricingSidebar";
import { HomeworkSection } from "./components/HomeworkSection";
import { FAQSection } from "./components/FAQSection";
import { PaymentModal } from "@/components/payment/PaymentModal";

export const CourseDetail = () => {
  const { i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  const isLightMode = resolvedTheme === "light";
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<CourseTabId>("overview");

  const { share, isToastVisible } = useShare({ toastDurationMs: 3000 });
  const { course, courseFreeVideos, isLoading, error } = useCourseDetail();

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = useMemo(
    () =>
      course
        ? i18n.language === "vi" && course.titleVi
          ? course.titleVi
          : course.title
        : "",
    [i18n.language, course?.titleVi, course?.title]
  );
  const shareText = useMemo(
    () =>
      course
        ? i18n.language === "vi" && course.summaryVi
          ? course.summaryVi
          : course.summary
        : "",
    [i18n.language, course?.summaryVi, course?.summary]
  );

  const handleShare = useCallback(() => {
    void share({ url: shareUrl, title: shareTitle, text: shareText });
  }, [share, shareUrl, shareTitle, shareText]);

  if (isLoading) return <Loading fullScreen />;
  if (!course) return <Navigate to="/" />;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <CourseDetailHero
          course={course}
          error={error}
          isLightMode={isLightMode}
          onShare={handleShare}
        />

        <CourseFeatures />

        <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <Section padding="lg" background="muted">
          <Container>
            <div className="grid lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-3 space-y-10">
                {activeTab === "overview" && (
                  <CourseOverviewTab
                    course={course}
                    courseFreeVideos={courseFreeVideos}
                  />
                )}
                {activeTab === "instructor" && (
                  <CourseInstructorTab course={course} />
                )}
                {activeTab === "homework" && <HomeworkSection />}
                {activeTab === "faq" && <FAQSection />}
              </div>

              <div className="lg:col-span-2 lg:self-start">
                <div className="lg:sticky lg:top-24 space-y-4">
                  <CoursePricingSidebar
                    course={course}
                    onPaymentDetails={() => setPaymentModalOpen(true)}
                    onShare={handleShare}
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      <ShareLinkToast visible={isToastVisible} />

      <PaymentFloatButton isDonation={course.price === 0} />

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        isDonation={course.price === 0}
      />
    </PageTransition>
  );
};
