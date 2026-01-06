/**
 * Shared component prop types
 */

import { ReactNode } from 'react';
import { ViewMode } from './core';

/**
 * Base props for components that accept children
 */
export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Props for components with loading states
 */
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

/**
 * Props for components with error states
 */
export interface ErrorProps {
  error?: string | null;
  onRetry?: () => void;
}

/**
 * Props for filter components
 */
export interface FilterProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Props for view mode toggle components
 */
export interface ViewModeProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}



