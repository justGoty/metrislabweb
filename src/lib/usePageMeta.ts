import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  canonicalPath: string;
}
export function usePageMeta({ title, description, canonicalPath }: PageMeta) {
  useEffect(() => {
    document.title = title;

    const descriptionElement = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    descriptionElement?.setAttribute('content', description);

    const canonicalElement = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    canonicalElement?.setAttribute('href', `https://metrislab.ru${canonicalPath}`);

    const openGraphTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    openGraphTitle?.setAttribute('content', title);

    const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    openGraphDescription?.setAttribute('content', description);

    const openGraphUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    openGraphUrl?.setAttribute('content', `https://metrislab.ru${canonicalPath}`);
  }, [canonicalPath, description, title]);
}
