import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

interface FlashcardTargetAudienceProps {
  items: string[];
}

/** Who this product is for. */
export const FlashcardTargetAudience = memo(({ items }: FlashcardTargetAudienceProps) => {
  const { t } = useTranslation();

  return (
    <Section padding="lg" background="muted">
      <Container>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {t('flashcard.targetAudienceTitle')}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-200"
              >
                <Check className="w-5 h-5 text-violet-500 dark:text-violet-400 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
});

FlashcardTargetAudience.displayName = 'FlashcardTargetAudience';
