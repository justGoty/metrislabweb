import { Activity, Boxes, Factory, FlaskConical, RadioTower, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function About() {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLDivElement>();
  const competence = [
    { icon: RadioTower, label: t('about.tech1_label'), value: t('about.tech1_value') },
    { icon: Activity, label: t('about.tech2_label'), value: t('about.tech2_value') },
    { icon: FlaskConical, label: t('about.tech3_label'), value: t('about.tech3_value') },
    { icon: ShieldCheck, label: t('about.tech4_label'), value: t('about.tech4_value') },
  ];

  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="section-kicker">{t('about.label')}</p>
            <h2 className="section-title mt-4">{t('about.headline')}</h2>
          </div>
          <div>
            <p className="max-w-3xl text-xl leading-8 text-[#27343b] sm:text-2xl sm:leading-9">{t('about.description1')}</p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#667780]">{t('about.description2')}</p>
          </div>
        </div>

        <div ref={ref} className="reveal-list mt-14 grid border-l border-t border-[#cbd3d8] sm:grid-cols-2 xl:grid-cols-4">
          {competence.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="min-h-48 border-b border-r border-[#cbd3d8] p-6 lg:p-7">
                <Icon size={24} className="text-[#0b4668]" strokeWidth={1.7} />
                <p className="mt-8 font-mono text-[11px] uppercase text-[#7c8c94]">{item.label}</p>
                <p className="mt-2 text-lg font-semibold leading-6 text-[#172027]">{item.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#cbd3d8] pt-6 text-sm text-[#53636c]">
          <span className="flex items-center gap-2"><Factory size={17} /> {t('about.audience1')}</span>
          <span className="flex items-center gap-2"><Boxes size={17} /> {t('about.audience2')}</span>
        </div>
      </div>
    </section>
  );
}
