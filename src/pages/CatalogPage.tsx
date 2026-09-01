import { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronRight, Search, SearchX, SlidersHorizontal, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GasAnalyzerCard from '../components/catalog/GasAnalyzerCard';
import { gasAnalyzers, type GasAnalyzerType } from '../data/gasAnalyzers';
import { usePageMeta } from '../lib/usePageMeta';

type TypeFilter = 'all' | GasAnalyzerType;

function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase()
    .replaceAll('ё', 'е')
    .replace(/[^a-zа-я0-9]+/gi, ' ')
    .trim();
}

export default function CatalogPage() {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [manufacturerFilter, setManufacturerFilter] = useState('all');
  const language = i18n.language.startsWith('en') ? 'en' : 'ru';

  usePageMeta({
    title: t('catalog.meta_title'),
    description: t('catalog.meta_description'),
    canonicalPath: '/catalog',
  });

  const manufacturers = useMemo(() => {
    const byId = new Map<string, string>();
    gasAnalyzers.forEach((analyzer) => {
      byId.set(analyzer.manufacturer.en, analyzer.manufacturer[language]);
    });
    return Array.from(byId, ([id, label]) => ({ id, label })).sort((a, b) =>
      a.label.localeCompare(b.label, language),
    );
  }, [language]);

  const filteredAnalyzers = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);

    return gasAnalyzers.filter((analyzer) => {
      if (typeFilter !== 'all' && analyzer.type !== typeFilter) return false;
      if (manufacturerFilter !== 'all' && analyzer.manufacturer.en !== manufacturerFilter) return false;
      if (!normalizedQuery) return true;

      const searchableText = normalizeSearch(
        [
          t(analyzer.nameKey),
          t(analyzer.descriptionKey),
          analyzer.manufacturer.ru,
          analyzer.manufacturer.en,
          ...analyzer.aliases,
        ].join(' '),
      );

      return searchableText.includes(normalizedQuery);
    });
  }, [manufacturerFilter, query, t, typeFilter]);

  const resetFilters = () => {
    setQuery('');
    setTypeFilter('all');
    setManufacturerFilter('all');
  };

  const hasActiveFilters = Boolean(query) || typeFilter !== 'all' || manufacturerFilter !== 'all';
  const typeOptions: Array<{ value: TypeFilter; label: string }> = [
    { value: 'all', label: t('catalog.filter_all') },
    { value: 'stationary', label: t('catalog.filter_stationary') },
    { value: 'portable', label: t('catalog.filter_portable') },
  ];

  return (
    <main className="relative z-10 min-h-screen bg-[#f2f5f6] pt-[76px] text-[#172027] sm:pt-[108px]">
      <section className="border-b border-[#cbd3d8] bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <nav
            aria-label={t('catalog.breadcrumb_label')}
            className="mb-9 flex items-center gap-2 font-mono text-xs text-[#63717a]"
          >
            <a href="/" className="border-b border-transparent transition-colors hover:border-[#f28c18] hover:text-[#172027]">
              {t('catalog.breadcrumb_home')}
            </a>
            <ChevronRight size={13} aria-hidden="true" />
            <span className="text-[#0b4668]">{t('nav.catalog')}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase text-[#0b4668]">
                <span className="h-2 w-2 bg-[#f28c18]" aria-hidden="true" />
                {t('catalog.eyebrow')}
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] text-[#172027] sm:text-5xl lg:text-6xl">
                {t('catalog.title')}
              </h1>
            </div>
            <div className="border-l-2 border-[#0b4668] pl-5 lg:col-span-4 lg:mb-1">
              <p className="max-w-xl text-base leading-7 text-[#56636b]">{t('catalog.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label={t('catalog.filters_label')}
        className="border-b border-[#aeb9bf] bg-[#f2f5f6] xl:sticky xl:top-[108px] xl:z-30 xl:bg-[#f2f5f6]/95 xl:backdrop-blur-sm"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8 lg:px-12">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-[#56636b]">
            <SlidersHorizontal size={15} className="text-[#0b4668]" aria-hidden="true" />
            {t('catalog.filters_label')}
          </div>

          <div className="grid gap-3 xl:grid-cols-[minmax(320px,1fr)_minmax(390px,auto)_260px] xl:items-end">
            <div className="block min-w-0">
              <label htmlFor="catalog-search" className="mb-2 block text-xs font-medium text-[#56636b]">
                {t('catalog.search_label')}
              </label>
              <span className="relative block">
                <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0b4668]" />
                <input
                  id="catalog-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t('catalog.search_placeholder')}
                  className="h-12 w-full rounded-[2px] border border-[#aeb9bf] bg-white py-3 pl-12 pr-11 text-sm text-[#172027] outline-none transition-colors placeholder:text-[#53636c] focus:border-[#0b4668] focus:ring-1 focus:ring-[#0b4668]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label={t('catalog.clear_search')}
                    className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-[#63717a] transition-colors hover:bg-[#e5eaec] hover:text-[#172027] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b4668]"
                  >
                    <X size={17} />
                  </button>
                )}
              </span>
            </div>

            <fieldset className="min-w-0">
              <legend className="mb-2 text-xs font-medium text-[#56636b]">{t('catalog.type_label')}</legend>
              <div className="grid grid-cols-2 border border-[#aeb9bf] bg-white sm:grid-cols-3">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTypeFilter(option.value)}
                    aria-pressed={typeFilter === option.value}
                    className={`min-h-12 min-w-0 border-b border-r border-[#aeb9bf] px-3 text-sm font-semibold transition-colors sm:border-b-0 sm:last:border-r-0 ${
                      option.value === 'portable' ? 'col-span-2 border-b-0 border-r-0 sm:col-span-1' : ''
                    } ${
                      typeFilter === option.value
                        ? 'bg-[#0b4668] text-white'
                        : 'bg-white text-[#344149] hover:bg-[#e5eaec] hover:text-[#0b4668]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="block min-w-0">
              <label htmlFor="catalog-manufacturer" className="mb-2 block text-xs font-medium text-[#56636b]">
                {t('catalog.manufacturer_label')}
              </label>
              <span className="relative block">
                <select
                  id="catalog-manufacturer"
                  value={manufacturerFilter}
                  onChange={(event) => setManufacturerFilter(event.target.value)}
                  className="h-12 w-full appearance-none rounded-[2px] border border-[#aeb9bf] bg-white px-4 pr-11 text-sm text-[#172027] outline-none transition-colors focus:border-[#0b4668] focus:ring-1 focus:ring-[#0b4668]"
                >
                  <option value="all">{t('catalog.all_manufacturers')}</option>
                  {manufacturers.map((manufacturer) => (
                    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.label}</option>
                  ))}
                </select>
                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0b4668]"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <div className="mb-6 flex min-h-10 flex-wrap items-center justify-between gap-4 border-b border-[#aeb9bf] pb-4">
          <div className="flex items-center gap-3 text-sm text-[#344149]">
            <span className="font-mono text-lg font-semibold text-[#0b4668]">
              {String(filteredAnalyzers.length).padStart(2, '0')}
            </span>
            <span>{t('catalog.results', { count: filteredAnalyzers.length })}</span>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="min-h-10 border-b border-[#0b4668] text-sm font-semibold text-[#0b4668] transition-colors hover:border-[#f28c18] hover:text-[#b45d00]"
            >
              {t('catalog.reset')}
            </button>
          )}
        </div>

        {filteredAnalyzers.length > 0 ? (
          <div className="grid border-l border-t border-[#aeb9bf] sm:grid-cols-2 xl:grid-cols-3">
            {filteredAnalyzers.map((analyzer, index) => (
              <GasAnalyzerCard
                key={analyzer.id}
                analyzer={analyzer}
                index={index + 1}
                name={t(analyzer.nameKey)}
                description={t(analyzer.descriptionKey)}
                manufacturer={analyzer.manufacturer[language]}
                typeLabel={t(`analyzers.type_${analyzer.type}`)}
                manufacturerLabel={t('catalog.manufacturer_label')}
                actionLabel={t('catalog.card_cta')}
              />
            ))}
          </div>
        ) : (
          <div className="border border-[#aeb9bf] bg-white px-6 py-16 text-center sm:py-20">
            <SearchX size={40} className="mx-auto mb-5 text-[#53636c]" aria-hidden="true" />
            <h2 className="mb-2 text-2xl font-semibold text-[#172027]">{t('catalog.empty_title')}</h2>
            <p className="mx-auto mb-7 max-w-xl leading-7 text-[#56636b]">{t('catalog.empty_description')}</p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-12 items-center justify-center rounded-[2px] bg-[#0b4668] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#083750] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b4668]"
            >
              {t('catalog.reset')}
            </button>
          </div>
        )}

        <div className="mt-14 grid border-y border-[#aeb9bf] bg-white lg:grid-cols-12">
          <div className="border-b border-[#aeb9bf] p-6 sm:p-8 lg:col-span-8 lg:border-b-0 lg:border-r">
            <p className="mb-3 font-mono text-xs text-[#0b4668]">SERVICE REQUEST / 01</p>
            <h2 className="mb-3 text-2xl font-semibold text-[#172027] sm:text-3xl">{t('catalog.not_listed_title')}</h2>
            <p className="max-w-2xl leading-7 text-[#56636b]">{t('catalog.not_listed_description')}</p>
          </div>
          <a
            href="/#contact"
            className="group flex min-h-28 items-center justify-between gap-5 rounded-[2px] bg-[#f28c18] px-6 py-5 text-sm font-semibold text-[#172027] transition-colors hover:bg-[#df7a08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b4668] sm:px-8 lg:col-span-4"
          >
            <span className="max-w-[15rem]">{t('catalog.not_listed_cta')}</span>
            <ArrowRight size={20} className="flex-none transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
