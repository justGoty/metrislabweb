import { ArrowRight, BadgeCheck, SearchCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';
import { gasAnalyzers } from '../data/gasAnalyzers';

export default function GasAnalyzerModels() {
  const { t } = useTranslation();
  const headingRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="analyzers" className="py-24 bg-white overflow-hidden">
      <div className="section-divider max-w-4xl mx-auto mb-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headingRef} className="reveal-up max-w-3xl mb-14">
          <p className="text-[#ff8a00] font-semibold text-sm uppercase mb-3">
            {t('analyzers.label')}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5">
            {t('analyzers.headline')}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            {t('analyzers.description')}
          </p>
        </div>

        <div ref={gridRef} className="stagger-children grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gasAnalyzers.map((model) => {
            const name = t(model.nameKey);
            const type = t(`analyzers.type_${model.type}`);
            return (
            <article
              key={model.id}
              className="group bg-[#f6fafd] border border-slate-100 rounded-lg overflow-hidden card-hover"
            >
              <div className="h-56 bg-white flex items-center justify-center p-6 border-b border-slate-100">
                <img
                  src={model.image}
                  alt={`${type} ${name}`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b3a5b] bg-white rounded-md px-2.5 py-1 mb-3">
                  <BadgeCheck size={14} className="text-[#ff8a00]" />
                  {type}
                </div>
                <h3 className="text-lg font-bold text-[#0b3a5b] mb-2">{name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t(model.descriptionKey)}</p>
              </div>
            </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/catalog"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#0b3a5b]/20 bg-white px-6 py-3 text-sm font-semibold text-[#0b3a5b] transition-colors hover:border-[#0b3a5b] hover:bg-[#f6fafd]"
          >
            {t('analyzers.catalog_cta')}
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="mt-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 bg-[#0b3a5b] text-white rounded-lg p-7 shadow-xl shadow-slate-200/50">
          <div className="flex gap-4">
            <div className="w-11 h-11 rounded-lg bg-white/10 text-[#ff8a00] flex items-center justify-center flex-shrink-0">
              <SearchCheck size={22} />
            </div>
            <p className="text-base lg:text-lg text-white leading-8 font-medium max-w-3xl">
              {t('analyzers.note')}
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#ff8a00] text-white text-sm font-semibold rounded-lg hover:bg-[#e67600] transition-colors flex-shrink-0"
          >
            {t('analyzers.cta')}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
