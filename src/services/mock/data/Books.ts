import { getDateDaysAgo as daysAgo } from '../utils/date-helpers';
import { BookDto } from '@/types/api';
import bookCoverImage from '@/images/books/wishes-under-the-winter-sky/cover.png';
import preview1 from '@/images/books/wishes-under-the-winter-sky/preview/1.png';
import preview2 from '@/images/books/wishes-under-the-winter-sky/preview/2.png';
import preview3 from '@/images/books/wishes-under-the-winter-sky/preview/3.png';
import preview4 from '@/images/books/wishes-under-the-winter-sky/preview/4.png';
import preview5 from '@/images/books/wishes-under-the-winter-sky/preview/5.png';
import preview6 from '@/images/books/wishes-under-the-winter-sky/preview/6.png';
import preview7 from '@/images/books/wishes-under-the-winter-sky/preview/7.png';
import preview8 from '@/images/books/wishes-under-the-winter-sky/preview/8.png';
import preview9 from '@/images/books/wishes-under-the-winter-sky/preview/9.png';
import preview10 from '@/images/books/wishes-under-the-winter-sky/preview/10.png';

const WISHES_SLUG = ["wishes-under-the-winter-sky"];

/** Book cover: slug -> cover URL(s). Only place where book cover images are defined for mock. */
const BOOK_COVERS: Record<string, string[]> = {
  [WISHES_SLUG[0]]: [bookCoverImage],
};

/** Book preview pages: slug -> ordered image URLs. Only place where book preview images are defined. */
const BOOK_PREVIEW_IMAGES: Record<string, string[]> = {
  [WISHES_SLUG[0]]: [
    preview1, preview2, preview3, preview4, preview5,
    preview6, preview7, preview8, preview9, preview10,
  ],
};

function coverImagesForSlug(slug: string): Record<string, string[]> {
  const urls = BOOK_COVERS[slug];
  return urls ? { [slug]: urls } : {};
}

function previewImagesForSlug(slug: string): Record<string, string[]> {
  const urls = BOOK_PREVIEW_IMAGES[slug];
  return urls ? { [slug]: urls } : {};
}

/** Preview image URLs for a book by slug (e.g. for fallback when book from API has none). */
export function getBookPreviewImages(slug: string): string[] {
  return BOOK_PREVIEW_IMAGES[slug] ?? [];
}

export const mockBooks: BookDto[] = [
  {
    id: "book-1",
    slug: WISHES_SLUG[0],
    title: "Wishes Under the Winter Sky",
    title_vi: "Wishes Under the Winter Sky",
    title_en: "Wishes Under the Winter Sky",
    description:
      "A poetic, illustrated Christmas book written and illustrated by Phung Thi Xuan. Warm, magical stories for children and families. Pay-What-You-Wish pricing (25.000 VND – 125.000 VND+).",
    description_vi:
      "Cuốn sách thơ minh họa Giáng sinh được viết và minh họa bởi Phung Thi Xuan. Những câu chuyện ấm áp, kỳ diệu cho trẻ em và gia đình. Giá trả theo mong muốn (25.000 VND – 125.000 VND+).",
    description_en:
      "A poetic, illustrated Christmas book written and illustrated by Phung Thi Xuan. Warm, magical stories for children and families.",
    cover_images: coverImagesForSlug(WISHES_SLUG[0]),
    preview_images: previewImagesForSlug(WISHES_SLUG[0]),
    price: 25000,
    currency: "VND",
    category: "Poetry",
    category_vi: "Thơ",
    language: "english",
    type: "ebook",
    rating: 4.5,
    stock_quantity: 999,
    author: "Phung Thi Xuan",
    pages: 69,
    publisher: "SkyAcademy",
    published_date: "December 2025",
    published_date_vi: "Tháng 12, 2025",
    created_at: daysAgo(100),
  },
];
