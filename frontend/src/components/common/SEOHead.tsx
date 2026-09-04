import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  category?: string;
}

const DEFAULT_TITLE = 'Nirbhid News | निर्भीड न्यूज - निष्पक्ष आणि निर्भीड पत्रकारिता';
const DEFAULT_DESCRIPTION = 'महाराष्ट्रातील ताज्या घडामोडी, मुंबई, ठाणे, राजकारण, गुन्हेगारी, व्यापार, क्रीडा व देश-विदेशातील विश्वासार्ह बातम्या.';
const DEFAULT_IMAGE = '/nirbhid-news-og.png';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  category,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const finalTitle = title ? `${title} | Nirbhid News` : DEFAULT_TITLE;
    document.title = finalTitle;

    // 2. Helper to set or update meta tag by name or property
    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Description
    const finalDesc = description || DEFAULT_DESCRIPTION;
    setMetaTag('name', 'description', finalDesc);

    // Open Graph
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', url || window.location.href);
    setMetaTag('property', 'og:image', image || DEFAULT_IMAGE);
    setMetaTag('property', 'og:site_name', 'Nirbhid News');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', image || DEFAULT_IMAGE);

    // Article Specific Metadata
    if (type === 'article') {
      if (author) setMetaTag('property', 'article:author', author);
      if (publishedTime) setMetaTag('property', 'article:published_time', publishedTime);
      if (category) setMetaTag('property', 'article:section', category);
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url || window.location.href);
  }, [title, description, image, url, type, author, publishedTime, category]);

  return null;
};
