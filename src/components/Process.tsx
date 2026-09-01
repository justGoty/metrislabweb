import { ArrowDown, Box, ClipboardCheck, FileCheck2, ScanSearch, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function Process() {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLOListElement>();
  const steps = [
    { icon: Box, title: t('process.step1_title'), text: t('process.step1_text') },
    { icon: ScanSearch, title: t('process.step2_title'), text: t('process.step2_text') },
    { icon: Wrench, title: t('process.step3_title'), text: t('process.step3_text') },
    { icon: ClipboardCheck, title: t('process.step4_title'), text: t('process.step4_text') },
    { icon: FileCheck2, title: t('process.step5_title'), text: t('process.step5_text') },
  ];

  return (
    <section id="process" className="border-y border-[#cbd3d8] bg-[#172027] py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.55fr] lg:gap-20">
          <div>
            <p className="section-kicker text-[#f28c18]">{t('process.label')}</p>
            <h2 className="section-title mt-4 max-w-xl text-white">{t('process.title')}</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#cbd3d8]">{t('process.description')}</p>
            <a href="#contact" className="link-arrow mt-8 text-white">
              {t('process.cta')}
              <ArrowDown size={17} />
            </a>
          </div>

          <ol ref={ref} className="reveal-list divide-y divide-white/15 border-y border-white/15">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="grid gap-5 py-6 sm:grid-cols-[52px_56px_1fr] sm:items-start lg:py-7">
                  <span className="font-mono text-xs text-[#8ba0ac]">0{index + 1}</span>
                  <Icon size={24} className="text-[#f28c18]" strokeWidth={1.7} />
                  <div className="grid gap-2 xl:grid-cols-[minmax(180px,0.7fr)_1.3fr] xl:gap-8">
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm leading-6 text-[#b9c5cb]">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
