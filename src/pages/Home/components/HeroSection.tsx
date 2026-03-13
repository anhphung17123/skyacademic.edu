import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, CheckCircle } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { clsx } from 'clsx';
import { useFeaturedVideo } from '../hooks/useFeaturedVideo';
import { HeroVideoCard } from './HeroVideoCard';
import type { FreeVideoDto } from '@/types/api';

export interface HeroSectionProps {
  featuredVideo?: FreeVideoDto | null;
}

export const HeroSectionContent = ({ featuredVideo }: HeroSectionProps = {}) => {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  const isLightMode = resolvedTheme === 'light';
  const currentLang = i18n.language;

  const highlights = [
    t('hero.highlight1'),
    t('hero.highlight2'),
    t('hero.highlight3'),
  ];

  return (
    <section
      className={`relative min-h-[70vh] flex items-center overflow-hidden ${
        isLightMode
          ? 'bg-gradient-to-br from-white via-gray-50/50 to-white'
          : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {isLightMode ? (
          <>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]" />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </>
        )}
      </div>

      <div className="container-custom relative z-10 py-20 lg:py-28">
        <div className={clsx(
          'grid gap-10 lg:gap-16 items-center',
          featuredVideo ? 'lg:grid-cols-2' : 'lg:grid-cols-1 lg:max-w-4xl lg:mx-auto'
        )}>
          <div className={clsx(
            'text-center space-y-6',
            featuredVideo ? 'lg:text-left' : 'lg:text-center'
          )}>
            <div
              className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium mb-4 ${
                isLightMode
                  ? 'bg-primary-50/80 backdrop-blur-sm border border-primary-200/50 text-primary-700 shadow-sm'
                  : 'bg-primary-500/10 backdrop-blur-sm border border-primary-500/20 text-primary-300'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLightMode ? 'bg-primary-500' : 'bg-primary-400'}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLightMode ? 'bg-primary-600' : 'bg-primary-500'}`} />
              </span>
              {t('hero.badge')}
            </div>

            <div className="space-y-3">
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight ${isLightMode ? 'text-gray-800' : 'text-gray-100'}`}>
                {t('hero.title')}
              </h1>
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight bg-clip-text text-transparent ${
                  isLightMode
                    ? 'bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600'
                    : 'bg-gradient-to-r from-primary-400 via-primary-300 to-secondary-400'
                }`}
              >
                {t('hero.titleHighlight')}
              </h2>
            </div>

            <p className={`text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
              {t('hero.subtitle')}
            </p>

            <div className={clsx(
              'flex flex-wrap gap-3 pt-2',
              featuredVideo ? 'justify-center lg:justify-start' : 'justify-center'
            )}>
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isLightMode
                      ? 'bg-white/90 backdrop-blur-sm border border-gray-300/80 text-gray-800 shadow-sm'
                      : 'bg-white/10 backdrop-blur-sm border border-white/20 text-gray-200 shadow-sm'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isLightMode ? 'text-primary-600' : 'text-primary-400'}`} />
                  <span className="font-semibold text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className={clsx(
              'flex flex-col sm:flex-row gap-3 pt-3',
              featuredVideo ? 'justify-center lg:justify-start' : 'justify-center'
            )}>
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-600 hover:from-primary-700 hover:to-primary-600 dark:hover:from-primary-400 dark:hover:to-primary-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg dark:shadow-[0_8px_24px_-4px_rgba(59,130,246,0.4)] shadow-[0_4px_12px_-2px_rgba(37,99,235,0.3)] hover:shadow-xl dark:hover:shadow-[0_12px_32px_-4px_rgba(59,130,246,0.5)] hover:shadow-[0_8px_20px_-4px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 border border-primary-500/20 dark:border-primary-400/30 hover:border-primary-500/30 dark:hover:border-primary-400/50"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://www.youtube.com/@skyacademy0"
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center justify-center gap-2.5 border-2 font-semibold px-6 py-3 rounded-xl transition-all duration-300 ${
                  isLightMode
                    ? 'bg-white hover:bg-gray-50 border-gray-300 text-gray-800 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-md hover:border-white/40 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:shadow-white/10'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    isLightMode ? 'bg-primary-100 group-hover:bg-primary-200' : 'bg-white/10 group-hover:bg-white/20'
                  } transition-colors`}
                >
                  <Play className={`w-4 h-4 ml-0.5 ${isLightMode ? 'text-primary-600' : 'text-white'}`} />
                </div>
                <span>{t('hero.secondaryCta')}</span>
              </a>
            </div>

            <div className={clsx(
              'flex flex-wrap items-center gap-5 pt-6',
              featuredVideo ? 'justify-center lg:justify-start' : 'justify-center'
            )}>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-1 justify-center lg:justify-start mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className={`text-xs font-medium ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  {t('hero.trustedByLearners')}
                </p>
              </div>
              <div className={`w-px h-10 ${isLightMode ? 'bg-gray-300' : 'bg-gray-700'}`} />
              <div className="text-center lg:text-left">
                <p className={`text-xl font-bold ${isLightMode ? 'text-gray-800' : 'text-gray-100'}`}>
                  {t('hero.highlight1')}
                </p>
                <p className={`text-xs ${isLightMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {t('hero.activeStudents')}
                </p>
              </div>
            </div>
          </div>

          {featuredVideo && (
            <HeroVideoCard
              video={featuredVideo}
              isLightMode={isLightMode}
              currentLang={currentLang}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export const HeroSection = (props: HeroSectionProps) => {
  const { featuredVideo } = useFeaturedVideo();
  const video = props.featuredVideo ?? featuredVideo;
  return <HeroSectionContent featuredVideo={video} />;
};
