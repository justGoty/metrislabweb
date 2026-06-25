import { HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function FAQ() {
  const { t } = useTranslation();
  const headingRef = useScrollReveal();
  const listRef = useScrollReveal();

  const items = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
  ];

  return (
    <section id="faq" className="py-24 bg-white overflow-hidden">
      <div className="section-divider max-w-4xl mx-auto mb-20" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div ref={headingRef} className="reveal-up text-center max-w-3xl mx-auto mb-14">
          <p className="text-[#ff8a00] font-semibold text-sm uppercase mb-3">
            {t('faq.label')}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            {t('faq.headline')}
          </h2>
        </div>

        <div ref={listRef} className="stagger-children grid gap-4">
          {items.map((item) => (
            <div key={item.q} className="bg-[#f6fafd] border border-slate-100 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-white text-[#ff8a00] flex items-center justify-center flex-shrink-0">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0b3a5b] mb-2">{item.q}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
