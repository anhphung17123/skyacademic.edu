/**
 * Date utility functions for mock data generation
 */

/**
 * Calculate a date that is N days ago from today
 * @param days - Number of days to subtract
 * @returns ISO string of the calculated date
 */
export const getDateDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

/**
 * Calculate a date that is N days in the future from today
 * @param days - Number of days to add
 * @returns ISO string of the calculated date
 */
export const getFutureDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};


