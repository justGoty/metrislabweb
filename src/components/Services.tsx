import { ArrowRight, ClipboardCheck, Gauge, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function Services() {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLDivElement>();
  const services = [
    { icon: ClipboardCheck, code: '01', title: t('services.s1_title'), desc: t('services.s1_desc'), result: t('services.s1_result') },
    { icon: Wrench, code: '02', title: t('services.s2_title'), desc: t('services.s2_desc'), result: t('services.s2_result') },
    { icon: Gauge, code: '03', title: t('services.s3_title'), desc: t('services.s3_desc'), result: t('services.s3_result') },
  ];

  return (
    <section id="services" className="border-t border-[#cbd3d8] bg-[#f2f5f6] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="section-kicker">{t('services.label')}</p>
            <h2 className="section-title mt-4">{t('services.headline')}</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[#53636c] lg:justify-self-end">{t('services.description')}</p>
        </div>

        <div ref={ref} className="reveal-list mt-14 grid border-l border-t border-[#bfc9ce] lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="group flex min-h-[420px] flex-col border-b border-r border-[#bfc9ce] bg-white p-7 transition-colors hover:bg-[#fbfcfc] lg:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#7c8c94]">{service.code} / 03</span>
                  <Icon size={26} className="text-[#0b4668]" strokeWidth={1.6} />
                </div>
                <h3 className="mt-16 max-w-xs text-2xl font-semibold leading-tight text-[#172027]">{service.title}</h3>
                <p className="mt-5 text-sm leading-6 text-[#667780]">{service.desc}</p>
                <div className="mt-auto border-t border-[#d8dfe2] pt-5">
                  <p className="font-mono text-[10px] uppercase text-[#7c8c94]">{t('services.result_label')}</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#27343b]">{service.result}</p>
                </div>
              </article>
            );
          })}
        </div>

        <a href="#contact" className="button-primary mt-8">
          {t('services.cta')}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
