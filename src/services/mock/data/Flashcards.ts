import type { FlashcardProduct } from '@/types/product';
import actCoverImange from '@/images/flashcards/vietnamese-vocabulary-flashcards/activities/cover.png';
import placeCoverImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/places/cover.png';
import specialDaysCoverImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/special-days/cover.png';
import actCard1FrontImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/activities/cards/1-01.png';
import actCard1BackImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/activities/cards/1-02.png';
import actCard2FrontImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/activities/cards/2-01.png';
import actCard2BackImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/activities/cards/2-02.png';
import actCard3FrontImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/activities/cards/3-01.png';
import actCard3BackImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/activities/cards/3-02.png';
import placeCard1FrontImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/places/cards/1-01.png';
import placeCard1BackImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/places/cards/1-02.png';
import placeCard2FrontImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/places/cards/2-01.png';
import placeCard2BackImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/places/cards/2-02.png';
import placeCard3FrontImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/places/cards/3-01.png';
import placeCard3BackImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/places/cards/3-02.png';
import specialDaysCard1FrontImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/special-days/cards/1-01.png';
import specialDaysCard1BackImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/special-days/cards/1-02.png';
import specialDaysCard2FrontImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/special-days/cards/2-01.png';
import specialDaysCard2BackImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/special-days/cards/2-02.png';
import specialDaysCard3FrontImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/special-days/cards/3-01.png';
import specialDaysCard3BackImage from '@/images/flashcards/vietnamese-vocabulary-flashcards/special-days/cards/3-02.png';

