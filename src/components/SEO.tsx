import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  structuredData?: object;
}

export function SEO({ title, description, canonical, ogType = 'website', structuredData }: SEOProps) {
  useEffect(() => {
    document.title = title;

    if (description) {
      setMetaTag('name', 'description', description);
    }

    const finalCanonical = canonical || `https://logiquote.app${window.location.pathname}`;
    setLinkTag('canonical', finalCanonical);

    setMetaTag('property', 'og:title', title);
    if (description) setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', finalCanonical);
    setMetaTag('property', 'og:locale', 'es_ES');

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    if (description) setMetaTag('name', 'twitter:description', description);

    if (structuredData) {
      const existing = document.getElementById('page-structured-data');
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-structured-data';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, ogType, structuredData]);

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

function setLinkTag(rel: string, href: string) {
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}
