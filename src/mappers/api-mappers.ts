import { Book, Course, Language, TableOfContentsItem, FreeVideo, Classroom } from '@/types';
import type { ClassroomStatus } from '@/types/classroom';
import { BackendLanguage, BookDto, CourseDto, FreeVideoDto, ClassroomDto, ClassroomStatusDto } from '@/types/api';
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
    category: dto.category,
    categoryVi: dto.category_vi,
    youtubePlaylistUrl: dto.youtube_playlist_url,
    supportEmail: dto.support_email,
    deliveryMode: dto.delivery_mode,
    type: dto.type,
    students: dto.students_count ?? 0,
    rating: dto.rating ?? 0,
    isPublished: dto.status === 'published',
    status: dto.status,
    createdAt: dto.created_at,
    levelsLabel: dto.levels_label,
  };
};

export { mapBackendLanguageToUi };

export const mapBookDtoToBook = (dto: BookDto, tableOfContents: TableOfContentsItem[]): Book => {
  const isDigitalType = dto.type === 'ebook' || dto.type === 'digital';
  const format: Book['format'] =
    dto.type === 'bundle' ? 'both' : isDigitalType ? 'digital' : 'physical';
  const language: Language = mapBackendLanguageToUi(dto.language);
  const bookType: Book['type'] = dto.type === 'digital' ? 'ebook' : dto.type;
  const slug =
    dto.slug ??
    (dto.title ?? '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  const coverBySlug = slug && dto.cover_images?.[slug]?.[0];
  const coverFirst = dto.cover_images && Object.values(dto.cover_images)[0]?.[0];
  const coverUrl = coverBySlug ?? coverFirst ?? DEFAULT_BOOK_COVER;
  return {
    id: dto.id,
    slug,
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
    thumbnail: coverUrl,
    previewImages: dto.preview_images ?? {},
    category: dto.category,
    categoryVi: dto.category_vi,
    stock: dto.stock_quantity,
    rating: dto.rating ?? 0,
    createdAt: dto.created_at,
    author: dto.author,
    pages: dto.pages,
    publisher: dto.publisher,
    isbn: dto.isbn ?? undefined,
    publishedDate: dto.published_date,
    publishedDateVi: dto.published_date_vi,
    tableOfContents,
  };
};

const mapClassroomStatusToUi = (status: ClassroomStatusDto): ClassroomStatus => {
  switch (status) {
    case 'draft':
    case 'archived':
      return 'cancelled';
    default:
      return status;
  }
};

export const mapFreeVideoDtoToFreeVideo = (dto: FreeVideoDto): FreeVideo => ({
  id: dto.id,
  title: dto.title,
  titleVi: dto.title_vi,
  titleEn: dto.title_en,
  youtubeUrl: dto.youtube_url,
  category: dto.category,
  categoryVi: dto.category_vi,
  description: dto.description,
  descriptionVi: dto.description_vi,
  descriptionEn: dto.description_en,
  courseId: dto.course_id,
  duration: dto.duration,
  createdAt: dto.created_at,
});

export const mapClassroomDtoToClassroom = (dto: ClassroomDto): Classroom => ({
  id: dto.id,
  courseId: dto.course_id,
  code: dto.code,
  title: dto.title,
  description: dto.description,
  status: mapClassroomStatusToUi(dto.status),
  language: dto.language ? mapBackendLanguageToUi(dto.language) : undefined,
  timezone: dto.timezone,
  startDate: dto.start_date,
  endDate: dto.end_date,
  createdAt: dto.created_at,
});