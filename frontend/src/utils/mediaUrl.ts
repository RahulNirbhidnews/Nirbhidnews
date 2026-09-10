/**
 * Utility to resolve media URLs (local static files, Supabase, vs remote URLs)
 * Automatically prefixes active backend origin when needed.
 */
export function resolveMediaUrl(url?: string | null): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // Resolve backend origin from VITE_API_BASE_URL or VITE_API_URL or window location
  const rawApiUrl =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    (typeof window !== 'undefined' && window.location.hostname.includes('localhost')
      ? 'http://localhost:8000/api/v1'
      : 'https://nirbhid-news-api1.onrender.com/api/v1');

  const backendOrigin = rawApiUrl.replace(/\/api\/v1\/?$/, '').replace(/\/+$/, '');
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  
  return `${backendOrigin}${cleanPath}`;
}
