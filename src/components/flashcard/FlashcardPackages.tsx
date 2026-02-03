import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Package, FileText, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import type { FlashcardPackage } from '@/types';

interface FlashcardPackagesProps {
  packages: FlashcardPackage[];
}

/** Pricing cards: Physical, PDF, Combo. */
export const FlashcardPackages = memo(({ packages: pkgs }: FlashcardPackagesProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const iconMap = {
    physical: Package,
    pdf: FileText,
    combo: Sparkles,
  } as const;

  return (
    <Section padding="lg" background="muted">
      <Container>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('flashcard.packagesTitle')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          {t('flashcard.packagesDesc')}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {pkgs.map((pkg) => {
            const Icon = iconMap[pkg.key as keyof typeof iconMap] ?? Package;
            const name = lang === 'vi' ? pkg.nameVi : pkg.nameEn;
            const description = lang === 'vi' ? pkg.descriptionVi : pkg.descriptionEn;
            const cta = lang === 'vi' ? pkg.ctaVi : pkg.ctaEn;

            return (
              <div
                key={pkg.id}
                className={`rounded-2xl border-2 overflow-hidden transition-all ${
                  pkg.highlight
                    ? 'border-amber-500 dark:border-amber-400 bg-amber-50/50 dark:bg-amber-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                      pkg.highlight
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((f, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-700 dark:text-gray-200 flex items-start gap-2"
                      >
                        <span className="text-amber-500 mt-0.5">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      pkg.highlight
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                    }`}
                  >
                    {cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
});

FlashcardPackages.displayName = 'FlashcardPackages';
