import { useCallback } from 'react';
import { useToast } from './use-toast';

export interface UseShareOptions {
  /** Auto-show toast duration in ms; 0 = no auto-dismiss */
  toastDurationMs?: number;
}

export interface UseShareReturn {
  share: (params: { url: string; title?: string; text?: string }) => Promise<void>;
  isToastVisible: boolean;
  hideToast: () => void;
}

/**
 * Share URL via Web Share API with clipboard fallback; manages success toast.
 */
export function useShare(options: UseShareOptions = {}): UseShareReturn {
  const { toastDurationMs = 3000 } = options;
  const { isVisible: isToastVisible, show: showToast, hide: hideToast } = useToast(toastDurationMs);

  const share = useCallback(
    async (params: { url: string; title?: string; text?: string }) => {
      const { url, title, text } = params;
      try {
        if (typeof navigator !== 'undefined' && navigator.share) {
          await navigator.share({ title, text, url });
          showToast(toastDurationMs);
          return;
        }
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
          showToast(toastDurationMs);
          return;
        }
      } catch {
        try {
          if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(url);
            showToast(toastDurationMs);
          }
        } catch {
          // Ignore copy failure
        }
      }
    },
    [showToast, toastDurationMs]
  );

  return { share, isToastVisible, hideToast };
}
