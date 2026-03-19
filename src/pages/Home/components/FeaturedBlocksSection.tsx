import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { SKY_SHARE_CONFIG } from '@/config/contact.config';

const SKY_SHARE_GRADIENT = 'from-green-500 to-emerald-500';
const SKY_SHARE_BG = 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20';

export const FeaturedBlocksSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const isVi = currentLang === 'vi';

  const blocks = [
    {
      id: 'courses',
      icon: GraduationCap,
      title: t('home.featuredBlocks.courses.title'),
      titleVi: t('home.featuredBlocks.courses.titleVi'),
      description: t('home.featuredBlocks.courses.description'),
      descriptionVi: t('home.featuredBlocks.courses.descriptionVi'),
      buttonText: t('home.featuredBlocks.courses.button'),
      buttonTextVi: t('home.featuredBlocks.courses.buttonVi'),
      link: '/courses',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
    },
    {
      id: 'books',
      icon: BookOpen,
      title: t('home.featuredBlocks.books.title'),
      titleVi: t('home.featuredBlocks.books.titleVi'),
      description: t('home.featuredBlocks.books.description'),
      descriptionVi: t('home.featuredBlocks.books.descriptionVi'),
      buttonText: t('home.featuredBlocks.books.button'),
      buttonTextVi: t('home.featuredBlocks.books.buttonVi'),
      link: '/products',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
    },
  ];

  const skyShareTitle = isVi ? t('home.featuredBlocks.resources.titleVi') : t('home.featuredBlocks.resources.title');
  const skyShareDesc = isVi ? t('home.featuredBlocks.resources.descriptionVi') : t('home.featuredBlocks.resources.description');
  const joinGroupLabel = isVi ? t('home.featuredBlocks.resources.joinGroupVi') : t('home.featuredBlocks.resources.joinGroup');

  const cardBase =
    'group relative overflow-hidden rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-xl flex flex-col h-full min-h-0';

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
      <div className="container-custom">
        {/* Desktop: 2 cols — left = Courses + Packs (stacked), right = SKY SHARES (full height). Mobile: 1 col, 3 cards stacked. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left column: Courses & Packs — equal height each, combined = right column height */}
          <div className="flex flex-col gap-6 min-h-0 md:h-full">
            {blocks.map((block) => {
              const Icon = block.icon;
              const title = isVi ? block.titleVi : block.title;
              const description = isVi ? block.descriptionVi : block.description;
              const buttonText = isVi ? block.buttonTextVi : block.buttonText;
              const className = `${cardBase} bg-gradient-to-br ${block.bgGradient} md:min-h-0 md:flex-1`;

              return (
                <Link
                  key={block.id}
                  to={block.link}
                  className={className}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${block.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="relative z-10 flex flex-col h-full min-h-0">
                    <div className="flex items-center gap-3 mb-4 shrink-0">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${block.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors min-w-0">
                        {title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1 min-h-0 line-clamp-3">
                      {description}
                    </p>
                    <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-3 transition-all shrink-0 mt-auto pt-2">
                      <span>{buttonText}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right column: SKY SHARES — full height = left column */}
          <div className={`${cardBase} bg-gradient-to-br ${SKY_SHARE_BG} min-h-0`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${SKY_SHARE_GRADIENT} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            <div className="relative z-10 flex flex-col h-full min-h-0">
              <div className="flex items-center gap-3 mb-4 shrink-0">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${SKY_SHARE_GRADIENT} flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors min-w-0 line-clamp-2">
                  {skyShareTitle}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm flex-1 min-h-0 line-clamp-4" title={skyShareDesc}>
                {skyShareDesc}
              </p>
              <div className="space-y-2 shrink-0 mt-auto pt-4 border-t border-gray-200 dark:border-gray-600">
                <a
                  href={SKY_SHARE_CONFIG.skysharesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline text-sm"
                >
                  {t('home.featuredBlocks.resources.linkSkyshares')}
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
                <a
                  href={SKY_SHARE_CONFIG.languageClubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline text-sm"
                >
                  {t('home.featuredBlocks.resources.linkLanguageClub')}
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{joinGroupLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {SKY_SHARE_CONFIG.whatsappGroupUrl && (
                    <a
                      href={SKY_SHARE_CONFIG.whatsappGroupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50"
                    >
                      {t('home.featuredBlocks.resources.joinWhatsApp')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {SKY_SHARE_CONFIG.zaloGroupUrl && (
                    <a
                      href={SKY_SHARE_CONFIG.zaloGroupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50"
                    >
                      {t('home.featuredBlocks.resources.joinZalo')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

