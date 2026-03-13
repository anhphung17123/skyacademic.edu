import { useState, useCallback, useRef, useEffect } from 'react';

interface UseCopyToClipboardReturn {
  copiedField: string | null;
  handleCopy: (text: string, field: string) => void;
}

export function useCopyToClipboard(resetDelayMs = 2000): UseCopyToClipboardReturn {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback((text: string, field: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setCopiedField(null);
    }, resetDelayMs);
  }, [resetDelayMs]);

  return { copiedField, handleCopy };
}
