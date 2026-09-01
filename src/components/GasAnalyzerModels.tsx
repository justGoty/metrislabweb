import { ArrowRight, BadgeCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gasAnalyzers } from '../data/gasAnalyzers';

export default function GasAnalyzerModels() {
  const { t, i18n } = useTranslation();
  const language = i18n.language.startsWith('ru') ? 'ru' : 'en';

  return (
    <section id="analyzers" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="section-kicker">{t('analyzers.label')}</p>
            <h2 className="section-title mt-4">{t('analyzers.headline')}</h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-2xl text-base leading-7 text-[#53636c]">{t('analyzers.description')}</p>
            <a href="/catalog" className="link-arrow mt-6">
              {t('analyzers.catalog_cta')}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

        <div className="mt-14 grid border-l border-t border-[#cbd3d8] sm:grid-cols-2 xl:grid-cols-4">
          {gasAnalyzers.slice(0, 4).map((model, index) => (
            <article key={model.id} className={`group border-b border-r border-[#cbd3d8] bg-white ${index > 1 ? 'hidden sm:block' : ''}`}>
              <div className="flex aspect-[4/3] items-center justify-center bg-[#f2f5f6] p-7">
                <img
                  src={model.image}
                  alt={t(model.nameKey)}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.035]"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase text-[#53636c]">{model.manufacturer[language]}</span>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-[#277a57]">
                    <BadgeCheck size={14} />
                    {t(`analyzers.type_${model.type}`)}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#172027]">{t(model.nameKey)}</h3>
                <p className="mt-3 min-h-16 text-sm leading-6 text-[#667780]">{t(model.descriptionKey)}</p>
                <a href={`/?model=${encodeURIComponent(t(model.nameKey))}#contact`} className="link-arrow mt-6 text-xs">
                  {t('catalog.card_cta')}
                  <ArrowRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-5 border border-[#cbd3d8] bg-[#f2f5f6] p-6 sm:flex-row sm:items-center">
          <p className="max-w-3xl text-sm leading-6 text-[#53636c]">{t('analyzers.note')}</p>
          <a href="#contact" className="button-secondary shrink-0">
            {t('analyzers.cta')}
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
