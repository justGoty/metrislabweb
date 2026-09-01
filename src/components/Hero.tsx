import { ArrowDown, ArrowRight, FileCheck2, Gauge, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[720px] overflow-hidden bg-[#172027] text-white lg:min-h-[calc(100svh-24px)]">
      <img
        src="/images/lab/metrislab-hero.webp"
        alt={t('hero.image_alt')}
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[#0c171d]/55" />
      <div className="absolute inset-y-0 left-0 w-full bg-[#102129]/78 lg:w-[68%] xl:w-[61%]" />

      <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] flex-col justify-between px-5 pb-8 pt-36 sm:px-8 lg:min-h-[calc(100svh-24px)] lg:px-12 lg:pb-10 lg:pt-44">
        <div className="max-w-4xl">
          <div className="hero-enter mb-7 flex items-center gap-3 text-xs font-semibold uppercase text-[#dce4e7]">
            <span className="h-px w-10 bg-[#f28c18]" />
            {t('hero.badge')}
          </div>
          <h1 className="hero-enter max-w-4xl text-[clamp(2.15rem,6.6vw,6.5rem)] font-semibold leading-[0.96] text-white" style={{ animationDelay: '80ms' }}>
            {t('hero.headline')}
          </h1>
          <p className="hero-enter mt-7 max-w-2xl text-base leading-7 text-[#e4eaed] sm:text-lg sm:leading-8" style={{ animationDelay: '160ms' }}>
            {t('hero.description')}
          </p>
          <div className="hero-enter mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '240ms' }}>
            <a href="#contact" className="button-primary">
              {t('hero.cta_primary')}
              <ArrowRight size={18} />
            </a>
            <a href="/catalog" className="button-ghost-dark">
              {t('hero.cta_secondary')}
            </a>
          </div>
        </div>

        <div className="mt-14 grid border-l border-t border-white/25 sm:grid-cols-3 lg:max-w-4xl">
          {[
            { icon: Gauge, label: t('hero.fact1') },
            { icon: Wrench, label: t('hero.fact2') },
            { icon: FileCheck2, label: t('hero.fact3') },
          ].map((fact) => {
            const Icon = fact.icon;
            return (
              <div key={fact.label} className="flex min-h-20 items-center gap-3 border-b border-r border-white/25 bg-[#102129]/65 px-4 py-4 text-sm font-medium backdrop-blur-sm sm:min-h-24 sm:px-5">
                <Icon size={20} className="shrink-0 text-[#f28c18]" strokeWidth={1.8} />
                <span>{fact.label}</span>
              </div>
            );
          })}
        </div>

        <a href="#about" className="absolute bottom-10 right-5 hidden items-center gap-2 text-xs font-semibold uppercase text-white/80 lg:flex lg:right-12">
          {t('hero.scroll')}
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}
