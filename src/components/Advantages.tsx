import { Target, Shield, Zap, Award, FileText, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';
export default function Advantages() {
  const { t } = useTranslation();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  const items = [
    { icon: Target, title: t('advantages.a1_title'), desc: t('advantages.a1_desc') },
    { icon: Shield, title: t('advantages.a2_title'), desc: t('advantages.a2_desc') },
    { icon: Zap, title: t('advantages.a3_title'), desc: t('advantages.a3_desc') },
    { icon: Award, title: t('advantages.a4_title'), desc: t('advantages.a4_desc') },
    { icon: FileText, title: t('advantages.a5_title'), desc: t('advantages.a5_desc') },
    { icon: Calendar, title: t('advantages.a6_title'), desc: t('advantages.a6_desc') },
  ];

  return (
    <section id="advantages" className="py-24 bg-white overflow-hidden">
      {/* Section divider */}
      <div className="section-divider max-w-4xl mx-auto mb-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div ref={leftRef} className="reveal-left">
            <p className="text-[#ff8a00] font-semibold text-sm uppercase mb-3">
              {t('advantages.label')}
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
              {t('advantages.headline')}{' '}
              <span className="text-[#0b3a5b]">{t('advantages.highlight')}</span>
            </h2>

            <div className="bg-[#0b3a5b] text-white rounded-lg p-8 relative overflow-hidden group cursor-default shadow-xl shadow-slate-200/50">
              {/* Decorative animated circles */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff8a00] to-[#1d9bf0]" />

              <p className="relative text-7xl font-black text-[#ff8a00] mb-4 leading-none">
                {t('advantages.stat_value')}
              </p>
              <p className="relative text-white text-base leading-7 font-medium max-w-lg">
                {t('advantages.stat_desc')}
              </p>

              {/* Progress bar visual */}
              <div className="relative mt-6 h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#ff8a00] to-[#1d9bf0] rounded-full" />
              </div>
            </div>
          </div>

          <div ref={rightRef} className="stagger-children grid sm:grid-cols-2 gap-5">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group p-4 rounded-lg hover:bg-[#f6fafd] transition-all duration-300 cursor-default">
                  <div className="w-10 h-10 bg-[#eef8ff] rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon size={18} className="text-[#0b3a5b] group-hover:text-[#ff8a00]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-[#0b3a5b] transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
