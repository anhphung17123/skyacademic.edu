import { Tag, Gift, Percent } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { mockSiteStats } from '@/services/mock/data/SiteStats';
import {
  formatPrice,
  formatApproximateVndFromUsd,
  shouldShowApproxVnd,
} from '@/utils/currency';
import { clsx } from 'clsx';

interface PriceDisplayProps {
  price: number;
  salePrice?: number;
  currency?: string;
  variant?: 'large' | 'small';
  showLabel?: boolean;
  className?: string;
}

export const PriceDisplay = ({
  price,
  salePrice,
  currency = 'USD',
  variant = 'large',
  showLabel = true,
  className,
}: PriceDisplayProps) => {
  const { t } = useTranslation();
  const isFree = price === 0;
  const hasDiscount = salePrice !== undefined && salePrice > 0 && salePrice < price;
  const displayPrice = hasDiscount ? salePrice : price;
  const discountPercent = hasDiscount ? Math.round(((price - salePrice!) / price) * 100) : 0;

  if (isFree) {
    return (
      <div
        className={clsx(
          'inline-flex items-center rounded-2xl border-2 border-green-500 bg-green-500 shadow-lg shadow-green-500/40 transition-all duration-300 hover:scale-[1.02]',
          variant === 'large'
            ? 'gap-4 px-7 py-5'
            : 'gap-2.5 px-4 py-2.5',
          className
        )}
      >
        <div className={clsx(
          'rounded-xl bg-black/20',
          variant === 'large' ? 'p-3' : 'p-2'
        )}>
          <Gift
            className={clsx(
              'text-white',
              variant === 'large' ? 'w-6 h-6' : 'w-5 h-5'
            )}
            strokeWidth={2.5}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span
            className={clsx(
              'font-black leading-none text-white',
              variant === 'large'
                ? 'text-4xl lg:text-5xl'
                : 'text-xl'
            )}
          >
            {t('courseDetail.free')}
          </span>
          {variant === 'large' && mockSiteStats.freeContentPercent > 0 && (
            <span className="text-sm font-bold uppercase tracking-wider text-white">
              {t('courseDetail.oneHundredPercentFree', { percent: mockSiteStats.freeContentPercent })}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      {/* 1. Floating Discount Badge */}
      {hasDiscount && (
        <div className={clsx(
          "absolute -right-2 -top-3 z-10 flex items-center justify-center rounded-full bg-yellow-300 font-black text-red-600 shadow-md ring-2 ring-white animate-bounce-subtle",
          variant === 'large' ? "h-12 w-12 text-sm" : "h-9 w-9 text-[10px]"
        )}>
          -{discountPercent}%
        </div>
      )}

      <div
        className={clsx(
          'inline-flex items-center rounded-2xl border-2 shadow-lg transition-all duration-500 hover:scale-[1.03] group',
          hasDiscount
            ? 'border-red-500 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 shadow-red-500/30'
            : 'border-yellow-500 bg-yellow-500 shadow-yellow-500/30',
          variant === 'large' ? 'gap-4 px-7 py-5' : 'gap-2.5 px-4 py-2.5',
          className
        )}
      >
        {/* 2. Animated Icon Container */}
        <div className={clsx(
          'rounded-xl bg-black/20 flex items-center justify-center transition-transform group-hover:rotate-12',
          variant === 'large' ? 'p-3' : 'p-2'
        )}>
          {hasDiscount ? (
            <Percent
              className={clsx(
                'text-white animate-pulse-slow',
                variant === 'large' ? 'w-6 h-6' : 'w-5 h-5'
              )}
              strokeWidth={3}
            />
          ) : (
            <Tag
              className={clsx(
                'text-white',
                variant === 'large' ? 'w-6 h-6' : 'w-5 h-5'
              )}
              strokeWidth={2.5}
            />
          )}
        </div>

        <div className="flex flex-col">
          {showLabel && variant === 'large' && (
            <span className="mb-0.5 text-[10px] font-black uppercase tracking-widest text-white/80">
              {hasDiscount ? t('courses.sale', 'LIMITED OFFER') : t('courses.price')}
            </span>
          )}

          <div className="flex items-center gap-2">
            <span
              className={clsx(
                'font-black leading-none text-white drop-shadow-md',
                variant === 'large' ? 'text-4xl lg:text-5xl' : 'text-xl'
              )}
            >
              {formatPrice(displayPrice, currency, t('common.free'))}
            </span>

            {hasDiscount && (
              <span
                className={clsx(
                  'font-bold text-white/40 line-through decoration-white/60 decoration-2',
                  variant === 'large' ? 'text-lg lg:text-xl' : 'text-xs'
                )}
              >
                {formatPrice(price, currency, t('common.free'))}
              </span>
            )}
          </div>

          {/* 3. Secondary Info (Currency Conversion) */}
          {shouldShowApproxVnd(displayPrice, currency) && (
            <span
              className={clsx(
                'mt-1 font-bold tabular-nums text-white/90 bg-black/10 rounded-lg px-2 py-0.5 self-start',
                variant === 'large' ? 'text-xs lg:text-sm' : 'text-[10px]'
              )}
            >
              {formatApproximateVndFromUsd(displayPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
