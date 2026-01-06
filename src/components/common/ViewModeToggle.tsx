import { Grid3X3, List } from 'lucide-react';
import { clsx } from 'clsx';
import { ViewMode } from '@/types/core';
import { VIEW_MODES } from '@/constants';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

/**
 * Reusable view mode toggle component (Grid/List)
 */
export const ViewModeToggle = ({ viewMode, onViewModeChange, className }: ViewModeToggleProps) => {
  return (
    <div className={clsx('flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1', className)}>
      <button
        onClick={() => onViewModeChange(VIEW_MODES.GRID)}
        className={clsx(
          'p-2 rounded-lg transition-colors',
          viewMode === VIEW_MODES.GRID
            ? 'bg-white dark:bg-gray-600 shadow-sm text-primary-600'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        )}
        aria-label="Grid view"
      >
        <Grid3X3 className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewModeChange(VIEW_MODES.LIST)}
        className={clsx(
          'p-2 rounded-lg transition-colors',
          viewMode === VIEW_MODES.LIST
            ? 'bg-white dark:bg-gray-600 shadow-sm text-primary-600'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        )}
        aria-label="List view"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
};

