import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/utils/currency';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Book,
  Share2,
  Sparkles,
  Star,
  FileText,
  Globe,
  Shield,
  Check,
} from 'lucide-react';
import { bookApi } from '@/services/api/book-service';
import { Book as BookType } from '@/types';
import { Loading } from '@/components/common/Loading';
import { PaymentInfo } from '@/components/payment/PaymentInfo';
import { PreviewGalleryModal } from '@/components/book/PreviewGalleryModal';
import { ContactInfo } from '@/components/common/ContactInfo';

// Import preview images for Wishes Under the Winter Sky
import preview1 from '@/images/preview-Wishes-Under-the-Winter-Sky/1.png';
import preview2 from '@/images/preview-Wishes-Under-the-Winter-Sky/2.png';
import preview3 from '@/images/preview-Wishes-Under-the-Winter-Sky/3.png';
import preview4 from '@/images/preview-Wishes-Under-the-Winter-Sky/4.png';
import preview5 from '@/images/preview-Wishes-Under-the-Winter-Sky/5.png';
import preview6 from '@/images/preview-Wishes-Under-the-Winter-Sky/6.png';
import preview7 from '@/images/preview-Wishes-Under-the-Winter-Sky/7.png';
import preview8 from '@/images/preview-Wishes-Under-the-Winter-Sky/8.png';
import preview9 from '@/images/preview-Wishes-Under-the-Winter-Sky/9.png';
import preview10 from '@/images/preview-Wishes-Under-the-Winter-Sky/10.png';

const previewImages: Record<number, string> = {
  1: preview1,
  2: preview2,
  3: preview3,
  4: preview4,
  5: preview5,
  6: preview6,
  7: preview7,
  8: preview8,
  9: preview9,
  10: preview10,
};

interface TableOfContentsItem {
  type: 'title' | 'chapter' | 'section';
  text: string;
  chapterNumber?: number;
}

const WISHES_BOOK_TABLE_OF_CONTENTS: TableOfContentsItem[] = [
  { type: 'title', text: 'Title Page' },
  { type: 'title', text: 'Dedication' },
  { type: 'title', text: 'Table of Contents' },
  { type: 'chapter', text: 'Chapter 1 — The First Snowflake', chapterNumber: 1 },
  { type: 'section', text: 'Snow Over the Meadow' },
  { type: 'section', text: "Grandma's Old Scarf" },
  { type: 'section', text: 'Soup on a Winter Morning' },
  { type: 'section', text: 'Footprints in the White Rice Field' },
  { type: 'section', text: 'Little Wish Lantern' },
  { type: 'section', text: 'The Window of Warm Light' },
  { type: 'chapter', text: 'Chapter 2 — Preparing for Christmas', chapterNumber: 2 },
  { type: 'section', text: 'Paper Stars' },
  { type: 'section', text: 'The Red Sweater' },
  { type: 'section', text: 'Sweeping the Yard' },
  { type: 'section', text: 'The Cookie Tray' },
  { type: 'section', text: 'Wrapping Gifts' },
  { type: 'section', text: 'The Christmas List' },
  { type: 'chapter', text: 'Chapter 3 — The Night Before Christmas', chapterNumber: 3 },
  { type: 'section', text: 'Lantern on the Porch' },
  { type: 'section', text: 'The Quiet Street' },
  { type: 'section', text: "The Crickets' Choir" },
  { type: 'section', text: "Grandma's Whisper" },
  { type: 'section', text: 'Midnight Rice Cooker' },
  { type: 'section', text: 'Waiting for Morning' },
  { type: 'chapter', text: 'Chapter 4 — Christmas Morning', chapterNumber: 4 },
  { type: 'section', text: 'Morning Footsteps' },
  { type: 'section', text: 'The Rice Porridge Pot' },
  { type: 'section', text: 'The Gift Beside the Pillow' },
  { type: 'section', text: 'Laughter Down the Hallway' },
  { type: 'section', text: 'The Bicycle Bell Outside' },
  { type: 'section', text: 'The Christmas Table' },
  { type: 'chapter', text: 'Chapter 5 — The Gifts We Give', chapterNumber: 5 },
  { type: 'section', text: 'Gift of the Tangerine' },
  { type: 'section', text: 'The Little Red Envelope' },
  { type: 'section', text: 'A Scarf for the Neighbor' },
  { type: 'section', text: 'Bread for the Road' },
  { type: 'section', text: 'The Song We Gave' },
  { type: 'section', text: 'Hands That Help' },
  { type: 'chapter', text: 'Chapter 6 — Winter Adventures', chapterNumber: 6 },
  { type: 'section', text: 'Snowball Lesson' },
  { type: 'section', text: 'Mist on the River' },
  { type: 'section', text: 'The Bicycle Race' },
  { type: 'section', text: 'The Roof-Top Fort' },
  { type: 'section', text: 'The Hidden Orchard' },
  { type: 'section', text: 'The Night Walk Home' },
  { type: 'chapter', text: 'Chapter 7 — Family and Firelight', chapterNumber: 7 },
  { type: 'section', text: "Grandma's Story of the Tide" },
  { type: 'section', text: 'The Mending Table' },
  { type: 'section', text: 'Warm Rice, Warm Hands' },
  { type: 'section', text: 'The Lantern in the Window' },
  { type: 'section', text: 'Old Photographs' },
  { type: 'section', text: 'The Quiet Chorus' },
  { type: 'chapter', text: 'Chapter 8 — Winter in the Countryside', chapterNumber: 8 },
  { type: 'section', text: 'Buffalo Breath' },
  { type: 'section', text: 'The Morning Market' },
  { type: 'section', text: 'The Pagoda Bell' },
  { type: 'section', text: 'Bamboo Shadows' },
  { type: 'section', text: 'The Sugarcane Gift' },
  { type: 'section', text: 'Fog Over the River' },
  { type: 'chapter', text: 'Chapter 9 — Wishes and Dreams', chapterNumber: 9 },
  { type: 'section', text: 'The Letter to the Sky' },
  { type: 'section', text: 'Lanterns Over the Water' },
  { type: 'section', text: 'A Wish for Grandma' },
  { type: 'section', text: 'Dreams in the Rice Field' },
  { type: 'section', text: 'The Secret Pocket' },
  { type: 'section', text: 'The Promise of the Sky' },
  { type: 'chapter', text: 'Chapter 10 — Under the Winter Sky', chapterNumber: 10 },
  { type: 'section', text: 'The Bicycle by the Gate' },
  { type: 'section', text: 'Thank-You to the Land' },
  { type: 'section', text: "A Child's Quiet Prayer" },
  { type: 'section', text: 'Memories Like Lanterns' },
  { type: 'section', text: 'The Road That Bends Back Home' },
  { type: 'section', text: 'Last Light' },
  { type: 'title', text: 'Acknowledgments' },
  { type: 'title', text: 'About the Author (Ms. Song)' },
];

