import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const isHomePage = window.location.pathname === '/';
  const homeHref = (anchor: string) => (isHomePage ? anchor : `/${anchor}`);

  return (
    <footer className="bg-[#0b3a5b] text-white py-16 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#ff8a00]/70 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr_1.2fr] gap-10 mb-12">
          <div>
            <Logo height={36} scheme="dark" className="opacity-90 mb-4" />
            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              Поверка, диагностика, калибровка и ремонт газоанализаторов для предприятий, лабораторий и служб промышленной безопасности.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              OOO "МэтрисЛаб" <br />
              ИНН 5012117115 <br />
              КПП 501201001
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 text-sm">
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-[#ff8a00] group-hover:scale-110 transition-transform" />
                <p className="text-slate-300 font-semibold">{t('footer.office')}</p>
              </div>
              <p className="text-slate-400 leading-relaxed">143982, Московская область, г Балашиха, мкр. Кучино, ул Гидрогородок, д. 15 к. 2</p>
            </div>
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <Phone size={14} className="text-[#ff8a00] group-hover:scale-110 transition-transform" />
                <p className="text-slate-300 font-semibold">{t('footer.phone')}</p>
              </div>
              <a href="tel:+79775299213" className="text-slate-400 hover:text-white transition-colors">
                +7 (977) 529 92 13
              </a>
            </div>
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <Mail size={14} className="text-[#ff8a00] group-hover:scale-110 transition-transform" />
                <p className="text-slate-300 font-semibold">{t('footer.email')}</p>
              </div>
              <a href="mailto:info@metrislab.ru" className="text-slate-400 hover:text-white transition-colors">
                info@metrislab.ru
              </a>
            </div>
          </div>
          <div>
            <p className="text-slate-300 font-semibold mb-4">{t('footer.services')}</p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[t('footer.service1'), t('footer.service2'), t('footer.service3'), t('footer.service4')].map((item) => (
                <a key={item} href={homeHref('#services')} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowRight size={14} className="text-[#ff8a00] group-hover:translate-x-1 transition-transform" />
                  {item}
                </a>
              ))}
            </div>
            <a
              href={homeHref('#contact')}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-[#ff8a00] text-white text-sm font-semibold rounded-lg hover:bg-[#e67600] transition-colors"
            >
              {t('nav.cta')}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo height={28} scheme="dark" className="opacity-40" />
            <span className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} {t('footer.copyright')}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href={homeHref('#about')} className="hover:text-white transition-colors duration-300">{t('nav.about')}</a>
            <a href="/catalog" className="hover:text-white transition-colors duration-300">{t('nav.catalog')}</a>
            <a href={homeHref('#services')} className="hover:text-white transition-colors duration-300">{t('nav.services')}</a>
            <a href={homeHref('#faq')} className="hover:text-white transition-colors duration-300">{t('faq.label')}</a>
            <a href={homeHref('#contact')} className="hover:text-white transition-colors duration-300">{t('nav.contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
