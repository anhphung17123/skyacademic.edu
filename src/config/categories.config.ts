import { Volume2, MessageCircle, Award, Globe, type LucideIcon } from 'lucide-react';
import { COURSE_CATEGORIES } from '@/constants';

export interface CategoryDefinition {
  readonly id: string;
  readonly name: string;
  readonly nameVi: string;
  readonly icon: LucideIcon;
  readonly tagline: string;
  readonly taglineVi: string;
  readonly categoryKey: string;
}

export const CATEGORY_DEFINITIONS: readonly CategoryDefinition[] = [
  {
    id: 'vietnamese',
    name: 'Vietnamese',
    nameVi: 'Tiếng Việt',
    icon: Globe,
    tagline: 'Learn Vietnamese through real-life and classroom lessons.',
    taglineVi: 'Học tiếng Việt qua chuyến đi thực tế và lớp học.',
    categoryKey: COURSE_CATEGORIES.VIETNAMESE,
  },
  {
    id: 'pronunciation',
    name: 'Pronunciation – 44 IPA Sounds',
    nameVi: 'Phát Âm – 44 Âm IPA',
    icon: Volume2,
    tagline: 'Speak clearly. Sound natural.',
    taglineVi: 'Nói rõ ràng. Âm thanh tự nhiên.',
    categoryKey: COURSE_CATEGORIES.PRONUNCIATION,
  },
  {
    id: 'communication',
    name: 'Communication English',
    nameVi: 'Giao Tiếp Tiếng Anh',
    icon: MessageCircle,
    tagline: 'Use English in real life, not just textbooks.',
    taglineVi: 'Sử dụng tiếng Anh trong cuộc sống thực, không chỉ sách giáo khoa.',
    categoryKey: COURSE_CATEGORIES.COMMUNICATION,
  },
  {
    id: 'ielts',
    name: 'IELTS Preparation',
    nameVi: 'Luyện Thi IELTS',
    icon: Award,
    tagline: 'Learn smart. Score higher.',
    taglineVi: 'Học thông minh. Điểm cao hơn.',
    categoryKey: COURSE_CATEGORIES.IELTS,
  },
];
