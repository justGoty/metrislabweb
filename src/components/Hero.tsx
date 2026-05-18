import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-white pt-20">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100/80 rounded-full blur-3xl -translate-x-1/4" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="mb-12 flex justify-center lg:justify-start hero-fade-up" style={{ animationDelay: '0ms' }}>
          <img src="/metrislogo.svg" alt="Metris Lab" className="h-20 w-auto" />
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="hero-fade-left" style={{ animationDelay: '80ms' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {t('hero.badge')}
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              {t('hero.headline')}{' '}
              <span className="text-blue-600 relative">
                {t('hero.subheading')}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-200 rounded-full" />
              </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
              >
                {t('hero.cta_primary')}
                <ArrowRight size={18} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all"
              >
                {t('hero.cta_secondary')}
              </a>
            </div>

            <div className="hero-fade-up mt-14 flex flex-wrap gap-10" style={{ animationDelay: '300ms' }}>
              {[
                { value: t('hero.stat1_value'), label: t('hero.stat1_label') },
                { value: t('hero.stat2_value'), label: t('hero.stat2_label') },
                { value: t('hero.stat3_value'), label: t('hero.stat3_label') },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-fade-right hidden lg:flex items-center justify-center" style={{ animationDelay: '200ms' }}>
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 p-8 border border-slate-100 space-y-4">
                {[
                  { color: 'bg-blue-600', label: 'ISO/IEC 17025', sub: t('about.pillar1'), bg: '#eff6ff' },
                  { color: 'bg-emerald-600', label: 'ГОСТ/NIST', sub: t('about.pillar2'), bg: '#ecfdf5' },
                  { color: 'bg-amber-500', label: 'GUM', sub: t('about.pillar4'), bg: '#fffbeb' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-xl transition-transform hover:-translate-y-0.5 duration-200"
                    style={{ backgroundColor: item.bg }}
                  >
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{t('hero.stat1_label')}</span>
                  <span className="text-sm font-bold text-blue-600">{t('hero.stat1_value')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
