import { Gauge, Activity, Truck, ClipboardCheck, TriangleAlert as AlertTriangle, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function Services() {
  const { t } = useTranslation();
  const headingRef = useScrollReveal();
  const gridRef = useScrollReveal();

  const services = [
    { icon: Gauge, title: t('services.s1_title'), desc: t('services.s1_desc'), color: 'bg-blue-50 text-blue-600' },
    { icon: Activity, title: t('services.s2_title'), desc: t('services.s2_desc'), color: 'bg-sky-50 text-sky-600' },
    { icon: Truck, title: t('services.s3_title'), desc: t('services.s3_desc'), color: 'bg-teal-50 text-teal-600' },
    { icon: ClipboardCheck, title: t('services.s4_title'), desc: t('services.s4_desc'), color: 'bg-emerald-50 text-emerald-600' },
    { icon: AlertTriangle, title: t('services.s5_title'), desc: t('services.s5_desc'), color: 'bg-amber-50 text-amber-600' },
    { icon: GraduationCap, title: t('services.s6_title'), desc: t('services.s6_desc'), color: 'bg-slate-50 text-slate-600' },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headingRef} className="reveal-up text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            {t('services.label')}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5">
            {t('services.headline')}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        <div ref={gridRef} className="stagger-children grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${svc.color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">{svc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
          >
            {t('services.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
