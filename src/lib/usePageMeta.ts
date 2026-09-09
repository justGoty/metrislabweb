import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  canonicalPath: string | null;
}
export function usePageMeta({ title, description, canonicalPath }: PageMeta) {
  useEffect(() => {
    document.title = title;

    const descriptionElement = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    descriptionElement?.setAttribute('content', description);

    const canonicalElement = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalPath) canonicalElement?.setAttribute('href', `https://metrislab.ru${canonicalPath}`);
    else canonicalElement?.remove();
    document.querySelector('meta[name="robots"]')?.setAttribute('content', canonicalPath ? 'index, follow, max-image-preview:large' : 'noindex, follow');

    const openGraphTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    openGraphTitle?.setAttribute('content', title);

    const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    openGraphDescription?.setAttribute('content', description);

    const openGraphUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (canonicalPath) openGraphUrl?.setAttribute('content', `https://metrislab.ru${canonicalPath}`);
    else openGraphUrl?.remove();
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
  }, [canonicalPath, description, title]);
}
