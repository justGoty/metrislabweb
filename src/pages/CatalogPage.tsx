import { useMemo, useState } from 'react';
import { ArrowRight, ChevronRight, Search, SearchX, SlidersHorizontal, X } from 'lucide-react';
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
    <main className="relative z-10 min-h-screen bg-white pt-20">
      <section className="border-b border-slate-200 bg-[#f6fafd]">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-12 lg:px-8 lg:pb-18 lg:pt-16">
          <nav aria-label={t('catalog.breadcrumb_label')} className="mb-8 flex items-center gap-2 text-sm text-slate-500">
            <a href="/" className="transition-colors hover:text-[#ff8a00]">{t('catalog.breadcrumb_home')}</a>
            <ChevronRight size={14} />
            <span className="font-medium text-[#0b3a5b]">{t('nav.catalog')}</span>
          </nav>

          <div className="max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase text-[#ff8a00]">{t('catalog.eyebrow')}</p>
            <h1 className="mb-5 text-4xl font-bold leading-tight text-[#0b3a5b] sm:text-5xl lg:text-6xl">
              {t('catalog.title')}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">{t('catalog.description')}</p>
          </div>
        </div>
      </section>

      <section aria-label={t('catalog.filters_label')} className="sticky top-20 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <div className="grid gap-4 xl:grid-cols-[minmax(320px,1fr)_auto_240px] xl:items-end">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase text-slate-500">{t('catalog.search_label')}</span>
              <span className="relative block">
                <Search size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t('catalog.search_placeholder')}
                  className="h-12 w-full rounded-lg border border-slate-300 bg-white py-3 pl-12 pr-11 text-sm text-slate-900 outline-none transition focus:border-[#1d9bf0] focus:ring-2 focus:ring-[#1d9bf0]/20"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label={t('catalog.clear_search')}
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={17} />
                  </button>
                )}
              </span>
            </label>

            <div>
              <span className="mb-2 block text-xs font-semibold uppercase text-slate-500">{t('catalog.type_label')}</span>
              <div className="grid grid-cols-2 gap-1 rounded-lg border border-slate-300 bg-slate-50 p-1 sm:h-12 sm:grid-cols-3 sm:gap-0">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTypeFilter(option.value)}
                    className={`min-h-10 min-w-0 rounded-md px-3 text-sm font-medium transition-colors sm:min-h-0 ${
                      option.value === 'portable' ? 'col-span-2 sm:col-span-1' : ''
                    } ${
                      typeFilter === option.value
                        ? 'bg-[#0b3a5b] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-white hover:text-[#0b3a5b]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase text-slate-500">{t('catalog.manufacturer_label')}</span>
              <select
                value={manufacturerFilter}
                onChange={(event) => setManufacturerFilter(event.target.value)}
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#1d9bf0] focus:ring-2 focus:ring-[#1d9bf0]/20"
              >
                <option value="all">{t('catalog.all_manufacturers')}</option>
                {manufacturers.map((manufacturer) => (
                  <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <SlidersHorizontal size={17} className="text-[#ff8a00]" />
            <span>{t('catalog.results', { count: filteredAnalyzers.length })}</span>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-[#0b3a5b] transition-colors hover:text-[#ff8a00]"
            >
              {t('catalog.reset')}
            </button>
          )}
        </div>

        {filteredAnalyzers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredAnalyzers.map((analyzer) => (
              <GasAnalyzerCard
                key={analyzer.id}
                analyzer={analyzer}
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
          <div className="border-y border-slate-200 py-20 text-center">
            <SearchX size={42} className="mx-auto mb-5 text-slate-300" />
            <h2 className="mb-2 text-2xl font-bold text-[#0b3a5b]">{t('catalog.empty_title')}</h2>
            <p className="mx-auto mb-6 max-w-xl text-slate-600">{t('catalog.empty_description')}</p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0b3a5b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#145277]"
            >
              {t('catalog.reset')}
            </button>
          </div>
        )}

        <div className="mt-16 flex flex-col gap-6 border-t border-slate-200 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-[#0b3a5b]">{t('catalog.not_listed_title')}</h2>
            <p className="max-w-2xl leading-7 text-slate-600">{t('catalog.not_listed_description')}</p>
          </div>
          <a
            href="/#contact"
            className="inline-flex min-h-12 flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-[#ff8a00] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e67600]"
          >
            {t('catalog.not_listed_cta')}
            <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </main>
  );
}
