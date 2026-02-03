/**
 * Mock Flashcard product data
 * Image paths: /assets/images/flashcards/{topic}/{filename}.jpg
 * Add real images under public/assets/images/flashcards/activities|places|special-days/
 */

import type { FlashcardProduct } from '@/types/product';

const BASE_IMG = '/assets/images/flashcards';

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
  heroImage: `${BASE_IMG}/hero-mockup.jpg`,
  topics: [
    {
      id: 'topic-activities',
      key: 'activities',
      nameEn: 'Activities',
      nameVi: 'Hoạt động',
      purposeEn: 'Help learners describe daily actions using common verbs. Activities focus on what people regularly do in Vietnam, allowing learners to quickly form useful sentences.',
      purposeVi: 'Giúp học viên mô tả hành động hằng ngày bằng động từ thông dụng. Chủ đề tập trung vào những việc người Việt thường làm, giúp học viên nhanh chóng đặt câu hữu ích.',
      contentEn:
        'Use basic present tense sentences. One clear action per card. Show people performing the action in a natural Vietnamese setting.',
      contentVi:
        'Dùng câu hiện tại đơn. Một hành động rõ ràng mỗi thẻ. Hình ảnh người thực hiện hành động trong bối cảnh Việt Nam tự nhiên.',
      examples: ['eating breakfast', 'studying', 'riding a motorbike', 'working at a café'],
      cards: [
        {
          id: 'card-act-1',
          topic: 'activities',
          front: {
            language: 'en',
            sentence: 'I … breakfast at home.',
            image: `${BASE_IMG}/activities/breakfast.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Tôi ăn bữa sáng ở nhà.',
            image: `${BASE_IMG}/activities/breakfast.jpg`,
          },
        },
        {
          id: 'card-act-2',
          topic: 'activities',
          front: {
            language: 'en',
            sentence: 'She is … at the library.',
            image: `${BASE_IMG}/activities/studying.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Cô ấy đang học ở thư viện.',
            image: `${BASE_IMG}/activities/studying.jpg`,
          },
        },
        {
          id: 'card-act-3',
          topic: 'activities',
          front: {
            language: 'en',
            sentence: 'He is … a motorbike.',
            image: `${BASE_IMG}/activities/motorbike.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Anh ấy đi xe máy.',
            image: `${BASE_IMG}/activities/motorbike.jpg`,
          },
        },
        {
          id: 'card-act-4',
          topic: 'activities',
          front: {
            language: 'en',
            sentence: 'They are … at a café.',
            image: `${BASE_IMG}/activities/cafe.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Họ đang làm việc ở quán cà phê.',
            image: `${BASE_IMG}/activities/cafe.jpg`,
          },
        },
      ],
    },
    {
      id: 'topic-places',
      key: 'places',
      nameEn: 'Places',
      nameVi: 'Địa điểm',
      purposeEn: 'Teach learners how to identify locations and talk about where actions happen. This builds sentence patterns like "at / in / go to".',
      purposeVi: 'Dạy học viên nhận biết địa điểm và nói về nơi diễn ra hành động. Xây dựng cấu trúc như ở / đến / đi.',
      contentEn:
        'Focus on common, recognizable places in Vietnam. Use simple location structures (ở, đến, đi). Avoid abstract or rare locations. Common locations in Vietnamese life.',
      contentVi:
        'Tập trung vào địa điểm quen thuộc ở Việt Nam. Dùng cấu trúc địa điểm đơn giản (ở, đến, đi). Tránh địa điểm trừu tượng hoặc hiếm gặp.',
      examples: ['market', 'school', 'park', 'restaurant'],
      cards: [
        {
          id: 'card-pl-1',
          topic: 'places',
          front: {
            language: 'en',
            sentence: 'She is at the …',
            image: `${BASE_IMG}/places/market.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Cô ấy ở chợ.',
            image: `${BASE_IMG}/places/market.jpg`,
          },
        },
        {
          id: 'card-pl-2',
          topic: 'places',
          front: {
            language: 'en',
            sentence: 'The children go to … every day.',
            image: `${BASE_IMG}/places/school.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Bọn trẻ đi học mỗi ngày.',
            image: `${BASE_IMG}/places/school.jpg`,
          },
        },
        {
          id: 'card-pl-3',
          topic: 'places',
          front: {
            language: 'en',
            sentence: 'We walk in the … in the morning.',
            image: `${BASE_IMG}/places/park.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Chúng tôi đi bộ trong công viên vào buổi sáng.',
            image: `${BASE_IMG}/places/park.jpg`,
          },
        },
        {
          id: 'card-pl-4',
          topic: 'places',
          front: {
            language: 'en',
            sentence: 'They are eating at a …',
            image: `${BASE_IMG}/places/restaurant.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Họ đang ăn ở nhà hàng.',
            image: `${BASE_IMG}/places/restaurant.jpg`,
          },
        },
      ],
    },
    {
      id: 'topic-special-days',
      key: 'special-days',
      nameEn: 'Special Days',
      nameVi: 'Ngày đặc biệt',
      purposeEn: 'Introduce cultural meaning and time-related vocabulary. This topic connects language learning with Vietnamese traditions and emotions.',
      purposeVi: 'Giới thiệu ý nghĩa văn hóa và từ vựng về thời gian. Chủ đề gắn việc học ngôn ngữ với truyền thống và cảm xúc Việt Nam.',
      contentEn:
        'Focus on celebrations and meaningful days. Keep sentences emotionally positive and simple. Images clearly show celebration or tradition. Important holidays, events, or meaningful days in Vietnam.',
      contentVi:
        'Tập trung vào ngày lễ và ngày có ý nghĩa. Câu đơn giản, tích cực. Hình ảnh thể hiện rõ lễ hội hoặc truyền thống.',
      examples: ['Tết (Lunar New Year)', 'birthday', 'Mid-Autumn Festival', 'wedding day'],
      cards: [
        {
          id: 'card-sd-1',
          topic: 'special-days',
          front: {
            language: 'en',
            sentence: 'We celebrate … with family.',
            image: `${BASE_IMG}/special-days/tet.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Chúng tôi ăn mừng Tết cùng gia đình.',
            image: `${BASE_IMG}/special-days/tet.jpg`,
          },
        },
        {
          id: 'card-sd-2',
          topic: 'special-days',
          front: {
            language: 'en',
            sentence: 'Today is my …',
            image: `${BASE_IMG}/special-days/birthday.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Hôm nay là sinh nhật tôi.',
            image: `${BASE_IMG}/special-days/birthday.jpg`,
          },
        },
        {
          id: 'card-sd-3',
          topic: 'special-days',
          front: {
            language: 'en',
            sentence: 'Children carry lanterns at …',
            image: `${BASE_IMG}/special-days/mid-autumn.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Trẻ em rước đèn vào Tết Trung Thu.',
            image: `${BASE_IMG}/special-days/mid-autumn.jpg`,
          },
        },
        {
          id: 'card-sd-4',
          topic: 'special-days',
          front: {
            language: 'en',
            sentence: 'They are celebrating their …',
            image: `${BASE_IMG}/special-days/wedding.jpg`,
          },
          back: {
            language: 'vi',
            sentence: 'Họ đang ăn mừng ngày cưới.',
            image: `${BASE_IMG}/special-days/wedding.jpg`,
          },
        },
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
};
