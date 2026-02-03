import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { HorizontalScroll } from '@/components/common/HorizontalScroll';
import type { FlashcardTopic } from '@/types';
import { clsx } from 'clsx';

interface FlashcardTopicsProps {
  topics: FlashcardTopic[];
}

/** Learning topics as visual cards: image + name + short description. Ảnh lấy từ topic.coverImage. */
export const FlashcardTopics = memo(({ topics }: FlashcardTopicsProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeTopicKey, setActiveTopicKey] = useState<string>(topics[0]?.key ?? '');

  const activeTopic = topics.find((topic) => topic.key === activeTopicKey) ?? topics[0];
  if (!topics.length) return null;

  const purpose = activeTopic
    ? lang === 'vi'
      ? activeTopic.purposeVi
      : activeTopic.purposeEn
    : '';

  const renderTopicCard = (topic: FlashcardTopic, scrollable: boolean) => {
    const name = lang === 'vi' ? topic.nameVi : topic.nameEn;
    const shortPurpose = lang === 'vi' ? topic.purposeVi : topic.purposeEn;
    const thumbnail = topic.coverImage ?? undefined;
    const isActive = activeTopicKey === topic.key;
    return (
      <button
        key={topic.id}
        type="button"
        onClick={() => setActiveTopicKey(topic.key)}
        className={clsx(
          'text-left rounded-2xl border-2 overflow-hidden transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
          scrollable && 'w-[min(100%,320px)] min-w-[280px] flex-shrink-0',
          isActive
            ? 'border-violet-500 dark:border-violet-400 shadow-lg shadow-violet-200/40 dark:shadow-violet-900/30 bg-violet-50/50 dark:bg-violet-900/20'
            : 'border-gray-200 dark:border-gray-600 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-md bg-white dark:bg-gray-800'
        )}
      >
        <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-4xl">
              📚
            </div>
          )}
          <div
            className={clsx(
              'absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 to-transparent',
              isActive && 'from-violet-900/80'
            )}
          >
            <span
              className={clsx(
                'text-lg font-bold text-white drop-shadow',
                isActive && 'underline underline-offset-2 decoration-2'
              )}
            >
              {name}
            </span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {shortPurpose}
          </p>
          {topic.examples?.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {lang === 'vi' ? 'Ví dụ: ' : 'E.g. '}
              {topic.examples.slice(0, 3).join(', ')}
            </p>
          )}
        </div>
      </button>
    );
  };

  return (
    <Section padding="lg" background="default">
      <Container>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('flashcard.learningTopics')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          {t('flashcard.learningTopicsDesc')}
        </p>

        {/* One row: horizontal scroll when not enough space, grid 3 cols on large */}
        <div className="mb-10 lg:hidden">
          <HorizontalScroll showControls={true} scrollStep={320}>
            {topics.map((topic) => renderTopicCard(topic, true))}
          </HorizontalScroll>
        </div>
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-10">
          {topics.map((topic) => renderTopicCard(topic, false))}
        </div>

        {/* Selected topic: full purpose + example cards */}
        {activeTopic && (
          <>
            <p className="text-gray-700 dark:text-gray-200 mb-6 pl-4 border-l-4 border-violet-500 dark:border-violet-400">
              {purpose}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeTopic.cards.slice(0, 4).map((card) => (
                <div
                  key={card.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 relative">
                    {(activeTopic.images[card.front] != null) && (
                      <img
                        src={activeTopic.images[card.front]}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
    </Section>
  );
});

FlashcardTopics.displayName = 'FlashcardTopics';
