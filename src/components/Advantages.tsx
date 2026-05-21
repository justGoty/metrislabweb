import { Target, Shield, Zap, Award, FileText, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';
import { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target * 10) / 10);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toFixed(1)}{suffix}</span>;
}

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
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              {t('advantages.label')}
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
              {t('advantages.headline')}{' '}
              <span className="text-blue-600">{t('advantages.highlight')}</span>
            </h2>

            <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden group cursor-default">
              {/* Decorative animated circles */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-blue-600/10 rounded-full group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-400/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/40 rounded-full particle-2" />

              <p className="relative text-6xl font-black text-blue-400 mb-2">
                <AnimatedCounter target={99.8} suffix="%" />
              </p>
              <p className="relative text-slate-300 text-sm leading-relaxed">
                {t('advantages.stat_desc')}
              </p>

              {/* Progress bar visual */}
              <div className="relative mt-4 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-[99.8%] bg-gradient-to-r from-blue-500 to-sky-400 rounded-full" />
              </div>
            </div>
          </div>

          <div ref={rightRef} className="stagger-children grid sm:grid-cols-2 gap-5">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group p-4 rounded-xl hover:bg-slate-50 transition-all duration-300 cursor-default">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon size={18} className="text-blue-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">{item.title}</h3>
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
