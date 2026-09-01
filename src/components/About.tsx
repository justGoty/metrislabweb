import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function About() {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLDListElement>();
  const competence = [
    { label: t('about.tech1_label'), value: t('about.tech1_value') },
    { label: t('about.tech2_label'), value: t('about.tech2_value') },
    { label: t('about.tech3_label'), value: t('about.tech3_value') },
    { label: t('about.tech4_label'), value: t('about.tech4_value') },
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

        <dl ref={ref} className="reveal-list mt-14 grid border-l border-t border-[#cbd3d8] sm:grid-cols-2 xl:grid-cols-4">
          {competence.map((item, index) => (
            <div key={item.label} className="min-h-36 border-b border-r border-[#cbd3d8] p-6 lg:p-7">
              <div className="flex items-center justify-between gap-4">
                <dt className="font-mono text-[11px] uppercase text-[#53636c]">{item.label}</dt>
                <span className="font-mono text-[11px] text-[#0b4668]" aria-hidden="true">0{index + 1}</span>
              </div>
              <dd className="mt-6 text-lg font-semibold leading-6 text-[#172027]">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#cbd3d8] pt-6 text-sm text-[#53636c]">
          <span>{t('about.audience1')}</span>
          <span>{t('about.audience2')}</span>
        </div>
      </div>
    </section>
  );
}
