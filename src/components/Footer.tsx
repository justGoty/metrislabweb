import { useTranslation } from 'react-i18next';
import Logo from './Logo';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 justify-between mb-12">
          <div className="max-w-xs">
            <Logo height={36} scheme="dark" className="opacity-90 mb-4" />
            <p className="text-slate-400 text-sm leading-relaxed">
              ООО "МэтрисЛаб" <br></br>
              ИНН 5012117115 <br></br>
              КПП 501201001 
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-slate-300 font-semibold mb-3">{t('footer.office')}</p>
              <p className="text-slate-400">143982, Московская область, г Балашиха, мкр. Кучино, ул Гидрогородок, д. 15 к. 2 </p>
            </div>
            <div>
              <p className="text-slate-300 font-semibold mb-3">{t('footer.phone')}</p>
              <a href="tel:+74951234567" className="text-slate-400 hover:text-white transition-colors">
                +7 (977) 529 92 13
              </a>
            </div>
            <div>
              <p className="text-slate-300 font-semibold mb-3">{t('footer.email')}</p>
              <a href="mailto:info@metrislab.ru" className="text-slate-400 hover:text-white transition-colors">
                info@metrislab.ru
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo height={28} scheme="dark" className="opacity-40" />
            <span className="text-slate-500 text-sm">© {new Date().getFullYear()} {t('footer.copyright')}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#about" className="hover:text-slate-300 transition-colors">{t('nav.about')}</a>
            <a href="#services" className="hover:text-slate-300 transition-colors">{t('nav.services')}</a>
            <a href="#contact" className="hover:text-slate-300 transition-colors">{t('nav.contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
