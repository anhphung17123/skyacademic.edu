import { useParams, Navigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { useDataFetch } from "@/hooks";
import { productApi } from "@/services/api/product-service";
import { Loading } from "@/components/common/Loading";
import { useTheme } from "@/contexts/theme-context";
import { PageTransition } from "@/components/common/PageTransition";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { PaymentFloatButton } from "@/components/payment/PaymentFloatButton";
import { PreviewGalleryModal } from "@/components/book/PreviewGalleryModal";
import { ShareLinkToast } from "@/components/common/ShareLinkToast";
import { useShare } from "@/hooks";
import { getBookPreviewImages } from "@/services/mock/data/Books";
import { BOOK_TABLE_OF_CONTENTS } from "@/services/mock/data/BookTableOfContents";
import type { BookProduct } from "@/types";
import { BookHero } from "./components/BookHero";
import { BookTabsContent, type BookTabId } from "./components/BookTabsContent";
import { BookTableOfContents } from "./components/BookTableOfContents";
import { BookPreviewSection } from "./components/BookPreviewSection";
import { BookPurchaseCard } from "./components/BookPurchaseCard";

interface BookDetailContentProps {
  book: BookProduct;
}

export function BookDetailContent({ book }: BookDetailContentProps) {
  const { resolvedTheme } = useTheme();
  const isLightMode = resolvedTheme === "light";
  const [activeTab, setActiveTab] = useState<BookTabId>("description");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewStartIndex, setPreviewStartIndex] = useState(0);
  const previewSectionRef = useRef<HTMLDivElement>(null);

  const { share, isToastVisible } = useShare({ toastDurationMs: 3000 });

  const bookSlug = book.slug ?? "";
  const previewImages = book.previewImages?.[bookSlug]?.length
    ? book.previewImages[bookSlug]
    : getBookPreviewImages(bookSlug);
  const tableOfContents =
    book.tableOfContents?.length
      ? book.tableOfContents
      : BOOK_TABLE_OF_CONTENTS[bookSlug] ?? [];

  const handleShare = useCallback(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    void share({ url });
  }, [share]);

  const handlePreviewScroll = useCallback(() => {
    previewSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const handleOpenPreviewModal = useCallback((startIndex: number) => {
    setPreviewStartIndex(startIndex);
    setIsPreviewModalOpen(true);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <BookHero
          book={book}
          isLightMode={isLightMode}
          onPreviewScroll={handlePreviewScroll}
        />

        <Section padding="lg" background="default">
          <Container>
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <BookTabsContent
                  book={book}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />

                {activeTab !== "reviews" && (
                  <BookTableOfContents items={tableOfContents} />
                )}

                <BookPreviewSection
                  previewImages={previewImages}
                  previewSectionRef={previewSectionRef}
                  onOpenModal={handleOpenPreviewModal}
                />
              </div>

              <div className="lg:col-span-2">
                <BookPurchaseCard
                  book={book}
                  isLightMode={isLightMode}
                  onShare={handleShare}
                />
              </div>
            </div>
          </Container>
        </Section>

        {previewImages.length > 0 && (
          <PreviewGalleryModal
            isOpen={isPreviewModalOpen}
            onClose={() => setIsPreviewModalOpen(false)}
            images={previewImages}
            startIndex={previewStartIndex}
          />
        )}

        <ShareLinkToast visible={isToastVisible} />

        <PaymentFloatButton isDonation={book.price === 0} />
      </div>
    </PageTransition>
  );
}

export function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: book, isLoading, error } = useDataFetch(
    () => (slug ? productApi.getBookBySlug(slug) : Promise.resolve(null)),
    { immediate: !!slug }
  );

  if (!slug) return <Navigate to="/products" replace />;
  if (isLoading) return <Loading fullScreen />;
  if (error || !book) return <Navigate to="/products" replace />;

  return <BookDetailContent book={book} />;
}
