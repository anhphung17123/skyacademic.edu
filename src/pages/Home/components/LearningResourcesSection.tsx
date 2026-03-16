import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';

const RESOURCE_KEYS = [
  'home.learningResources.item1',
  'home.learningResources.item2',
  'home.learningResources.item3',
  'home.learningResources.item4',
  'home.learningResources.item5',
  'home.learningResources.item6',
] as const;

export const LearningResourcesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pb-6 bg-white dark:bg-slate-900">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            {t('home.learningResources.badge')}
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {t('home.learningResources.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {t('home.learningResources.description')}
          </p>
        </div>
        <ul className="max-w-2xl mx-auto space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300 text-left">
          {RESOURCE_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
