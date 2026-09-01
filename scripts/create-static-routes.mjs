import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDirectory = new URL('../dist/', import.meta.url);
const distPath = fileURLToPath(distDirectory);
const source = await readFile(new URL('index.html', distDirectory), 'utf8');

const routes = [
  {
    path: 'catalog',
    title: 'Каталог газоанализаторов | МэтрисЛаб',
    description: 'Каталог портативных и стационарных газоанализаторов. Поиск модели и запрос на поверку, диагностику, калибровку или ремонт.',
    type: 'CollectionPage',
  },
  {
    path: 'privacy',
    title: 'Политика обработки персональных данных | МэтрисЛаб',
    description: 'Политика ООО «МэтрисЛаб» в отношении обработки персональных данных пользователей сайта metrislab.ru.',
    type: 'WebPage',
  },
];

for (const route of routes) {
  const canonical = `https://metrislab.ru/${route.path}`;
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': route.type,
    name: route.title,
    description: route.description,
    url: canonical,
    isPartOf: { '@id': 'https://metrislab.ru/#website' },
    inLanguage: 'ru-RU',
  });

  const html = source
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${route.description}" />`)
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
    .replace('</head>', `    <script type="application/ld+json">${structuredData}</script>\n  </head>`);

  const outputDirectory = join(distPath, route.path);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(join(outputDirectory, 'index.html'), html, 'utf8');
}
