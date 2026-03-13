/**
 * Centralized logging. Replace direct console.error in production if needed.
 */

export const logger = {
  error(message: string, error?: unknown): void {
    if (typeof console !== "undefined" && console.error) {
      console.error(message, error ?? "");
    }
  },
  warn(message: string, data?: unknown): void {
    if (typeof console !== "undefined" && console.warn) {
      console.warn(message, data ?? "");
    }
  },
};
