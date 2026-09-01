import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Globe2, Mail, Menu, Phone, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const isHomePage = window.location.pathname.replace(/\/+$/, '') === '';
  const homeHref = (anchor: string) => (isHomePage ? anchor : `/${anchor}`);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    if (!mobileOpen) return () => { document.body.style.overflow = ''; };

    const panel = mobilePanelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        requestAnimationFrame(() => mobileButtonRef.current?.focus());
        return;
      }

      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [langOpen]);

  const links = [
    { label: t('nav.services'), href: homeHref('#services') },
    { label: t('nav.process'), href: homeHref('#process') },
    { label: t('nav.laboratory'), href: homeHref('#laboratory') },
    { label: t('nav.catalog'), href: '/catalog' },
    { label: t('faq.label'), href: homeHref('#faq') },
  ];

  const selectLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLangOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#cbd3d8] bg-white">
      <div className="hidden h-8 bg-[#172027] text-white sm:block">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-8 text-[11px] lg:px-12">
          <span className="font-medium text-[#d7e0e4]">{t('nav.utility')}</span>
          <div className="flex items-center gap-6">
            <a href="mailto:info@metrislab.ru" className="flex items-center gap-1.5 text-[#d7e0e4] hover:text-white">
              <Mail size={12} /> info@metrislab.ru
            </a>
            <a href="tel:+79060799144" className="flex items-center gap-1.5 font-semibold text-white">
              <Phone size={12} /> +7 906 079 91 44
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="/" aria-label={t('nav.home_label')} className="shrink-0">
          <Logo height={42} scheme="light" />
        </a>

        <nav className="hidden items-center gap-6 xl:flex" aria-label={t('nav.main_label')}>
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
          ))}

          <div className="relative">
            <button
              type="button"
              className="nav-link flex items-center gap-1.5"
              aria-haspopup="menu"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((open) => !open)}
            >
              <Globe2 size={15} />
              {i18n.language.slice(0, 2).toUpperCase()}
              <ChevronDown size={13} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-9 min-w-32 border border-[#cbd3d8] bg-white py-1 shadow-lg" role="menu">
                <button type="button" role="menuitem" onClick={() => selectLanguage('ru')} className="block w-full px-4 py-2 text-left text-sm hover:bg-[#f2f5f6]">Русский</button>
                <button type="button" role="menuitem" onClick={() => selectLanguage('en')} className="block w-full px-4 py-2 text-left text-sm hover:bg-[#f2f5f6]">English</button>
              </div>
            )}
          </div>

          <a href={homeHref('#contact')} className="button-primary min-h-10 px-4 py-2 text-xs">
            {t('nav.cta')}
          </a>
        </nav>

        <button
          ref={mobileButtonRef}
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? t('nav.close_menu') : t('nav.open_menu')}
          className="icon-button xl:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div ref={mobilePanelRef} role="dialog" aria-modal="true" aria-label={t('nav.mobile_label')} className="fixed inset-x-0 bottom-0 top-[76px] overflow-y-auto bg-white p-5 sm:top-[108px] sm:p-8 xl:hidden">
          <nav className="flex flex-col border-t border-[#cbd3d8]" aria-label={t('nav.mobile_label')}>
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="border-b border-[#cbd3d8] py-5 text-xl font-semibold text-[#172027]">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 grid gap-3">
            <a href="tel:+79060799144" className="button-secondary justify-start"><Phone size={17} /> +7 906 079 91 44</a>
            <a href={homeHref('#contact')} onClick={() => setMobileOpen(false)} className="button-primary">{t('nav.cta')}</a>
          </div>
          <div className="mt-8 flex gap-2">
            <button type="button" onClick={() => selectLanguage('ru')} className="button-small">RU</button>
            <button type="button" onClick={() => selectLanguage('en')} className="button-small">EN</button>
          </div>
        </div>
      )}
    </header>
  );
}
