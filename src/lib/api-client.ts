/**
 * Base HTTP client for future real API integration.
 * Currently services use mock data; replace with fetch/axios when backend is ready.
 */

const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export interface ApiClientConfig {
  baseUrl?: string;
  headers?: HeadersInit;
}

function getBaseUrl(): string {
  return typeof import.meta.env?.VITE_API_BASE_URL === 'string'
    ? import.meta.env.VITE_API_BASE_URL
    : '';
}

/**
 * Simple GET request. Use when switching from mock to real API.
 */
export async function apiGet<T>(path: string, config: ApiClientConfig = {}): Promise<T> {
  const baseUrl = config.baseUrl ?? getBaseUrl();
  const url = path.startsWith('http') ? path : `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { ...DEFAULT_HEADERS, ...config.headers },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
