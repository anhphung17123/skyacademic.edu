/**
 * Site-wide display stats (hero, about, courses page, etc.).
 * Single source of truth; all numeric copy comes from here.
 * When a value is 0, UI that shows it should be hidden (chân thực: chỉ show khi có số liệu thực).
 */

export interface SiteStatsDto {
  hero: {
    learnersCount: number;
    /** Star rating for "Trusted by learners" (0 = hide block). */
    rating: number;
  };
  /** Free content badge percent (0 = show "Free" only, no "X% Free"). */
  freeContentPercent: number;
  about: {
    statStudents: number;
    statCourses: number;
    statRating: number;
    yearsExp: number;
  };
  coursesPage: {
    totalCourses: number;
    averageRating: number;
  };
  booksPage: {
    totalTitles: number;
    averageRating: number;
  };
  aboutCopy: {
    satisfactionPercent: number;
    countriesCount: number;
    teacher1YearsMin: number;
    toeicScoreMin: number;
    teacher3Years: number;
    teacher4Years: number;
  };
}

export const mockSiteStats: SiteStatsDto = {
  hero: { learnersCount: 0, rating: 0 },
  freeContentPercent: 0,
  about: { statStudents: 0, statCourses: 0, statRating: 0, yearsExp: 0 },
  coursesPage: { totalCourses: 0, averageRating: 0 },
  booksPage: { totalTitles: 0, averageRating: 0 },
  aboutCopy: {
    satisfactionPercent: 0,
    countriesCount: 0,
    teacher1YearsMin: 0,
    toeicScoreMin: 0,
    teacher3Years: 0,
    teacher4Years: 0,
  },
};
