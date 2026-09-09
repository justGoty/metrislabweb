import { ArrowDown, ArrowRight, FileCheck2, Gauge, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-[#172027] text-white">
      <img
        src="/images/lab/metrislab-hero.webp"
        alt={t('hero.image_alt')}
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[#0c171d]/25" />
      <div className="absolute inset-y-0 left-0 w-full bg-[#102129]/80 lg:w-[70%] xl:w-[65%]" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col px-5 pb-7 pt-28 sm:px-8 sm:pt-40 lg:min-h-[min(760px,calc(100svh-160px))] lg:justify-between lg:px-12 lg:pb-10 lg:pt-40">
        <div className="max-w-4xl">
          <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase text-[#dce4e7]">
            <span className="h-px w-10 bg-[#f28c18]" />
            {t('hero.badge')}
          </div>
          <h1 className="max-w-4xl text-[32px] font-semibold leading-[1.08] text-white max-[360px]:text-[28px] sm:text-5xl lg:text-[64px] xl:text-[72px]">
            {t('hero.headline')}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#e4eaed] sm:text-lg sm:leading-8">
            {t('hero.description')}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="button-primary">
              {t('hero.cta_primary')}
              <ArrowRight size={18} />
            </a>
            <a href="/catalog/" className="button-ghost-dark">
              {t('hero.cta_secondary')}
            </a>
          </div>
        </div>

        <div className="mt-8 grid border-t border-white/25 sm:grid-cols-3 lg:max-w-4xl">
          {[
            { icon: Gauge, label: t('hero.fact1') },
            { icon: Wrench, label: t('hero.fact2') },
            { icon: FileCheck2, label: t('hero.fact3') },
          ].map((fact) => {
            const Icon = fact.icon;
            return (
              <div key={fact.label} className="flex min-h-10 items-center gap-3 border-b border-white/25 py-2 text-xs font-medium sm:min-h-20 sm:pr-5 sm:text-sm">
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
