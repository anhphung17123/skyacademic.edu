import { Book, Course, Language } from '@/types';
import { BackendLanguage, BookDto, CourseDto } from '@/types/api';
import { DEFAULT_VALUES } from '@/constants';

const DEFAULT_THUMBNAIL = DEFAULT_VALUES.THUMBNAIL;
const DEFAULT_BOOK_COVER = DEFAULT_VALUES.BOOK_COVER;

const mapBackendLanguageToUi = (language?: BackendLanguage): Language => {
  if (language === 'english') {
    return 'en';
  }
  if (language === 'vietnamese') {
    return 'vi';
  }
  return 'bilingual';
};

export const mapCourseDtoToCourse = (dto: CourseDto): Course => {
  const language = mapBackendLanguageToUi(dto.language);
  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    titleEn: dto.title_en,
    titleVi: dto.title_vi,
    description: dto.description,
    descriptionEn: dto.description_en,
    descriptionVi: dto.description_vi,
    summary: dto.summary,
    summaryEn: dto.summary_en,
    summaryVi: dto.summary_vi,
    price: dto.price,
    currency: dto.currency,
    duration: dto.duration ?? 'Self-paced',
    level: (dto.level as Course['level']) ?? 'beginner',
    language,
    thumbnail: dto.thumbnail_url ?? dto.cover_url ?? DEFAULT_THUMBNAIL,
    coverImage: dto.cover_url ?? dto.thumbnail_url ?? DEFAULT_THUMBNAIL,
    heroImage: dto.hero_url ?? dto.hero_background_url,
    category: dto.category,
    categoryVi: dto.category_vi,
    trailerUrl: dto.youtube_playlist_url,
    youtubePlaylistUrl: dto.youtube_playlist_url,
    supportEmail: dto.support_email,
    deliveryMode: dto.delivery_mode,
    type: dto.type,
    students: dto.students_count ?? 0,
    rating: dto.rating ?? 0,
    isPublished: dto.status === 'published',
    status: dto.status,
    createdAt: dto.created_at,
  };
};

export const mapBookDtoToBook = (dto: BookDto): Book => {
  const isDigitalType = dto.type === 'ebook' || dto.type === 'digital';
  const format: Book['format'] =
    dto.type === 'bundle' ? 'both' : isDigitalType ? 'digital' : 'physical';
  const deliveryType: Book['deliveryType'] =
    dto.delivery_type === 'hybrid' ? 'hybrid' : dto.delivery_type ?? 'shipping';
  // Map backend language to UI Language type for Book (en, vi, bilingual)
  const language: Language = mapBackendLanguageToUi(dto.language);
  // Map 'digital' type to 'ebook' for Book type
  const bookType: Book['type'] = dto.type === 'digital' ? 'ebook' : dto.type;
  return {
    id: dto.id,
    title: dto.title,
    titleEn: dto.title_en,
    titleVi: dto.title_vi,
    description: dto.description,
    descriptionEn: dto.description_en,
    descriptionVi: dto.description_vi,
    price: dto.price,
    currency: dto.currency,
    language,
    format,
    type: bookType,
    deliveryType,
    thumbnail: dto.cover_url ?? DEFAULT_BOOK_COVER,
    image: dto.cover_url,
    imageUrl: dto.cover_url,
    previewUrl: dto.preview_url,
    category: dto.category,
    categoryVi: dto.category_vi,
    stock: dto.stock_quantity,
    stockQuantity: dto.stock_quantity,
    rating: dto.rating ?? 0,
    downloadUrl: dto.download_url,
    createdAt: dto.created_at,
    author: dto.author,
    pages: dto.pages,
    publisher: dto.publisher,
    isbn: dto.isbn ?? undefined,
    publishedDate: dto.published_date,
    publishedDateVi: dto.published_date_vi,
  };
};