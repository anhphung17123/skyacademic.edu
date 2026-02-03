import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Share2, Package, FileText, Sparkles, Check, Maximize2 } from 'lucide-react';
import { PageTransition } from '@/components/common/PageTransition';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { HorizontalScroll } from '@/components/common/HorizontalScroll';
import { FlashcardHero } from '@/components/flashcard/FlashcardHero';
import { FlashcardPreviewGallery } from '@/components/flashcard/FlashcardPreviewGallery';
import { FlashcardPreviewModal } from '@/components/flashcard/FlashcardPreviewModal';
import { FlashcardTargetAudience } from '@/components/flashcard/FlashcardTargetAudience';
import { PaymentModal } from '@/components/payment/PaymentModal';
import type { FlashcardProduct } from '@/types';
import { getTopicCoverUrl } from '@/utils/flashcard';
import { clsx } from 'clsx';

interface FlashcardDetailContentProps {
  product: FlashcardProduct;
}

const packageIcons = {
  physical: Package,
  pdf: FileText,
  combo: Sparkles,
} as const;

/**
 * Flashcard detail: Hero → topic cards (visual choice) → active topic content & gallery → bonus → audience.
 * Price $12/set, 3 sets $30. Payment section only in modal when user clicks Mua thẻ giấy / PDF / Combo.
 */
