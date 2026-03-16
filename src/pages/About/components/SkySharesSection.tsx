import { useTranslation } from 'react-i18next';

export const SkySharesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        {t('about.skyShares.title')}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {t('about.skyShares.communityProjects')}
      </p>

      <ul className="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>{t('about.skyShares.freeEngCourse')}</li>
        <li>{t('about.skyShares.freeClubEngViet')}</li>
        <li>{t('about.skyShares.freeCommunityClass')}</li>
      </ul>
    </div>
  );
};
