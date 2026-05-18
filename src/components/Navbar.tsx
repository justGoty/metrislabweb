import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.advantages'), href: '#advantages' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center flex-shrink-0">
            <img src="/metrislogo.svg" alt="Metris Lab" className="h-16 w-auto" />
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  scrolled ? 'text-slate-700' : 'text-slate-800'
                }`}
              >
                {l.label}
              </a>
            ))}

            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                onBlur={() => setTimeout(() => setLangOpen(false), 150)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-800 hover:bg-white/20'
                }`}
              >
                <Globe size={15} />
                <span className="uppercase">{i18n.language.slice(0, 2)}</span>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 min-w-[110px]">
                  {['en', 'ru'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { i18n.changeLanguage(lang); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        i18n.language.startsWith(lang)
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {lang === 'en' ? 'English' : 'Русский'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#contact"
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              {t('nav.cta')}
            </a>
          </nav>

          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-800 hover:bg-white/20'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-slate-700 font-medium hover:text-blue-600 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex gap-2">
            {['en', 'ru'].map((lang) => (
              <button
                key={lang}
                onClick={() => { i18n.changeLanguage(lang); setMobileOpen(false); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  i18n.language.startsWith(lang)
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lang === 'en' ? 'EN' : 'RU'}
              </button>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors text-center"
          >
            {t('nav.cta')}
          </a>
        </div>
      )}
    </header>
  );
}
