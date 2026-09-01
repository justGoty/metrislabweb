import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

export default function Footer() {
  const { t } = useTranslation();
  const isHomePage = window.location.pathname.replace(/\/+$/, '') === '';
  const homeHref = (anchor: string) => (isHomePage ? anchor : `/${anchor}`);

  return (
    <footer className="bg-[#172027] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.1fr_0.8fr_1fr]">
          <div>
            <Logo height={43} scheme="dark" />
            <p className="mt-6 max-w-md text-sm leading-7 text-[#b9c5cb]">{t('footer.summary')}</p>
            <a href={homeHref('#contact')} className="link-arrow mt-7 text-white">
              {t('nav.cta')}
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase text-[#82949e]">{t('footer.services')}</p>
            <nav className="mt-5 flex flex-col gap-3 text-sm text-[#d7e0e4]">
              <a href={homeHref('#services')} className="hover:text-white">{t('footer.service1')}</a>
              <a href={homeHref('#services')} className="hover:text-white">{t('footer.service2')}</a>
              <a href={homeHref('#services')} className="hover:text-white">{t('footer.service3')}</a>
              <a href="/catalog" className="hover:text-white">{t('nav.catalog')}</a>
            </nav>
          </div>

          <address className="not-italic">
            <p className="font-mono text-[10px] uppercase text-[#82949e]">{t('footer.contacts')}</p>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#d7e0e4]">
              <a href="tel:+79060799144" className="flex gap-3 hover:text-white"><Phone size={16} className="mt-1 shrink-0 text-[#f28c18]" /> +7 906 079 91 44</a>
              <a href="mailto:info@metrislab.ru" className="flex gap-3 hover:text-white"><Mail size={16} className="mt-1 shrink-0 text-[#f28c18]" /> info@metrislab.ru</a>
              <p className="flex gap-3"><MapPin size={16} className="mt-1 shrink-0 text-[#f28c18]" /> 143982, Московская область, г. Балашиха, мкр. Кучино, ул. Гидрогородок, д. 15, к. 2</p>
            </div>
          </address>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-xs text-[#82949e] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p>ООО «МэтрисЛаб» · ИНН 5012117115 · КПП 501201001</p>
            <p className="mt-2">© {new Date().getFullYear()} {t('footer.copyright')}</p>
          </div>
          <p className="max-w-xl leading-5 sm:text-right">{t('footer.legal')}</p>
        </div>
      </div>
    </footer>
  );
}
