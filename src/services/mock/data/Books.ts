import { daysAgo } from '../utils/date-helpers';
import { BookDto } from '@/types/api';
import bookCoverImage from '@/images/book-Wishes-Under-the-Winter-Sky.png';

export const mockBooks: BookDto[] = [
  {
    id: "book-1",
    slug: "wishes-under-the-winter-sky",
    title: "Wishes Under the Winter Sky",
    title_vi: "Wishes Under the Winter Sky",
    title_en: "Wishes Under the Winter Sky",
    description:
      "A poetic, illustrated Christmas book written and illustrated by Phung Thi Xuan. Warm, magical stories for children and families. Pay-What-You-Wish pricing (25.000 VND – 125.000 VND+).",
    description_vi:
      "Cuốn sách thơ minh họa Giáng sinh được viết và minh họa bởi Phung Thi Xuan. Những câu chuyện ấm áp, kỳ diệu cho trẻ em và gia đình. Giá trả theo mong muốn (25.000 VND – 125.000 VND+).",
    description_en:
      "A poetic, illustrated Christmas book written and illustrated by Phung Thi Xuan. Warm, magical stories for children and families.",
    cover_url: bookCoverImage,
    preview_url: undefined,
    price: 25000,
    currency: "VND",
    category: "Poetry",
    category_vi: "Thơ",
    language: "english",
    type: "ebook",
    rating: 4.5,
    delivery_type: undefined,
    stock_quantity: 999,
    author: "Phung Thi Xuan",
    pages: 69,
    publisher: "SkyAcademy",
    published_date: "December 2025",
    published_date_vi: "Tháng 12, 2025",
    created_at: daysAgo(100),
  },
];
