import { useEffect } from 'react';

/**
 * Supercharged SEO Component for dynamic head management,
 * Open Graph, Twitter Cards, Geo-targeting, and JSON-LD schema injection.
 */
export default function SEO({
  title = "Enlazer — #1 NFC Smart Cards & Digital Business Cards in Nigeria, FCT Abuja & Africa",
  description = "Enlazer is Nigeria's #1 NFC Smart Card & Digital Business Card platform. Share your WhatsApp, socials, and portfolio with one NFC tap across FCT Abuja, Lagos, and all 36 states of Nigeria & Africa.",
  image = "https://enlazer.cloud/og-image.png",
  url = "https://enlazer.cloud/",
  type = "website",
  schema = null
}) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper function to set meta tag content
    const setMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', value);
      } else {
        element = document.createElement('meta');
        const matches = selector.match(/meta\[([a-zA-Z:-]+)=["'](.*?)["']\]/);
        if (matches) {
          element.setAttribute(matches[1], matches[2]);
          element.setAttribute(attribute, value);
          document.head.appendChild(element);
        }
      }
    };

    // 2. Update Standard Meta Tags
    setMetaTag('meta[name="description"]', 'content', description);

    // 3. Update Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:image"]', 'content', image);
    setMetaTag('meta[property="og:url"]', 'content', url);
    setMetaTag('meta[property="og:type"]', 'content', type);

    // 4. Update Twitter Card Tags
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'content', image);

    // 5. Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', url);
      document.head.appendChild(canonical);
    }

    // 6. Dynamic JSON-LD Schema Injection if provided
    let scriptTag = document.getElementById('dynamic-route-schema');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-route-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

  }, [title, description, image, url, type, schema]);

  return null;
}
