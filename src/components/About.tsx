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
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f6fafd] rounded-lg animate-float-slow" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#ff8a00]/30 rounded-lg animate-float" />

              <div className="relative rounded-lg overflow-hidden aspect-[4/3] w-full max-w-sm lg:max-w-[420px] shadow-2xl shadow-slate-200/60">
                <img
                  src="/images/gas-analyzer-service-lab.png"
                  alt="Поверка и диагностика газоанализатора в сервисной лаборатории"
                  className="w-full h-full object-cover img-parallax"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b3a5b]/35 to-transparent" />
              </div>

              {/* Badge floating */}
              <div className="absolute -bottom-3 -left-3 bg-white rounded-lg shadow-lg px-4 py-3 border border-slate-100 animate-float">
                <p className="text-2xl font-black text-[#ff8a00]">{t('about.badge_value')}</p>
                <p className="text-xs text-slate-500 font-medium">{t('about.badge_label')}</p>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div ref={rightRef} className="reveal-right flex flex-col gap-6">
            <div>
              <p className="text-[#ff8a00] font-semibold text-sm uppercase mb-3">
                {t('about.label')}
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {t('about.headline')}{' '}
                <span className="text-[#0b3a5b]">{t('about.highlight')}</span>
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
                  className="group p-4 bg-[#f6fafd] rounded-lg border border-slate-100 hover:border-[#1d9bf0]/40 hover:bg-white transition-all duration-300 cursor-default"
                >
                  <p className="text-xs text-slate-400 font-medium uppercase mb-1">{spec.label}</p>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-[#ff8a00] transition-colors">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
