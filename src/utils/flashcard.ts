import type { FlashcardProduct, FlashcardTopic } from '@/types';

/** URL ảnh đại diện topic = cover của topic (topic.coverImage). */
export function getTopicCoverUrl(topic: FlashcardTopic): string | undefined {
  return topic.coverImage ? String(topic.coverImage) : undefined;
}

/** Ảnh flashcard = cover mỗi topic. Trả về danh sách URL (từ topic.coverImage). */
export function getTopicCoverUrls(product: FlashcardProduct): string[] {
  return product.topics
    .map((t) => getTopicCoverUrl(t))
    .filter((url): url is string => url != null && url !== '');
}
