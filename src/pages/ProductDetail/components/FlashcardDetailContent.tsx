import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Share2, Package, FileText, Sparkles, Check, Maximize2 } from 'lucide-react';
import { PageTransition } from '@/components/common/PageTransition';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { HorizontalScroll } from '@/components/common/HorizontalScroll';
import { FlashcardHero } from '@/components/flashcard/FlashcardHero';
import { FlashcardTopicCard } from '@/components/flashcard/FlashcardTopicCard';
import { FlashcardPreviewGallery } from '@/components/flashcard/FlashcardPreviewGallery';
import { FlashcardPreviewModal } from '@/components/flashcard/FlashcardPreviewModal';
import { FlashcardTargetAudience } from '@/components/flashcard/FlashcardTargetAudience';
import { PaymentModal } from '@/components/payment/PaymentModal';
import { ShareLinkToast } from '@/components/common/ShareLinkToast';
import { useShare } from '@/hooks';
import type { FlashcardProduct } from '@/types';
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
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const { share, isToastVisible } = useShare({ toastDurationMs: 3000 });
  const topic = product.topics[activeTabIndex];

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    void share({ url });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <FlashcardHero product={product} />

        {product.creator && (
          <Section padding="sm" background="muted">
            <Container>
              <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                <img
                  src={product.creator.imageUrl}
                  alt={product.creator.name}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('courseDetail.createdBy')}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {lang === 'vi' && product.creator.nameVi ? product.creator.nameVi : product.creator.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {lang === 'vi' && product.creator.roleVi ? product.creator.roleVi : product.creator.role}
                  </p>
                </div>
              </div>
            </Container>
          </Section>
        )}

        <Section padding="lg" background="default">
          <Container>
            <div className="space-y-10">
              {/* Topic cards – horizontal scroll on small, grid on large */}
              <div className="lg:hidden">
                <HorizontalScroll showControls={true} scrollStep={320}>
                  {product.topics.map((topic, i) => (
                    <FlashcardTopicCard
                      key={topic.key}
                      topic={topic}
                      lang={lang}
                      isActive={activeTabIndex === i}
                      onClick={() => setActiveTabIndex(i)}
                      className="w-[min(100%,320px)] min-w-[280px] flex-shrink-0"
                    />
                  ))}
                </HorizontalScroll>
              </div>
              <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                {product.topics.map((topic, i) => (
                  <FlashcardTopicCard
                    key={topic.key}
                    topic={topic}
                    lang={lang}
                    isActive={activeTabIndex === i}
                    onClick={() => setActiveTabIndex(i)}
                  />
                ))}
              </div>

              {/* Active topic content + packages row (no sticky sidebar) */}
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
                <div className="lg:col-span-3 space-y-10">
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
                <div className="lg:col-span-2 space-y-6">
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
                        t('flashcard.packageFeatures.physicalPdfClass'),
                        t('flashcard.packageFeatures.securePayment'),
                        t('flashcard.packageFeatures.postPurchaseSupport'),
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-violet-500 dark:text-violet-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={handleShare}
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

        <ShareLinkToast visible={isToastVisible} />
      </div>
    </PageTransition>
  );
});

FlashcardDetailContent.displayName = 'FlashcardDetailContent';
