import { useTranslation } from 'react-i18next';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Sparkles,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import { ClassroomDto } from '@/types/api';

interface ClassroomsSectionProps {
  courseClassrooms: ClassroomDto[];
  selectedClassroomId: string | null;
  onClassroomSelect: (id: string) => void;
  selectedClassroom: ClassroomDto | null;
}

export const ClassroomsSection = ({
  courseClassrooms,
  selectedClassroomId,
  onClassroomSelect,
  selectedClassroom,
}: ClassroomsSectionProps) => {
  const { t } = useTranslation();

  const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
    open: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', dot: 'bg-green-500' },
    in_progress: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
    completed: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-400', dot: 'bg-gray-400' },
    cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500' },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('courseDetail.classroomsTitle')}
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('courseDetail.classroomsSubtitle')}
        </p>
      </div>

      {/* Classroom Cards */}
      <div className="p-6">
        <div className="space-y-4">
          {courseClassrooms.map((classroom) => {
            const status = statusColors[classroom.status] || statusColors.open;
            const isSelected = classroom.id === selectedClassroomId;

            return (
              <button
                key={classroom.id}
                onClick={() => onClassroomSelect(classroom.id)}
                className={`w-full text-left rounded-xl p-5 transition-all border-2 ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {classroom.title}
                      </h3>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {classroom.start_date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary-500" />
                          <span>
                            {new Date(classroom.start_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                            {classroom.end_date && ` - ${new Date(classroom.end_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}`}
                          </span>
                        </div>
                      )}
                      {!classroom.start_date && (
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-yellow-500" />
                          <span className="text-yellow-600 dark:text-yellow-400">
                            {t('courseDetail.scheduleTbd')}
                          </span>
                        </div>
                      )}
                      {classroom.timezone && (
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-4 h-4" />
                          <span>{classroom.timezone}</span>
                        </div>
                      )}
                    </div>

                    {classroom.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {classroom.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                      <span className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`} />
                      {t(`courseDetail.status.${classroom.status}`)}
                    </span>
                    {classroom.code && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {classroom.code}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}

          {courseClassrooms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
                {t('courseDetail.noClassrooms')}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {t('courseDetail.noClassroomsDesc')}
              </p>
            </div>
          )}
        </div>

        {/* Selected Classroom Details */}
        {selectedClassroom && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('courseDetail.classDetails')}
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {/* Schedule Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    {t('courseDetail.scheduleTitle')}
                  </span>
                </div>
                {selectedClassroom.start_date ? (
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p>{t('courseDetail.starts')}: {new Date(selectedClassroom.start_date).toLocaleDateString()}</p>
                    {selectedClassroom.end_date && (
                      <p>{t('courseDetail.ends')}: {new Date(selectedClassroom.end_date).toLocaleDateString()}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {t('courseDetail.scheduleTbd')}
                  </p>
                )}
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    {t('courseDetail.timezone')}
                  </span>
                </div>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  {selectedClassroom.timezone || 'UTC+7 (Vietnam)'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

