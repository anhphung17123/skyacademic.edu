import type { Teacher } from '@/types';
import { getTeacherById } from '@/services/mock/data/Teachers';

/**
 * Generic helper to attach a teacher/instructor to any entity.
 * Replaces duplicated attachInstructor / attachTeacher functions.
 */
export function attachPerson<T extends Record<string, unknown>>(
  entity: T,
  personId: string | undefined,
  personKey: keyof T
): T {
  if (!personId) return entity;
  const person = getTeacherById(personId);
  if (!person) return entity;
  return { ...entity, [personKey]: person as T[typeof personKey] };
}

/**
 * Convenience: attach an instructor to a Course-shaped entity.
 */
export function attachInstructor<T extends { instructor?: Teacher }>(
  entity: T,
  instructorId?: string
): T {
  return attachPerson(entity, instructorId, 'instructor' as keyof T);
}

/**
 * Convenience: attach a teacher to a Book-shaped entity.
 */
export function attachTeacher<T extends { teacher?: Teacher }>(
  entity: T,
  teacherId?: string
): T {
  return attachPerson(entity, teacherId, 'teacher' as keyof T);
}