export const FlashcardDetailContent = memo(({ product }: FlashcardDetailContentProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const topic = product.topics[activeTabIndex];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <FlashcardHero product={product} />

        <Section padding="lg" background="default">
          <Container>
            <div className="space-y-10">
              {/* Topic cards – one row on small (horizontal scroll), grid 3 cols on large */}
              <div className="lg:hidden">
                <HorizontalScroll showControls={true} scrollStep={320}>
                  {product.topics.map((t, i) => {
                    const name = lang === 'vi' ? t.nameVi : t.nameEn;
                    const shortPurpose = lang === 'vi' ? t.purposeVi : t.purposeEn;
                    const thumbnail = getTopicCoverUrl(t);
                    const isActive = activeTabIndex === i;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setActiveTabIndex(i)}
                        className={clsx(
                          'w-[min(100%,320px)] min-w-[280px] flex-shrink-0 text-left rounded-2xl border-2 overflow-hidden transition-all duration-200',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
                          isActive
                            ? 'border-violet-500 dark:border-violet-400 shadow-lg shadow-violet-200/40 dark:shadow-violet-900/30 bg-violet-50/50 dark:bg-violet-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-md bg-white dark:bg-gray-800'
                        )}
                      >
                        <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                          {thumbnail ? (
                            <img
                              src={thumbnail}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-4xl">
                              📚
                            </div>
                          )}
                          <div
                            className={clsx(
                              'absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 to-transparent',
                              isActive && 'from-violet-900/80'
                            )}
                          >
                            <span
                              className={clsx(
                                'text-lg font-bold text-white drop-shadow',
                                isActive && 'underline underline-offset-2 decoration-2'
                              )}
                            >
                              {name}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                            {shortPurpose}
                          </p>
                          {t.examples?.length > 0 && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              {lang === 'vi' ? 'Ví dụ: ' : 'E.g. '}
                              {t.examples.slice(0, 3).join(', ')}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </HorizontalScroll>
              </div>
              <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                {product.topics.map((t, i) => {
                  const name = lang === 'vi' ? t.nameVi : t.nameEn;
                  const shortPurpose = lang === 'vi' ? t.purposeVi : t.purposeEn;
                  const thumbnail = getTopicCoverUrl(t);
                  const isActive = activeTabIndex === i;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setActiveTabIndex(i)}
                      className={clsx(
                        'text-left rounded-2xl border-2 overflow-hidden transition-all duration-200',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
                        isActive
                          ? 'border-violet-500 dark:border-violet-400 shadow-lg shadow-violet-200/40 dark:shadow-violet-900/30 bg-violet-50/50 dark:bg-violet-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-md bg-white dark:bg-gray-800'
                      )}
                    >
                      <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-4xl">
                            📚
                          </div>
                        )}
                        <div
                          className={clsx(
                            'absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 to-transparent',
                            isActive && 'from-violet-900/80'
                          )}
                        >
                          <span
                            className={clsx(
                              'text-lg font-bold text-white drop-shadow',
                              isActive && 'underline underline-offset-2 decoration-2'
                            )}
                          >
                            {name}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {shortPurpose}
                        </p>
                        {t.examples?.length > 0 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {lang === 'vi' ? 'Ví dụ: ' : 'E.g. '}
                            {t.examples.slice(0, 3).join(', ')}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active topic content + packages row (no sticky sidebar) */}
              <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
                <div className="lg:col-span-2 space-y-10">
                  {/* Preview gallery – active topic only */}
                  {topic && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {t('flashcard.previewCards')}
                          </h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {t('flashcard.previewCardsDesc')}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPreviewModalOpen(true)}
                          className="flex-shrink-0 p-2.5 rounded-xl text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:text-gray-400 dark:hover:text-violet-400 dark:hover:bg-violet-900/30 transition-colors"
                          aria-label={t('flashcard.previewCards')}
                          title={t('flashcard.previewCards')}
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="p-6 sm:p-8">
                        <FlashcardPreviewGallery topics={[topic]} images={topic.images} />
                      </div>
                    </div>
                  )}

                  {/* Modal xem trước thẻ (zoom) */}
                  <FlashcardPreviewModal
                    isOpen={previewModalOpen}
                    onClose={() => setPreviewModalOpen(false)}
                    topic={topic ?? null}
                  />

                  <FlashcardTargetAudience items={lang === 'vi' ? product.targetAudienceVi : product.targetAudience} />
                </div>

                {/* Right: price + package CTAs (open modal on click) */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-600 shadow-lg overflow-hidden p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {t('flashcard.choosePackage')}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                      {t('flashcard.choosePackageDesc')}
                    </p>
                    {/* Retail price – strong highlight */}
                    <div className="rounded-xl bg-amber-200 dark:bg-amber-800/50 border-2 border-amber-500 dark:border-amber-400 px-5 py-4 mb-6 shadow-lg shadow-amber-300/40 dark:shadow-amber-900/40">
                      <p className="text-xl font-bold uppercase tracking-wider text-amber-800 dark:text-amber-200 mb-2">
                        {t('courses.price')}
                      </p>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {t('flashcard.pricePerSet')}
                        </span>
                        <span className="text-xl font-black text-amber-700 dark:text-amber-300">
                          {t('flashcard.priceThreeSets')}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {product.packages.map((pkg) => {
                        const Icon = packageIcons[pkg.key as keyof typeof packageIcons] ?? Package;
                        const cta = lang === 'vi' ? pkg.ctaVi : pkg.ctaEn;
                        return (
                          <div key={pkg.id} className="space-y-1">
                            <button
                              type="button"
                              onClick={() => setPaymentModalOpen(true)}
                              className={clsx(
                                'w-full py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-all',
                                pkg.highlight
                                  ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-md hover:shadow-lg ring-2 ring-violet-400/40 dark:ring-violet-500/30'
                                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                              )}
                            >
                              <Icon className="w-5 h-5 flex-shrink-0" />
                              <span>{cta}</span>
                              {pkg.highlight && (
                                <span className="text-xs font-medium opacity-90">
                                  ({t('flashcard.recommended')})
                                </span>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      {[
                        lang === 'vi' ? 'Thẻ giấy + PDF + Lớp học' : 'Physical + PDF + Free class',
                        lang === 'vi' ? 'Thanh toán an toàn' : 'Secure payment',
                        lang === 'vi' ? 'Hỗ trợ sau mua' : 'Post-purchase support',
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-violet-500 dark:text-violet-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={async () => {
                        const url = window.location.href;
                        try {
                          await navigator.clipboard.writeText(url);
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                        } catch (err) {
                          // Fallback for older browsers
                          const textArea =
                            document.createElement("textarea");
                          textArea.value = url;
                          document.body.appendChild(textArea);
                          textArea.select();
                          document.execCommand("copy");
                          document.body.removeChild(textArea);
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                        }
                      }}
                      className="w-full mt-4 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2 transition-all"
                    >
                      <Share2 className="w-4 h-4" />
                      {t('bookDetail.share')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          isDonation={false}
        />

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-24 right-6 z-50 animate-slide-up">
            <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[280px]">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{t("common.linkCopied")}</span>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
});

FlashcardDetailContent.displayName = 'FlashcardDetailContent';
