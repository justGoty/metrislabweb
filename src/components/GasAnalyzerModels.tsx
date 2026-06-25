import { ArrowRight, BadgeCheck, SearchCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function GasAnalyzerModels() {
  const { t } = useTranslation();
  const headingRef = useScrollReveal();
  const gridRef = useScrollReveal();

  const models = [
    {
      name: t('analyzers.model1'),
      type: t('analyzers.type_stationary'),
      desc: t('analyzers.model1_desc'),
      image: '/images/gas-analyzers/mirax-atom.png',
      alt: 'Стационарный газоанализатор MIRAX SAFETY ATOM',
    },
    {
      name: t('analyzers.model2'),
      type: t('analyzers.type_stationary'),
      desc: t('analyzers.model2_desc'),
      image: '/images/gas-analyzers/stacom-sta-kd1-adobe.png',
      alt: 'Стационарный газоанализатор СТА-КД1',
    },
    {
      name: t('analyzers.model3'),
      type: t('analyzers.type_portable'),
      desc: t('analyzers.model3_desc'),
      image: '/images/gas-analyzers/kip-mg1.png',
      alt: 'Портативный газоанализатор КИП-МГ1',
    },
    {
      name: t('analyzers.model4'),
      type: t('analyzers.type_portable'),
      desc: t('analyzers.model4_desc'),
      image: '/images/gas-analyzers/kip-mg4-clean.png',
      alt: 'Портативный газоанализатор КИП-МГ4',
    },
  ];

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
          {models.map((model) => (
            <article
              key={model.name}
              className="group bg-[#f6fafd] border border-slate-100 rounded-lg overflow-hidden card-hover"
            >
              <div className="h-56 bg-white flex items-center justify-center p-6 border-b border-slate-100">
                <img
                  src={model.image}
                  alt={model.alt}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b3a5b] bg-white rounded-md px-2.5 py-1 mb-3">
                  <BadgeCheck size={14} className="text-[#ff8a00]" />
                  {model.type}
                </div>
                <h3 className="text-lg font-bold text-[#0b3a5b] mb-2">{model.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{model.desc}</p>
              </div>
            </article>
          ))}
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
