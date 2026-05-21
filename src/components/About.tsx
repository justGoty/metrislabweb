import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function About() {
  const { t } = useTranslation();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      {/* Section divider */}
      <div className="section-divider max-w-4xl mx-auto mb-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — image with decorative elements */}
          <div ref={leftRef} className="reveal-left flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative shapes */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100/60 rounded-2xl animate-float-slow" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-blue-200/40 rounded-2xl animate-float" />
              <div className="absolute top-1/2 -right-3 w-6 h-6 bg-blue-500/20 rounded-full particle-1" />

              <div className="relative rounded-2xl overflow-hidden aspect-square w-64 lg:w-80 shadow-2xl shadow-slate-200/60">
                <img
                  src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Precision laboratory equipment"
                  className="w-full h-full object-cover img-parallax"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>

              {/* Badge floating */}
              <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg px-4 py-3 border border-slate-100 animate-float">
                <p className="text-2xl font-black text-blue-600">{t('about.badge_value')}</p>
                <p className="text-xs text-slate-500 font-medium">{t('about.badge_label')}</p>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div ref={rightRef} className="reveal-right flex flex-col gap-6">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                {t('about.label')}
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {t('about.headline')}{' '}
                <span className="text-blue-600">{t('about.highlight')}</span>
              </h2>
            </div>
            <p className="text-slate-500 leading-relaxed text-lg">
              {t('about.description1')}
            </p>

            {/* Technical specs grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                { label: t('about.tech1_label'), value: t('about.tech1_value') },
                { label: t('about.tech2_label'), value: t('about.tech2_value') },
                { label: t('about.tech3_label'), value: t('about.tech3_value') },
                { label: t('about.tech4_label'), value: t('about.tech4_value') },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="group p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300 cursor-default"
                >
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">{spec.label}</p>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
