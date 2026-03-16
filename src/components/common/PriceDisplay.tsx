import { Tag, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { mockSiteStats } from '@/services/mock/data/SiteStats';
import { formatPrice } from '@/utils/currency';
import { clsx } from 'clsx';

interface PriceDisplayProps {
  price: number;
  currency?: string;
  variant?: 'large' | 'small';
  showLabel?: boolean;
  className?: string;
}

export const PriceDisplay = ({
  price,
  currency = 'USD',
  variant = 'large',
  showLabel = true,
  className,
}: PriceDisplayProps) => {
  const { t } = useTranslation();
  const isFree = price === 0;

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
    <div
      className={clsx(
        'inline-flex items-center rounded-2xl border-2 border-yellow-500 bg-yellow-500 shadow-lg shadow-yellow-500/40 transition-all duration-300 hover:scale-[1.02]',
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
        <Tag
          className={clsx(
            'text-white',
            variant === 'large' ? 'w-6 h-6' : 'w-5 h-5'
          )}
          strokeWidth={2.5}
        />
      </div>
      <div className="flex flex-col">
        {showLabel && variant === 'large' && (
          <span className="mb-1 text-xs font-bold uppercase tracking-wider text-white">
            {t('courses.price')}
          </span>
        )}
        <span
          className={clsx(
            'font-black leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]',
            variant === 'large'
              ? 'text-4xl lg:text-5xl'
              : 'text-xl'
          )}
        >
          {formatPrice(price, currency, t('common.free'))}
        </span>
      </div>
    </div>
  );
};

