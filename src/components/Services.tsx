import { Gauge, Activity, Truck, ClipboardCheck, TriangleAlert as AlertTriangle, GraduationCap, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function Services() {
  const { t } = useTranslation();
  const headingRef = useScrollReveal();
  const gridRef = useScrollReveal();

  const services = [
    { icon: Gauge, title: t('services.s1_title'), desc: t('services.s1_desc'), gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-600' },
    { icon: Activity, title: t('services.s2_title'), desc: t('services.s2_desc'), gradient: 'from-sky-500 to-sky-600', bg: 'bg-sky-50', text: 'text-sky-600' },
    { icon: Truck, title: t('services.s3_title'), desc: t('services.s3_desc'), gradient: 'from-teal-500 to-teal-600', bg: 'bg-teal-50', text: 'text-teal-600' },
    { icon: ClipboardCheck, title: t('services.s4_title'), desc: t('services.s4_desc'), gradient: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { icon: AlertTriangle, title: t('services.s5_title'), desc: t('services.s5_desc'), gradient: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', text: 'text-amber-600' },
    { icon: GraduationCap, title: t('services.s6_title'), desc: t('services.s6_desc'), gradient: 'from-slate-500 to-slate-600', bg: 'bg-slate-100', text: 'text-slate-600' },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 overflow-hidden relative">
      {/* Background decorative pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headingRef} className="reveal-up text-center max-w-2xl mx-auto mb-16">
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
                className="group gradient-border card-hover bg-white rounded-2xl p-7 border border-slate-100 cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${svc.bg} ${svc.text} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">{svc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{svc.desc}</p>
                {/* Arrow indicator on hover */}
                <div className="mt-4 flex items-center gap-1 text-blue-600 text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="btn-glow inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200/60"
          >
            {t('services.cta')}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
