import i18n from '../lib/i18n';
import { gasAnalyzers } from './gasAnalyzers';

export const siteUrl = 'https://metrislab.ru';
export const staticPaths = ['/', '/catalog/', '/privacy/', '/404.html'];

export function getPageMeta(pathname: string, language = 'ru') {
  const path = pathname.replace(/\/+$/, '') || '/';
  const t = i18n.getFixedT(language);
  const pages = {
    '/': {
      title: `${t('hero.headline')} | МэтрисЛаб`,
      description: language === 'en'
        ? 'Gas analyzer diagnostics, repairs and verification coordination. MetrisLab, Balashikha.'
        : 'Принимаем газоанализаторы, проводим диагностику и ремонт, организуем поверку и возвращаем комплект документов. МэтрисЛаб, Балашиха.',
      canonicalPath: '/',
    },
    '/catalog': {
      title: t('catalog.meta_title'), description: t('catalog.meta_description'), canonicalPath: '/catalog/',
    },
    '/privacy': {
      title: 'Политика обработки персональных данных | МэтрисЛаб',
      description: 'Политика ООО «МэтрисЛаб» в отношении обработки персональных данных пользователей сайта metrislab.ru.',
      canonicalPath: '/privacy/',
    },
  };
  return pages[path as keyof typeof pages] ?? {
    title: language === 'en' ? 'Page not found | MetrisLab' : 'Страница не найдена | МэтрисЛаб',
    description: language === 'en' ? 'Find your instrument in the catalog or contact MetrisLab.' : 'Найдите прибор в каталоге или свяжитесь с МэтрисЛаб по вопросу обслуживания газоанализаторов.',
    canonicalPath: null,
  };
}

export function getStructuredData(pathname: string) {
  const meta = getPageMeta(pathname);
  if (!meta.canonicalPath) return null;
  const t = i18n.getFixedT('ru');
  const organization = {
    '@type': 'Organization', '@id': `${siteUrl}/#organization`,
    name: 'МэтрисЛаб', legalName: 'ООО «МэтрисЛаб»', alternateName: 'MetrisLab',
    url: `${siteUrl}/`, logo: `${siteUrl}/metrislogo.png`, telephone: '+79060799144', email: 'info@metrislab.ru',
    address: {
      '@type': 'PostalAddress', streetAddress: 'мкр. Кучино, ул. Гидрогородок, д. 15, к. 2',
      addressLocality: 'Балашиха', addressRegion: 'Московская область', postalCode: '143982', addressCountry: 'RU',
    },
  };
  const graph: object[] = [organization, {
    '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: 'МэтрисЛаб',
    inLanguage: 'ru-RU', publisher: { '@id': organization['@id'] },
  }, {
    '@type': meta.canonicalPath === '/catalog/' ? 'CollectionPage' : 'WebPage',
    '@id': `${siteUrl}${meta.canonicalPath}#webpage`, url: `${siteUrl}${meta.canonicalPath}`,
    name: meta.title, description: meta.description, inLanguage: 'ru-RU',
    isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': organization['@id'] },
  }];
  if (meta.canonicalPath === '/') {
    graph.push({
      '@type': 'Service', '@id': `${siteUrl}/#service`, name: 'Сервис и организация поверки газоанализаторов',
      description: t('hero.description'), provider: { '@id': organization['@id'] },
      areaServed: { '@type': 'Country', name: 'Россия' },
    }, {
      '@type': 'FAQPage', '@id': `${siteUrl}/#faq`,
      mainEntity: [1, 2, 3, 4, 5].map(index => ({
        '@type': 'Question', name: t(`faq.q${index}`),
        acceptedAnswer: { '@type': 'Answer', text: t(`faq.a${index}`) },
      })),
    });
  }
  if (meta.canonicalPath === '/catalog/') {
    graph.push({
      '@type': 'ItemList', '@id': `${siteUrl}/catalog/#models`, numberOfItems: gasAnalyzers.length,
      itemListElement: gasAnalyzers.map((analyzer, index) => ({
        '@type': 'ListItem', position: index + 1,
        item: {
          '@type': 'Thing', name: t(analyzer.nameKey), description: t(analyzer.descriptionKey),
          image: `${siteUrl}${analyzer.image}`, url: `${siteUrl}/catalog/#${analyzer.id}`,
        },
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
