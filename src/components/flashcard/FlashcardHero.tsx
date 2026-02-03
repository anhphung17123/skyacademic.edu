import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gift, Check } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { FlashcardProduct } from '@/types';

interface FlashcardHeroProps {
  product: FlashcardProduct;
}

/**
 * Hero section for Flashcard product page.
 * Left: title, subtitle, description. Right: stacked flashcard mockup + bonus class card (redesigned).
 */
export const FlashcardHero = memo(({ product }: FlashcardHeroProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { bonusClass } = product;

  const title = lang === 'vi' ? product.titleVi : product.titleEn;
  const subtitle = lang === 'vi' ? product.subtitleVi : product.subtitleEn;
  const description = lang === 'vi' ? product.descriptionVi : product.descriptionEn;
  const bonusTitle = lang === 'vi' ? bonusClass.titleVi : bonusClass.titleEn;
  const bonusItems = lang === 'vi' ? bonusClass.itemsVi : bonusClass.items;
  const noExtraFee = lang === 'vi' ? bonusClass.noExtraFeeVi : bonusClass.noExtraFee;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(165deg, var(--page-primary) 0%, var(--page-secondary) 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-white/[0.06] pointer-events-none z-0" />

      <Container>
        <div className="py-8 md:py-12 relative z-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-white/95 hover:text-white transition-colors mb-6 group font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">{t('common.backToProducts')}</span>
          </Link>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-12 items-stretch">
            {/* Left: text – full width of column, padding from edge */}
            <div className="text-white space-y-5 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-0 flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug tracking-tight text-white">
                {title}
              </h1>
              <p className="text-lg sm:text-xl text-white/95 font-medium">
                {subtitle}
              </p>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Right: bonus class card – width fits content, aligned end */}
            <div className="flex flex-col items-center lg:items-end justify-center w-full lg:w-auto mx-auto">
              <div className="w-fit min-w-[360px] max-w-sm rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-600 bg-[color-mix(in_srgb,var(--page-primary)_12%,white)] dark:bg-[color-mix(in_srgb,var(--page-primary)_25%,#1f2937)]">
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2.5 rounded-xl text-white flex-shrink-0"
                      style={{ backgroundColor: 'var(--page-primary)' }}
                    >
                      <Gift className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                        {bonusTitle}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                        {bonusClass.duration} • {bonusClass.format}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <ul className="space-y-2.5 mb-3">
                    {(bonusItems ?? []).slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-200">
                        <Check
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: 'var(--page-primary)' }}
                        />
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-200 text-sm font-medium">
                    <span aria-hidden className="text-emerald-600 dark:text-emerald-400">✓</span>
                    {noExtraFee}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Soft transition to content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none" />
    </div>
  );
});

FlashcardHero.displayName = 'FlashcardHero';
