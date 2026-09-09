import { StrictMode } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import App from './App';
import { getPageMeta, getStructuredData, siteUrl } from './data/pageMeta';

export { staticPaths } from './data/pageMeta';

export function renderPage(pathname: string) {
  const meta = getPageMeta(pathname);
  const canonical = meta.canonicalPath ? `${siteUrl}${meta.canonicalPath}` : null;
  const structuredData = getStructuredData(pathname);
  const head = renderToStaticMarkup(<>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta name="robots" content={canonical ? 'index, follow, max-image-preview:large' : 'noindex, follow'} />
    {canonical && <link rel="canonical" href={canonical} />}
    <meta property="og:site_name" content="МэтрисЛаб" />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:type" content="website" />
    {canonical && <meta property="og:url" content={canonical} />}
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:image" content={`${siteUrl}/images/lab/metrislab-hero.webp`} />
    <meta property="og:image:alt" content="Техническая площадка МэтрисЛаб в Балашихе" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={`${siteUrl}/images/lab/metrislab-hero.webp`} />
    {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(structuredData).replaceAll('<', '\\u003c'),
    }} />}
  </>);
  const html = renderToString(<StrictMode><App pathname={pathname} /></StrictMode>);
  return { head, html };
}
