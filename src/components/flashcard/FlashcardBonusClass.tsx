import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Gift, Check } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

interface BonusClassData {
  titleEn?: string;
  titleVi?: string;
  duration: string;
  format: string;
  items: string[];
  itemsVi?: string[];
  noExtraFee: string;
  noExtraFeeVi?: string;
}

interface FlashcardBonusClassProps {
  bonusClass: BonusClassData;
}

/** Highlight: FREE bonus class (pronunciation & communication). */
export const FlashcardBonusClass = memo(({ bonusClass }: FlashcardBonusClassProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const title = lang === 'vi' ? bonusClass.titleVi ?? '' : bonusClass.titleEn ?? '';

  return (
    <Section padding="lg" background="default">
      <Container>
        <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 dark:from-violet-900/20 dark:to-indigo-900/20 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-500/30">
                <Gift className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {bonusClass.duration} • {bonusClass.format}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              {t('flashcard.bonusIntro')}
            </p>
          </div>
          <div className="p-6 md:p-8">
            <ul className="space-y-3 mb-6">
              {(lang === 'vi' ? bonusClass.itemsVi ?? [] : bonusClass.items ?? []).map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-800 dark:text-gray-100">
                  <Check className="w-5 h-5 text-violet-500 dark:text-violet-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-sm font-semibold">
              <span aria-hidden>✓</span>
              {lang === 'vi' ? bonusClass.noExtraFeeVi ?? '' : bonusClass.noExtraFee ?? ''}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
});

FlashcardBonusClass.displayName = 'FlashcardBonusClass';
