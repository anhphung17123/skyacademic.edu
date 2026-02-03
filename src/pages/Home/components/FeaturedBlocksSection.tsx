import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, FileText, ArrowRight } from 'lucide-react';

export const FeaturedBlocksSection = () => {
  const { t } = useTranslation();

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
    {
      id: 'free-videos',
      icon: FileText,
      title: t('home.featuredBlocks.resources.title'),
      titleVi: t('home.featuredBlocks.resources.titleVi'),
      description: t('home.featuredBlocks.resources.description'),
      descriptionVi: t('home.featuredBlocks.resources.descriptionVi'),
      buttonText: t('home.featuredBlocks.resources.button'),
      buttonTextVi: t('home.featuredBlocks.resources.buttonVi'),
      link: '/free-videos',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
    },
  ];

  const currentLang = useTranslation().i18n.language;

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-6">
          {blocks.map((block) => {
            const Icon = block.icon;
            const title = currentLang === 'vi' ? block.titleVi : block.title;
            const description = currentLang === 'vi' ? block.descriptionVi : block.description;
            const buttonText = currentLang === 'vi' ? block.buttonTextVi : block.buttonText;

            return (
              <Link
                key={block.id}
                to={block.link}
                className={`group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${block.bgGradient} border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-xl`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${block.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${block.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {description}
                  </p>

                  {/* Button */}
                  <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-3 transition-all">
                    <span>{buttonText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

