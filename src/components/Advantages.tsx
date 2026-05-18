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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div ref={leftRef} className="reveal-left">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              {t('advantages.label')}
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
              {t('advantages.headline')}{' '}
              <span className="text-blue-600">{t('advantages.highlight')}</span>
            </h2>

            <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden">
              {/* Decorative circle */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-blue-600/10 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-400/10 rounded-full" />
              <p className="relative text-6xl font-black text-blue-400 mb-2">
                {t('advantages.stat_value')}
              </p>
              <p className="relative text-slate-300 text-sm leading-relaxed">
                {t('advantages.stat_desc')}
              </p>
            </div>
          </div>

          <div ref={rightRef} className="stagger-children grid sm:grid-cols-2 gap-5">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
                    <Icon size={18} className="text-blue-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
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
