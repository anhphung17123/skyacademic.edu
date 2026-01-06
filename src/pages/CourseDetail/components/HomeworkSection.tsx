import { useTranslation } from 'react-i18next';
import { FileText, ExternalLink, CheckCircle2, Upload, Clock, AlertCircle } from 'lucide-react';

export const HomeworkSection = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-100/30 to-secondary-100/30 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-xl transform hover:scale-110 transition-transform duration-300">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {t('courseDetail.homeworkTitle')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-semibold">
                {t('courseDetail.homeworkSubtitle')}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-50/80 to-secondary-50/80 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-6 md:p-8 border-l-4 border-primary-600 dark:border-primary-400 shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              {t('courseDetail.homeworkDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
        {/* Decorative background */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-100/30 to-emerald-100/30 dark:from-green-900/10 dark:to-emerald-900/10 rounded-full blur-3xl -ml-32 -mb-32" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl transform hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('courseDetail.homeworkInstructions')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                {t('courseDetail.homeworkInstructionsSubtitle')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: FileText,
                title: t('courseDetail.instruction1Title'),
                description: t('courseDetail.instruction1Desc'),
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Upload,
                title: t('courseDetail.instruction2Title'),
                description: t('courseDetail.instruction2Desc'),
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Clock,
                title: t('courseDetail.instruction3Title'),
                description: t('courseDetail.instruction3Desc'),
                gradient: 'from-orange-500 to-red-500',
              },
              {
                icon: AlertCircle,
                title: t('courseDetail.instruction4Title'),
                description: t('courseDetail.instruction4Desc'),
                gradient: 'from-green-500 to-emerald-500',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-700/30 hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-lg"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submission Form Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-100/30 to-secondary-100/30 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('courseDetail.homeworkFormTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('courseDetail.homeworkFormDescription')}
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <a
              href="https://tinyurl.com/Homeworksky"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <FileText className="w-5 h-5" />
              {t('courseDetail.homeworkFormButton')}
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('courseDetail.homeworkFormNote')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-3xl shadow-xl border border-primary-100 dark:border-primary-800 p-8 text-center">
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
          {t('courseDetail.homeworkNeedHelp')}
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all text-lg"
        >
          {t('courseDetail.homeworkContactUs')}
        </a>
      </div>
    </div>
  );
};

