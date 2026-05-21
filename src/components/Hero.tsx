import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-white pt-20">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl translate-x-1/3 animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100/80 rounded-full blur-3xl -translate-x-1/4 animate-float" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle-1 absolute top-[20%] left-[15%] w-2 h-2 bg-blue-400/40 rounded-full" />
        <div className="particle-2 absolute top-[60%] left-[80%] w-3 h-3 bg-blue-300/30 rounded-full" />
        <div className="particle-3 absolute top-[40%] left-[60%] w-1.5 h-1.5 bg-sky-400/40 rounded-full" />
        <div className="particle-1 absolute top-[70%] left-[25%] w-2.5 h-2.5 bg-blue-500/20 rounded-full" style={{ animationDelay: '3s' }} />
        <div className="particle-2 absolute top-[30%] left-[45%] w-2 h-2 bg-sky-300/30 rounded-full" style={{ animationDelay: '5s' }} />
        <div className="particle-3 absolute top-[80%] left-[70%] w-1.5 h-1.5 bg-blue-400/25 rounded-full" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="mb-12 flex justify-center lg:justify-start hero-fade-up" style={{ animationDelay: '0ms' }}>
          <Logo height={60} scheme="light" />
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="hero-fade-left" style={{ animationDelay: '80ms' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              <span className="relative w-2 h-2 bg-blue-500 rounded-full pulse-ring" />
              {t('hero.badge')}
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              {t('hero.headline')}{' '}
              <span className="text-shimmer relative">
                {t('hero.subheading')}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full" />
              </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200/60"
              >
                {t('hero.cta_primary')}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 active:scale-95 transition-all"
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
                <div key={stat.label} className="group cursor-default">
                  <p className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-fade-right hidden lg:flex items-center justify-center" style={{ animationDelay: '200ms' }}>
            <div className="relative w-full max-w-md">
              {/* Decorative ring behind the card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100/50 to-sky-100/30 rounded-[2rem] blur-xl animate-float-slow" />
              <div className="relative bg-white rounded-3xl shadow-xl shadow-slate-200/80 p-8 border border-slate-100 space-y-4">
                {[
                  { color: 'bg-blue-600', label: 'ISO/IEC 17025', sub: t('about.pillar1'), bg: '#eff6ff' },
                  { color: 'bg-emerald-600', label: 'GOST/NIST', sub: t('about.pillar2'), bg: '#ecfdf5' },
                  { color: 'bg-amber-500', label: 'GUM', sub: t('about.pillar4'), bg: '#fffbeb' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-sm cursor-default"
                    style={{ backgroundColor: item.bg, animationDelay: `${i * 100}ms` }}
                  >
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color} animate-pulse`} />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{t('hero.stat1_label')}</span>
                  <span className="text-sm font-bold text-blue-600 counter-animate">{t('hero.stat1_value')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-fade-up" style={{ animationDelay: '800ms' }}>
        <a href="#about" className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors">
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
