import { useState, useCallback } from 'react';

interface UseCopyToClipboardReturn {
  copiedField: string | null;
  handleCopy: (text: string, field: string) => void;
}

export function useCopyToClipboard(resetDelayMs = 2000): UseCopyToClipboardReturn {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), resetDelayMs);
  }, [resetDelayMs]);

  return { copiedField, handleCopy };
}
