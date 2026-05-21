import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white py-16 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute -top-40 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 justify-between mb-12">
          <div className="max-w-xs">
            <Logo height={36} scheme="dark" className="opacity-90 mb-4" />
            <p className="text-slate-400 text-sm leading-relaxed">
              OOO "МэтрисЛаб" <br />
              ИНН 5012117115 <br />
              КПП 501201001
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <p className="text-slate-300 font-semibold">{t('footer.office')}</p>
              </div>
              <p className="text-slate-400 leading-relaxed">143982, Московская область, г Балашиха, мкр. Кучино, ул Гидрогородок, д. 15 к. 2</p>
            </div>
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <Phone size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <p className="text-slate-300 font-semibold">{t('footer.phone')}</p>
              </div>
              <a href="tel:+79775299213" className="text-slate-400 hover:text-white transition-colors">
                +7 (977) 529 92 13
              </a>
            </div>
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <Mail size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <p className="text-slate-300 font-semibold">{t('footer.email')}</p>
              </div>
              <a href="mailto:info@metrislab.ru" className="text-slate-400 hover:text-white transition-colors">
                info@metrislab.ru
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo height={28} scheme="dark" className="opacity-40" />
            <span className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} {t('footer.copyright')}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#about" className="hover:text-white transition-colors duration-300">{t('nav.about')}</a>
            <a href="#services" className="hover:text-white transition-colors duration-300">{t('nav.services')}</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300">{t('nav.contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
