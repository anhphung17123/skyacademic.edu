import type { Teacher } from '@/types';
import teacherMsSongImage from '@/images/users/PhungThiXuan.jpg';

export const TEACHER_MS_SONG = 'ms-song';

export const mockTeachers: Teacher[] = [
  {
    id: TEACHER_MS_SONG,
    name: 'Phung Thi Xuan (Ms. Song)',
    nameVi: 'Phùng Thị Xuân (Ms. Song)',
    imageUrl: teacherMsSongImage,
    role: 'Bilingual English–Vietnamese Educator',
    roleVi: 'Nhà Giáo Dục Song Ngữ Anh–Việt',
    bio: 'Specializing in Science, Physics, ESL, and IELTS. Experience with Swinburne University, Canadian STEM Program, and Martin Academy.',
    bioVi: 'Chuyên về Khoa học, Vật lý, ESL và IELTS. Kinh nghiệm với Đại học Swinburne, Chương trình STEM Canada và Martin Academy.',
    email: 'xuan123hv@gmail.com',
    credentials: [
      { text: 'B.Ed. Physics (GPA 3.57/4.0)', textVi: 'Cử nhân Sư phạm Vật lý (GPA 3.57/4.0)' },
      { text: 'TESOL Certified', textVi: 'Chứng chỉ TESOL' },
      { text: 'Swinburne University', textVi: 'Đại học Swinburne' },
      { text: 'Canadian STEM Program', textVi: 'Chương trình STEM Canada' },
      { text: 'Martin Academy', textVi: 'Martin Academy' },
    ],
  },
];

export function getTeacherById(id: string): Teacher | undefined {
  return mockTeachers.find((t) => t.id === id);
}

export function getDefaultTeacher(): Teacher | undefined {
  return mockTeachers[0];
}
