import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export function SEO({ title, description, ogTitle, ogDescription }: SEOProps) {
  useEffect(() => {
    document.title = title;

    if (description) {
      setMetaTag('name', 'description', description);
    }

    const finalOgTitle = ogTitle || title;
    const finalOgDescription = ogDescription || description;

    if (finalOgTitle) {
      setMetaTag('property', 'og:title', finalOgTitle);
    }
    if (finalOgDescription) {
      setMetaTag('property', 'og:description', finalOgDescription);
    }
  }, [title, description, ogTitle, ogDescription]);

  return null;
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}
