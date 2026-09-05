/**
 * Helper to extract YouTube video or live stream ID and return an iframe-friendly embed URL.
 * Handles youtube.com/watch?v=ID, youtu.be/ID, youtube.com/live/ID, and youtube.com/embed/ID.
 */
export function getYouTubeEmbedUrl(url?: string, autoplay = true, mute = true): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return '';
  }

  const cleanUrl = url.trim();

  // If already an embed URL, ensure parameters are attached
  if (cleanUrl.includes('youtube.com/embed/')) {
    const hasQuery = cleanUrl.includes('?');
    const separator = hasQuery ? '&' : '?';
    return `${cleanUrl}${separator}autoplay=${autoplay ? 1 : 0}&mute=${mute ? 1 : 0}&controls=1`;
  }

  // Regex to extract video or live stream ID (11 alphanumeric characters)
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = cleanUrl.match(regex);

  if (match && match[1]) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${mute ? 1 : 0}&controls=1`;
  }

  // Fallback if URL is already a generic embeddable URL
  return cleanUrl;
}
