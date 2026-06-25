import { ArrowRight, ChevronDown, ClipboardCheck, Gauge, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f6fafd] pt-20">
      {/* Technical grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#0b3a5b 1px, transparent 1px), linear-gradient(90deg, #0b3a5b 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent" />
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
          <div className="hero-fade-left min-w-0" style={{ animationDelay: '80ms' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#1d9bf0]/20 rounded-lg text-[#0b3a5b] text-sm font-semibold mb-6 shadow-sm">
              <span className="relative w-2 h-2 bg-[#ff8a00] rounded-full pulse-ring" />
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0b3a5b] leading-tight mb-6 max-w-full [overflow-wrap:anywhere]">
              {t('hero.headline')}{' '}
              <span className="text-shimmer relative [overflow-wrap:anywhere]">
                {t('hero.subheading')}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff8a00] to-[#1d9bf0] rounded-full" />
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="btn-glow group inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff8a00] text-white font-semibold rounded-lg hover:bg-[#e67600] active:scale-95 transition-all shadow-lg shadow-orange-200/70"
              >
                {t('hero.cta_primary')}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#analyzers"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0b3a5b] font-semibold rounded-lg border border-[#1d9bf0]/20 hover:border-[#1d9bf0] hover:bg-[#1d9bf0]/5 active:scale-95 transition-all"
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
                  <p className="text-2xl font-bold text-[#0b3a5b] group-hover:text-[#ff8a00] transition-colors">{stat.value}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-fade-right hidden lg:flex items-center justify-center" style={{ animationDelay: '200ms' }}>
            <div className="relative w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow-xl shadow-slate-200/80 p-8 border border-[#1d9bf0]/15 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-sm text-slate-500">Сервисный маршрут</p>
                    <p className="text-xl font-bold text-[#0b3a5b]">Газоанализатор</p>
                  </div>
                  <Gauge size={36} className="text-[#ff8a00]" />
                </div>
                {[
                  { icon: ClipboardCheck, color: 'text-[#1d9bf0]', label: t('about.pillar1'), sub: t('about.pillar4'), bg: '#f6fafd' },
                  { icon: Wrench, color: 'text-[#ff8a00]', label: t('about.pillar2'), sub: t('about.pillar3'), bg: '#fff7ed' },
                  { icon: Gauge, color: 'text-[#0b3a5b]', label: t('about.pillar6'), sub: t('about.pillar5'), bg: '#eef8ff' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-sm cursor-default"
                    style={{ backgroundColor: item.bg, animationDelay: `${i * 100}ms` }}
                  >
                    <item.icon size={20} className={`${item.color} flex-shrink-0`} />
                    <div>
                      <p className="text-sm font-semibold text-[#0b3a5b]">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{t('hero.stat1_label')}</span>
                  <span className="text-sm font-bold text-[#ff8a00] counter-animate">{t('hero.stat1_value')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-fade-up" style={{ animationDelay: '800ms' }}>
        <a href="#about" className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#ff8a00] transition-colors">
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
