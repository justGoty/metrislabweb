import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
  const { t } = useTranslation();
  const items = [1, 2, 3, 4, 5].map((index) => ({
    q: t(`faq.q${index}`),
    a: t(`faq.a${index}`),
  }));

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <p className="section-kicker">{t('faq.label')}</p>
            <h2 className="section-title mt-4">{t('faq.headline')}</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#667780]">{t('faq.description')}</p>
          </div>

          <div className="border-t border-[#aebbc1]">
            {items.map((item, index) => (
              <details key={item.q} className="faq-row group border-b border-[#aebbc1]">
                <summary className="flex min-h-24 cursor-pointer list-none items-center gap-4 py-5">
                  <span className="font-mono text-[11px] text-[#7c8c94]">0{index + 1}</span>
                  <span className="flex-1 text-base font-semibold leading-6 text-[#172027] sm:text-lg">{item.q}</span>
                  <Plus size={20} className="faq-plus shrink-0 text-[#0b4668] transition-transform" />
                </summary>
                <p className="pb-7 pl-10 pr-10 text-sm leading-7 text-[#53636c] sm:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
