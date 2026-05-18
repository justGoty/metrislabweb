import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function About() {
  const { t } = useTranslation();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — image */}
          <div ref={leftRef} className="img-margin reveal-left flex justify-center lg:justify-end">
            <div className="rounded-2xl overflow-hidden aspect-square w-64 lg:w-72 mr-5">
              <img
                src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Precision laboratory equipment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right — text */}
          <div ref={rightRef} className="reveal-right flex flex-col gap-5">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                {t('about.label')}
              </p>
              <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                {t('about.headline')}{' '}
                <span className="text-blue-600">{t('about.highlight')}</span>
              </h2>
            </div>
            <p className="text-slate-500 leading-relaxed">
              {t('about.description1')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