export const mockFlashcardProduct: FlashcardProduct = {
  type: 'flashcard',
  id: 'flashcard-vietnamese-vocabulary',
  slug: 'vietnamese-vocabulary-flashcards',
  titleEn: 'Vietnamese Vocabulary Flashcards',
  titleVi: 'Thẻ học từ vựng tiếng Việt',
  subtitleEn: 'Designed for beginners and communication learners',
  subtitleVi: 'Thiết kế dành cho người mới bắt đầu và người học giao tiếp',
  descriptionEn:
    'Vietnamese vocabulary flashcards designed for beginners and communication learners. Includes physical cards and PDF cards, with FREE pronunciation & communication class.',
  descriptionVi:
    'Thẻ học từ vựng tiếng Việt được thiết kế dành cho người mới bắt đầu và người học giao tiếp. Bao gồm thẻ giấy và thẻ PDF, kèm lớp học phát âm & giao tiếp miễn phí.',
  topics: [
    {
      id: 'topic-activities',
      key: 'activities',
      nameEn: 'Activities',
      nameVi: 'Hoạt động',
      coverImage: actCoverImange,
      purposeEn: 'Help learners describe daily actions using common verbs. Activities focus on what people regularly do in Vietnam, allowing learners to quickly form useful sentences.',
      purposeVi: 'Giúp học viên mô tả hành động hằng ngày bằng động từ thông dụng. Chủ đề tập trung vào những việc người Việt thường làm, giúp học viên nhanh chóng đặt câu hữu ích.',
      contentEn:
        'Use basic present tense sentences. One clear action per card. Show people performing the action in a natural Vietnamese setting.',
      contentVi:
        'Dùng câu hiện tại đơn. Một hành động rõ ràng mỗi thẻ. Hình ảnh người thực hiện hành động trong bối cảnh Việt Nam tự nhiên.',
      examples: ['eating breakfast', 'studying', 'riding a motorbike', 'working at a café'],
      images: {
        'activities/1-01': actCard1FrontImage,
        'activities/1-02': actCard1BackImage,
        'activities/2-01': actCard2FrontImage,
        'activities/2-02': actCard2BackImage,
        'activities/3-01': actCard3FrontImage,
        'activities/3-02': actCard3BackImage,
      },
      cards: [
        { id: 'card-act-1', topic: 'activities', front: 'activities/1-01', back: 'activities/1-02' },
        { id: 'card-act-2', topic: 'activities', front: 'activities/2-01', back: 'activities/2-02' },
        { id: 'card-act-3', topic: 'activities', front: 'activities/3-01', back: 'activities/3-02' },
      ],
    },
    {
      id: 'topic-places',
      key: 'places',
      nameEn: 'Places',
      nameVi: 'Địa điểm',
      purposeEn: 'Teach learners how to identify locations and talk about where actions happen. This builds sentence patterns like "at / in / go to".',
      purposeVi: 'Dạy học viên nhận biết địa điểm và nói về nơi diễn ra hành động. Xây dựng cấu trúc như ở / đến / đi.',
      coverImage: placeCoverImage,
      contentEn:
        'Focus on common, recognizable places in Vietnam. Use simple location structures (ở, đến, đi). Avoid abstract or rare locations. Common locations in Vietnamese life.',
      contentVi:
        'Tập trung vào địa điểm quen thuộc ở Việt Nam. Dùng cấu trúc địa điểm đơn giản (ở, đến, đi). Tránh địa điểm trừu tượng hoặc hiếm gặp.',
      examples: ['market', 'school', 'park', 'restaurant'],
      images: {
        'places/1-01': placeCard1FrontImage,
        'places/1-02': placeCard1BackImage,
        'places/2-01': placeCard2FrontImage,
        'places/2-02': placeCard2BackImage,
        'places/3-01': placeCard3FrontImage,
        'places/3-02': placeCard3BackImage,
      },
      cards: [
        { id: 'card-pl-1', topic: 'places', front: 'places/1-01', back: 'places/1-02' },
        { id: 'card-pl-2', topic: 'places', front: 'places/2-01', back: 'places/2-02' },
        { id: 'card-pl-3', topic: 'places', front: 'places/3-01', back: 'places/3-02' },
      ],
    },
    {
      id: 'topic-special-days',
      key: 'special-days',
      nameEn: 'Special Days',
      nameVi: 'Ngày đặc biệt',
      purposeEn: 'Introduce cultural meaning and time-related vocabulary. This topic connects language learning with Vietnamese traditions and emotions.',
      purposeVi: 'Giới thiệu ý nghĩa văn hóa và từ vựng về thời gian. Chủ đề gắn việc học ngôn ngữ với truyền thống và cảm xúc Việt Nam.',
      coverImage: specialDaysCoverImage,
      contentEn:
        'Focus on celebrations and meaningful days. Keep sentences emotionally positive and simple. Images clearly show celebration or tradition. Important holidays, events, or meaningful days in Vietnam.',
      contentVi:
        'Tập trung vào ngày lễ và ngày có ý nghĩa. Câu đơn giản, tích cực. Hình ảnh thể hiện rõ lễ hội hoặc truyền thống.',
      examples: ['Tết (Lunar New Year)', 'birthday', 'Mid-Autumn Festival', 'wedding day'],
      images: {
        'special-days/1-01': specialDaysCard1FrontImage,
        'special-days/1-02': specialDaysCard1BackImage,
        'special-days/2-01': specialDaysCard2FrontImage,
        'special-days/2-02': specialDaysCard2BackImage,
        'special-days/3-01': specialDaysCard3FrontImage,
        'special-days/3-02': specialDaysCard3BackImage,
      },
      cards: [
        { id: 'card-sd-1', topic: 'special-days', front: 'special-days/1-01', back: 'special-days/1-02' },
        { id: 'card-sd-2', topic: 'special-days', front: 'special-days/2-01', back: 'special-days/2-02' },
        { id: 'card-sd-3', topic: 'special-days', front: 'special-days/3-01', back: 'special-days/3-02' },
      ],
    },
  ],
  packages: [
    {
      id: 'pkg-physical',
      key: 'physical',
      nameEn: 'Physical Flashcards',
      nameVi: 'Thẻ giấy',
      descriptionEn: 'High-quality printed cards. Domestic & international shipping.',
      descriptionVi: 'Thẻ in chất lượng cao. Giao hàng nội địa / quốc tế.',
      features: [
        'Front: Vietnamese + image + example',
        'Back: English + image + example',
        'Shipping: Domestic / International',
      ],
      ctaEn: 'Buy physical cards',
      ctaVi: 'Mua thẻ giấy',
      highlight: false,
    },
    {
      id: 'pkg-pdf',
      key: 'pdf',
      nameEn: 'Digital PDF Flashcards',
      nameVi: 'Thẻ PDF',
      descriptionEn: 'Download PDF right after payment. Use on phone, tablet, or computer. Printable.',
      descriptionVi: 'Tải PDF ngay sau thanh toán. Dùng trên điện thoại / tablet / máy tính. Có thể in ra.',
      features: [
        'Instant download after payment',
        'Use on: Phone / Tablet / Computer',
        'Printable',
      ],
      ctaEn: 'Buy PDF cards',
      ctaVi: 'Mua thẻ PDF',
      highlight: false,
    },
    {
      id: 'pkg-combo',
      key: 'combo',
      nameEn: 'Combo (Best value)',
      nameVi: 'Combo (Khuyến khích)',
      descriptionEn: 'Physical cards + PDF file + Free class access.',
      descriptionVi: 'Thẻ giấy + File PDF + Quyền tham gia lớp học miễn phí.',
      features: [
        'Physical flashcards',
        'PDF file',
        'Free class access',
      ],
      ctaEn: 'Buy Combo (Save)',
      ctaVi: 'Mua Combo (Tiết kiệm)',
      highlight: true,
    },
  ],
  bonusClass: {
    titleEn: 'FREE bonus: Pronunciation & Communication class',
    titleVi: 'HỌC MIỄN PHÍ KÈM THEO',
    duration: '7 sessions / 1 week',
    format: 'Offline',
    items: [
      'Standard pronunciation',
      'Basic communication',
      'Speaking practice with teacher',
    ],
    itemsVi: [      
      'Phát âm chuẩn',
      'Giao tiếp cơ bản',
      'Luyện nói với giáo viên',
    ],
    noExtraFee: 'No extra fee',
    noExtraFeeVi: 'Không tính phí thêm',
  },
  targetAudience: [
    'Foreigners learning Vietnamese',
    'Beginners',
    'Those who want to improve pronunciation & communication',
    'Offline learners in the area',
  ],
  targetAudienceVi: [
    'Người nước ngoài học tiếng Việt',
    'Người mới bắt đầu',
    'Người muốn cải thiện phát âm & giao tiếp',
    'Người học trực tiếp',
  ],
};