export const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [book, setBook] = useState<BookType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [previewStartIndex, setPreviewStartIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const fetchBook = async () => {
      try {
        setIsLoading(true);
        const data = await bookApi.getBook(id);
        if (isMounted) {
          setBook(data);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setBook(null);
          setError('Book could not be loaded from the server.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchBook();

    return () => {
      isMounted = false;
    };
  }, [id]);


  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (!book) return <Navigate to="/books" />;

  const tabs = [
    { id: 'description', label: t('bookDetail.tabDescription') },
    { id: 'details', label: t('bookDetail.tabDetails') },
    { id: 'reviews', label: t('bookDetail.tabReviews') },
  ];

  const features = [
    { icon: Shield, text: t('bookDetail.guarantee') },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-400/20 rounded-full blur-2xl animate-float" />
        </div>

        <div className="container-custom py-8 relative z-10">
          {/* Breadcrumb */}
          <Link
            to="/books"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">
              {t('common.backToBooks')}
            </span>
          </Link>

          {/* Book Header */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Book Cover */}
            <div className="relative w-full lg:w-80 flex-shrink-0 group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30 bg-white">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-auto aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Format Badge */}
                {book.format && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 text-orange-600 text-xs font-bold shadow-lg flex items-center gap-1.5">
                  <Book className="w-3.5 h-3.5" />
                    {book.format === 'physical' ? t('bookDetail.format') : 
                     book.format === 'digital' ? t('bookDetail.formatDigital') :
                     t('bookDetail.format')}
                </div>
                )}
              </div>
              {/* Preview Button */}
              <button className="absolute w-max -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-white text-orange-600 font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t('bookDetail.preview')}
              </button>
            </div>

            {/* Book Info */}
            <div className="flex-1 text-white pt-4 lg:pt-0">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-200 text-xs font-medium border border-yellow-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('bookDetail.bestseller')}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium border border-white/20">
                  {t('bookDetail.newEdition')}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">{book.title}</h1>

              {/* Author */}
              <p className="text-white/80 text-lg mb-4">
                {t('books.by')}{' '}
                <span className="font-semibold text-white">{book.author}</span>
              </p>

              {/* Rating */}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  {formatPrice(book.price, book.currency || 'USD')}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                {book.language && (
                <div className="flex items-center gap-2 text-white/80">
                  <Globe className="w-4 h-4" />
                    <span>
                      {book.language === 'en' ? t('bookDetail.languageEn') :
                       book.language === 'vi' ? t('bookDetail.languageVi') :
                       book.language === 'bilingual' ? t('bookDetail.languageBilingual') :
                       t('bookDetail.languageEn')}
                    </span>
                </div>
                )}
                {book.pages && book.pages > 0 && (
                <div className="flex items-center gap-2 text-white/80">
                  <FileText className="w-4 h-4" />
                    <span>{book.pages} {t('bookDetail.pages')}</span>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24">
            <path
              fill="currentColor"
              className="text-gray-50 dark:text-gray-900"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="flex border-b border-gray-100 dark:border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'description' | 'details' | 'reviews')}
                    className={`flex-1 px-6 py-4 font-medium transition-all ${
                      activeTab === tab.id
                        ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400 bg-orange-50/50 dark:bg-orange-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {currentLang === 'vi' && book.descriptionVi ? book.descriptionVi : 
                       currentLang === 'en' && book.descriptionEn ? book.descriptionEn : 
                       book.description}
                    </p>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="space-y-4">
                    {[
                      book.isbn && { label: t('bookDetail.isbn'), value: book.isbn },
                      book.publisher && { label: t('bookDetail.publisher'), value: book.publisher },
                      book.language && { 
                        label: t('bookDetail.language'), 
                        value: book.language === 'en' ? t('bookDetail.languageEn') :
                               book.language === 'vi' ? t('bookDetail.languageVi') :
                               book.language === 'bilingual' ? t('bookDetail.languageBilingual') :
                               t('bookDetail.languageEn')
                      },
                      book.pages && book.pages > 0 && { label: t('bookDetail.pages'), value: book.pages.toString() },
                      book.format && { 
                        label: t('bookDetail.format'), 
                        value: book.format === 'physical' ? t('bookDetail.format') :
                               book.format === 'digital' ? t('bookDetail.formatDigital') :
                               t('bookDetail.formatBoth')
                      },
                      book.publishedDate && { label: t('bookDetail.publishDate'), value: book.publishedDate },
                    ].filter((item): item is { label: string; value: string } => Boolean(item)).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                      >
                        <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {/* No reviews yet */}
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                        <Star className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                        {t('bookDetail.noReviews')}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {t('bookDetail.beFirstReview')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('bookDetail.tableOfContents')}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                  {book.id === 'book-1' || book.title === 'Wishes Under the Winter Sky' ? (
                    WISHES_BOOK_TABLE_OF_CONTENTS.map((item, idx) => {
                      if (item.type === 'title') {
                        return (
                          <div
                            key={idx}
                            className="py-2 px-3 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide"
                          >
                            {item.text}
                          </div>
                        );
                      }
                      if (item.type === 'chapter') {
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-3 py-2 px-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 mt-3 first:mt-0"
                          >
                            <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                              {item.chapterNumber}
                            </span>
                            <span className="font-bold text-gray-900 dark:text-white">
                              {item.text}
                            </span>
                          </div>
                        );
                      }
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 py-1.5 px-3 pl-12 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {item.text}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      {t('bookDetail.noTableOfContents')}
                      </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sample Pages Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                      <Book className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {t('bookDetail.samplePages')}
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                    {t('bookDetail.freeSample')}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {(book.id === 'book-1' || book.title === 'Wishes Under the Winter Sky'
                    ? [1, 2, 3]
                    : [1, 2, 3]
                  ).map((page) => {
                    const imageSrc =
                      book.id === 'book-1' || book.title === 'Wishes Under the Winter Sky'
                        ? previewImages[page] || `https://images.unsplash.com/photo-154499795${page}0-fa07a98d237f?w=300&h=400&fit=crop`
                        : `https://images.unsplash.com/photo-154499795${page}0-fa07a98d237f?w=300&h=400&fit=crop`;
                    
                    return (
                      <div
                        key={page}
                        onClick={() => {
                          setPreviewStartIndex(page - 1);
                          setIsPreviewModalOpen(true);
                        }}
                        className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                      >
                        <img
                          src={imageSrc}
                          alt={`Sample page ${page}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="px-2 py-1 bg-white/90 rounded-md text-xs font-medium text-gray-900">
                            Page {page}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {book.id === 'book-1' || book.title === 'Wishes Under the Winter Sky' ? (
                  <button
                    onClick={() => {
                      setPreviewStartIndex(0);
                      setIsPreviewModalOpen(true);
                    }}
                    className="w-full mt-4 py-3 rounded-xl font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FileText className="w-5 h-5" />
                    {t('bookDetail.viewMorePages')}
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right Column - Purchase */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-24">
              {/* Purchase Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6">
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(book.price, book.currency || 'USD')}
                    </span>
                  </div>

                  {/* Share */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={async () => {
                        const url = window.location.href;
                        try {
                          await navigator.clipboard.writeText(url);
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                        } catch (err) {
                          // Fallback for older browsers
                          const textArea = document.createElement('textarea');
                          textArea.value = url;
                          document.body.appendChild(textArea);
                          textArea.select();
                          document.execCommand('copy');
                          document.body.removeChild(textArea);
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                        }
                      }}
                      className="w-full py-3 rounded-xl font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2 transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                      {t('bookDetail.share')}
                    </button>
                  </div>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 space-y-3">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <feature.icon className="w-5 h-5 text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Info Card */}
              {book.price > 0 ? (
                <div className="mt-6">
                  <PaymentInfo showQrCode={true} showContactInfo={true} />
                </div>
              ) : (
                <div className="mt-6">
                  <ContactInfo variant="compact" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="container-custom pb-12">
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
            {error}
          </div>
        </div>
      )}

      {/* Preview Gallery Modal */}
      {(book.id === 'book-1' || book.title === 'Wishes Under the Winter Sky') && (
        <PreviewGalleryModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          images={[preview1, preview2, preview3, preview4, preview5, preview6, preview7, preview8, preview9, preview10]}
          startIndex={previewStartIndex}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[280px]">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">
              {t('common.linkCopied')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
