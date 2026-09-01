import { ArrowRight, CircleCheck, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function Laboratory() {
  const { t } = useTranslation();
  const imageRef = useScrollReveal<HTMLDivElement>();
  const textRef = useScrollReveal<HTMLDivElement>();

  const points = [t('laboratory.point1'), t('laboratory.point2'), t('laboratory.point3')];

  return (
    <section id="laboratory" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-stretch gap-0 border border-[#cbd3d8] lg:grid-cols-[1.25fr_0.75fr]">
          <div ref={imageRef} className="reveal-clip relative min-h-[360px] overflow-hidden lg:min-h-[650px]">
            <img
              src="/images/lab/metrislab-workshop.webp"
              alt={t('laboratory.image_alt')}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 flex items-center gap-2 bg-[#172027] px-4 py-3 text-xs font-medium text-white">
              <MapPin size={15} className="text-[#f28c18]" />
              {t('laboratory.location')}
            </div>
          </div>

          <div ref={textRef} className="reveal-up flex flex-col justify-between bg-[#f2f5f6] p-7 sm:p-10 lg:p-12 xl:p-16">
            <div>
              <p className="section-kicker">{t('laboratory.label')}</p>
              <h2 className="section-title mt-4">{t('laboratory.title')}</h2>
              <p className="mt-6 text-base leading-7 text-[#53636c]">{t('laboratory.description')}</p>
            </div>
            <div className="mt-10 border-t border-[#cbd3d8] pt-7">
              <ul className="space-y-5">
                {points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-[#27343b]">
                    <CircleCheck size={19} className="mt-0.5 shrink-0 text-[#277a57]" />
                    {point}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="link-arrow mt-9">
                {t('laboratory.cta')}
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
